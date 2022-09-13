import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: 'https://'
    }
})
export class MyWebSocket implements OnModuleInit{

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', (socket)=>{
            console.log(socket.id)
            console.log('connected')
        })
    }

    // listening to 'newMessage' events
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body)

        // emit a new message
        this.server.emit('onMessage', {
            message: 'New Message',
            content: body
        })
    }

}