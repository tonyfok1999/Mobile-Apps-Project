import { Logger, UnauthorizedException } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { Attendees } from './dto/attendees.dto';
import { ConnectedUserService } from 'src/chatroom/socket-connected-user/connected-user.service';
import { Message } from '../../../models/message.model';

@WebSocketGateway({
  cors: true,
})
export class MyWebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService, private userService: UserService, private chatroomService: ChatroomService, private connectedUserService: ConnectedUserService) {}

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization;
      console.log({ token });

      if (token) {
        const decodedToken = await this.authService.verifyJwt(token);

        console.log({ decodedToken });

        const user: CreateUserDto[] = await this.userService.getUserById(decodedToken.id);
        const userId = user[0].id;

        Logger.debug('user' + userId, 'SocketGateway');

        if (!user[0]) {
          Logger.error(`fail to connect websocket gateway due to invalid user`, 'SocketGateway');
          return this.disconnect(socket);
        }

        Logger.log(`userId ${userId} connected websocket gateway - socketid: ${socket.id}`, 'SocketGateway');

        // store current user into the socket data
        socket.data.user = user[0];

        // store the socketid corresponding userid
        await this.connectedUserService.createUser({ socketId: socket.id, userId: userId });

        const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(user[0].id);

        Logger.debug(JSON.stringify(chatrooms.rows), 'SocketGateway');

        // Only emit rooms to the specific connected client
        return this.server.to(socket.id).emit('chatrooms', chatrooms);
      }
    } catch (e) {
      Logger.error(e, 'SocketGateway');
      socket.data.user = undefined;
    }
  }

  async handleDisconnect(socket: Socket) {
    if (socket.data.user) {
      await this.connectedUserService.deleteByUserId(socket.data.user.id);
      Logger.warn(`userId ${socket.data.user.id} disconnected websocket gateway - socketid: ${socket.id}`, 'SocketGateway');
    }
  }

  // listening to 'newMessage' events
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() message: Message) {
    console.log(message);
    console.log({'v': message.chatroomId});
    console.log('chatroomId' + message.chatroomId);
    const attendees = await this.chatroomService.getAllUserIdByChatroomId(message.chatroomId)
    // const attendees = [{ user_id: 1 }, { user_id: 1992 }];
    console.log(attendees);
    const connections = [];

    // get socket id of all the users in the same room
    for (const attendee of attendees) {
      const attendeeSocket = await this.connectedUserService.getSocketIdByUserId(attendee.user_id);
      connections.push(attendeeSocket[0].socket_id);
    }

    // emit a new message to users in the same room
    for (const connection of connections) {
      this.server.to(connection).emit('onMessage', {
        senderId: message.senderId,
        text: message.text,
      });
    }
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, attendees: Attendees) {
    // to get the socket user
    Logger.log(`worker ${attendees.workerId} has created chatroom with user ${attendees.userId}`, 'SocketGateway');
    // console.log(socket.data.user);
    return await this.chatroomService.createChatroom(attendees);
  }
}
