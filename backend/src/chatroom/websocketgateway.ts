import { Logger, UnauthorizedException } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { Attendees } from './dto/attendees.dto';
import { ConnectedUserService } from 'src/chatroom/socket-connected-user/connected-user.service';
import { Message } from './dto/message.dto';

@WebSocketGateway({
  cors: false,
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

  async mapUserIdsAndSocketInSameRoom(chatroomId: number) {
    const attendees = await this.chatroomService.getAllUserIdByChatroomId(chatroomId);
    const connections = [];

    for (const attendee of attendees.rows) {
      console.log('attendee' + JSON.stringify(attendee));
      const attendeeSocket = await this.connectedUserService.getSocketIdByUserId(attendee.user_id);
      console.log('socket id: ' + JSON.stringify(attendeeSocket));

      if (attendeeSocket.length === 0) {
        connections.push(0);
      } else {
        connections.push({ userId: attendee.user_id, userSocket: attendeeSocket[0].socket_id });
      }
    }

    return connections;
  }

  // listening to 'newMessage' events
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() message: Message) {
    console.log('message' + JSON.stringify(message));

    const connections = await this.mapUserIdsAndSocketInSameRoom(message.chatroom_id);

    // emit a new message to users in the same room
    for (const connection of connections) {
      if (connection.userSocket) {
        this.server.to(connection.userSocket).emit('onMessage', {
          sender_id: message.sender_id,
          text: message.text,
        })
      }
    }

    this.server.emit('createChatroom', message.chatroom_id)
  }

  @SubscribeMessage('createChatroom')
  async onCreateRoom(socket: Socket, @MessageBody() chatroomId: number) {
    const connections = await this.mapUserIdsAndSocketInSameRoom(chatroomId);

    for (const connection of connections) {
      const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(connection.userId);
      connection['chatrooms'] = chatrooms.rows;
    }

    // emit a new message to users in the same room
    for (const connection of connections) {
      if (connection.userSocket) {
        this.server.to(connection.userSocket).emit('onChatroom', connection.chatrooms);
      }
    }
  }
}
