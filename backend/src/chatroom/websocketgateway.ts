import { Logger, UnauthorizedException } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { Attendees } from './dto/attendees.dto';

@WebSocketGateway({
  cors: {
    origin: [`${process.env.REACT_URL}`, 'https://hoppscotch.io'],
  },
})
export class MyWebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // onModuleInit() {
  //     this.server.on('connection', (socket)=>{
  //         Logger.log(`connected websocket gateway - socket id: ${socket.id}`)
  //     })
  // }

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private ChatroomService: ChatroomService,
    ) {}

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      const user = await this.userService.getUserById(decodedToken.id);
      
      if (!user[0]) {
        Logger.error(`fail to connect websocket gateway due to invalid user`, 'SocketGateway');
        return this.disconnect(socket);
      }

      Logger.log(`userId ${user[0].id} connected websocket gateway - socketid: ${socket.id}`, 'SocketGateway');
      
      // store current user into the socket data
      socket.data.user = user[0]
      const chatrooms = await this.ChatroomService.getAllChatroomsbyUserId(user[0].id)
      
      Logger.debug(chatrooms, 'SocketGateway')

      // Only emit rooms to the specific connected client
      return this.server.to(socket.id).emit('chatrooms', chatrooms)
      
    } catch {
      Logger.error(`fail to connect websocket gateway due to invalid token`, 'SocketGateway');
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    Logger.warn(`disconnected websocket gateway - socketid: ${socket.id}`, 'SocketGateway');
  }

  // listening to 'newMessage' events
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);

    // emit a new message
    this.server.emit('onMessage', {
      sender_id: 1,
      text: body,
    });
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, attendees: Attendees) {
    // to get the socket user
    console.log(socket.data.user)
    return await this.ChatroomService.createChatroom(attendees)
  }
}
