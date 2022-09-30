import { Logger, UnauthorizedException } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { ConnectedUserService } from 'src/chatroom/socket-connected-user/connected-user.service';
import { Message } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },

  // cors: `${process.env.REACT_URL}`,
})
export class MyWebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  userIdfromSocket: number;
  socketId: string;

  constructor(private authService: AuthService, private userService: UserService, private chatroomService: ChatroomService, private connectedUserService: ConnectedUserService) {
    this.userIdfromSocket = 1;
    this.socketId = 'none';
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
      Logger.log('handleConnection is run');
      const token = socket.handshake.auth.authorization;
      Logger.debug(`user with token ${token} coming in`, 'SocketGateway//handleConnection');

      if (token !== 'newUser') {
        const decodedToken = await this.authService.verifyJwt(token);

        console.log(decodedToken);

        const user: CreateUserDto[] = await this.userService.getUserById(decodedToken.id);
        const userId = user[0].id;

        Logger.debug(`user Id ${userId} is logged in`, 'SocketGateway//handleConnection');

        if (!user[0]) {
          Logger.error(`fail to connect websocket gateway due to invalid user`, 'SocketGateway//handleConnection');
          return this.disconnect(socket);
        }

        Logger.log(`userId ${userId} connected websocket gateway - socketid: ${socket.id}`, 'SocketGateway//handleConnection');

        // store current user into the socket data
        socket.data.user = user[0];

        // store the socketid corresponding userid
        await this.connectedUserService.createUser({ socketId: socket.id, userId: userId });
      } else {
        Logger.warn(`user fail to connect from websocket gateway since he is the new user `, 'SocketGateway//handleConnection');
      }
    } catch (e) {
      Logger.error(e, 'SocketGateway');
      socket.data.user = undefined;
    }
  }

  async handleDisconnect(socket: Socket) {
    if (socket.data.user) {
      await this.connectedUserService.deleteByUserId(socket.data.user.id);
      Logger.warn(`userId ${socket.data.user.id} disconnected websocket gateway - socketid: ${socket.id}`, 'SocketGateway//handleDisconnect');
    }
  }

  async mapUserIdsAndSocketInSameRoom(chatroomId: number) {
    const attendees = await this.chatroomService.getAllUserIdByChatroomId(chatroomId);
    const connections = [];

    for (const attendee of attendees) {
      console.log('attendee' + JSON.stringify(attendee));
      const attendeeSocket = await this.connectedUserService.getSocketIdByUserId(attendee.user_id);
      console.log('socket id: ' + JSON.stringify(attendeeSocket));

      if (attendeeSocket.length > 0) {
        connections.push({ userId: attendee.user_id, userSocket: attendeeSocket[0].socket_id });
      }
    }
    console.log({ connections });
    return connections;
  }

  // listening to 'newMessage' events
  @SubscribeMessage('newMessage')
  async onNewMessage(socket: Socket, @MessageBody() message: Message) {
    console.log('message' + JSON.stringify(message));

    const connections = await this.mapUserIdsAndSocketInSameRoom(message.chatroom_id);
    
    try {
      await this.chatroomService.postMessage(message);
      Logger.debug('message has been posted' , 'SocketGateway//onNewMessage');
    } catch {
      Logger.debug('message cannot be posted', 'SocketGateway//onNewMessage');
      const result = await this.connectedUserService.getSocketIdByUserId(message.sender_id)
      Logger.debug({result}, 'SocketGateway//onNewMessage');
      const userSocket= result[0].socket_id 
      this.server.to(userSocket).emit('onMessage', { status: '400'})
      return
    }

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

    Logger.debug({ connections: connections }, 'SocketGateway//onCreateRoom');

    for (let i = 0; i < connections.length; i++) {
      const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(connections[i].userId);
      connections[i]['chatrooms'] = chatrooms;
    }

    Logger.debug({ connections: connections }, 'SocketGateway//onCreateRoom');

    for (let i = 0; i < connections.length; i++) {
      for (let j = 0; j < connections[i].chatrooms.length; j++) {
        Logger.debug({ chatroom_id: connections[i].chatrooms[j].chatroom_id }, 'SocketGateway//onCreateRoom');
        const attendees = await this.chatroomService.getAllUserIdByChatroomId(connections[i].chatrooms[j].chatroom_id);
        connections[i]['chatrooms'][j]['attendees'] = attendees;
      }
    }

    // emit a new message to users in the same room
    for (const connection of connections) {
      if (connection.userSocket) {
        this.server.to(connection.userSocket).emit('onChatroom', connection.chatrooms);
        Logger.log('chatroom: ' + JSON.stringify(connection.chatrooms) + ' has been sent to ' + connection.userId, 'SocketGateway//onCreateRoom');
      }
    }
  }

  @SubscribeMessage('deleteChat')
  async onDeleteChat(@MessageBody() chatroomId: number) {
    const connections = await this.mapUserIdsAndSocketInSameRoom(chatroomId);

    await this.chatroomService.deleteChat(chatroomId);
    Logger.warn(`chatroom id ${chatroomId} is deleted`, 'SocketGateway//onDeleteChat');

    for (let i = 0; i < connections.length; i++) {
      Logger.debug(`use ID ${connections[i].userId} of chat room`, 'SocketGateway//onDeleteChat');
      const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(connections[i].userId);
      connections[i]['chatrooms'] = chatrooms;
    }

    Logger.debug({ connections }, 'SocketGateway//onDeleteChat');

    for (let i = 0; i < connections.length; i++) {
      for (let j = 0; j < connections[i].chatrooms.length; j++) {
        Logger.debug({ chatroom_id: connections[i].chatrooms[j].chatroom_id }, 'SocketGateway//onDeleteChat');
        const attendees = await this.chatroomService.getAllUserIdByChatroomId(connections[i].chatrooms[j].chatroom_id);
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
  async bookmarkChat(@MessageBody() obj: { chatroomId: number; userId: number }) {
    const chatroomId = obj.chatroomId;
    const userId = obj.userId;
    await this.chatroomService.bookmarkChat(chatroomId, userId);
    Logger.log(`the chatroom id ${chatroomId} has been bookmarked`, 'SocketGateway//bookmarkChat');
    const chatrooms = await this.chatroomService.getAllChatroomsbyUserId(userId);

    for (let i = 0; i < chatrooms.length; i++) {
      const attendees = await this.chatroomService.getAllUserIdByChatroomId(chatrooms[i].chatroom_id);
      chatrooms[i]['attendees'] = attendees;
    }

    const socketId = await this.connectedUserService.getSocketIdByUserId(userId);
    this.server.to(socketId[0].socket_id).emit('onChatroom', chatrooms);
  }
}
