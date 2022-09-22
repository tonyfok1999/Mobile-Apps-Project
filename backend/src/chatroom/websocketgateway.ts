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
  // cors: false,
  cors: `${process.env.REACT_URL}`,
})
export class MyWebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  userIdfromSocket:number
  socketId: string

  constructor(private authService: AuthService, private userService: UserService, private chatroomService: ChatroomService, private connectedUserService: ConnectedUserService) {
    this.userIdfromSocket = 1;
    this.socketId = 'none'
  }

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
      Logger.debug(token, 'SocketGateway');

      if (token !== 'newUser') {
        const decodedToken = await this.authService.verifyJwt(token);

        console.log(decodedToken)

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
      }else{
        Logger.warn(`user fail to connect from websocket gateway since he is the new user `, 'SocketGateway')
        // this.disconnect(socket)
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

    for (const attendee of attendees) {
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
        });
      }
    }

    this.server.emit('setChatroom', message.chatroom_id);
  }

  @SubscribeMessage('setChatroom')
  async onCreateRoom(@MessageBody() chatroomId: number) {
    const connections = await this.mapUserIdsAndSocketInSameRoom(chatroomId);

    Logger.debug({ connections: connections }, 'SocketGateway');

    for (let i = 0; i < connections.length; i++) {
      const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(connections[i].userId);
      connections[i]['chatrooms'] = chatrooms;
    }

    Logger.debug({ connections: connections }, 'SocketGateway');

    for (let i = 0; i < connections.length; i++) {
      for (let j = 0; j < connections[i].chatrooms.length; j++) {
        Logger.debug({ chatroom_id: connections[i].chatrooms[j].chatroom_id }, 'SocketGateway');
        const attendees = await this.chatroomService.getAllUserIdByChatroomId(connections[i].chatrooms[j].chatroom_id);
        // attendees = [{user_id: number, nickname: string}, {user_id: number, nickname: string}]
        connections[i]['chatrooms'][j]['attendees'] = attendees;
      }
    }

    // emit a new message to users in the same room
    for (const connection of connections) {
      if (connection.userSocket) {
        this.server.to(connection.userSocket).emit('onChatroom', connection.chatrooms);
      }
    }
  }

  @SubscribeMessage('deleteChat')
  async onDeleteChat(@MessageBody() chatroomId: number) {
    const connections = await this.mapUserIdsAndSocketInSameRoom(chatroomId);

    await this.chatroomService.deleteChat(chatroomId);
    Logger.warn(`chatroom id ${chatroomId} is deleted`, 'SocketGateway');

    for (let i = 0; i < connections.length; i++) {
      const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(connections[i].userId);
      connections[i]['chatrooms'] = chatrooms;
    }

    for (let i = 0; i < connections.length; i++) {
      for (let j = 0; j < connections[i].chatrooms.length; j++) {
        Logger.debug({ chatroom_id: connections[i].chatrooms[j].chatroom_id }, 'SocketGateway');
        const attendees = await this.chatroomService.getAllUserIdByChatroomId(connections[i].chatrooms[j].chatroom_id);
        // attendees = [{user_id: number, nickname: string}, {user_id: number, nickname: string}]
        connections[i]['chatrooms'][j]['attendees'] = attendees;
      }
    }

    // emit a new message to users in the same room
    for (const connection of connections) {
      if (connection.userSocket) {
        this.server.to(connection.userSocket).emit('onChatroom', connection.chatrooms);
      }
    }
  }

  @SubscribeMessage('bookmarkChat')
  async bookmarkChat(@MessageBody() obj: {chatroomId: number, userId: number}) {
    // Logger.debug({userId: this.userIdfromSocket}, 'SocketGateway')
    const chatroomId = obj.chatroomId
    const userId = obj.userId
    await this.chatroomService.bookmarkChat( chatroomId, userId )
    Logger.log(`the chatroom id ${chatroomId} has been bookmarked`, 'SocketGateway')
    const chatrooms = await this.chatroomService.getAllChatroomsbyUserId( userId )

    for( let i = 0; i < chatrooms.length; i++ ) {
      const attendees = await this.chatroomService.getAllUserIdByChatroomId(chatrooms[i].chatroom_id);
      chatrooms[i]['attendees'] = attendees;
    }

    const socketId = await this.connectedUserService.getSocketIdByUserId(userId)
    // Logger.debug({socketId: socketId[0].socket_id}, 'SocketGateway')
    // Logger.debug({chatrooms: chatrooms}, 'SocketGateway')
    this.server.to(socketId[0].socket_id).emit('onChatroom', chatrooms);
  }

  // @SubscribeMessage('createChatroom')
  // async createChatroom(@MessageBody() chatroomId: number){
    // const newChatroom = await this.chatroomService.getSpecificChatroombyUserId(chatroomId, this.userIdfromSocket)
    // Logger.debug({newChatroom: newChatroom}, 'SocketGateway')

    // const attendees = await this.chatroomService.getAllUserIdByChatroomId(chatroomId)
    // Logger.debug({attendees: attendees}, 'SocketGateway')
    
    // newChatroom[0]['attendees']= attendees

    // Logger.debug({newChatroom: newChatroom}, 'SocketGateway')
    // this.server.to(this.socketId).emit('newChatroom', newChatroom)
    // this.server.emit('setChatroom', chatroomId)
  // }

  // @SubscribeMessage('restartSocket')
  // restartSocket(socket: Socket){
  //   socket.emit('startSocket')
  // }

}
