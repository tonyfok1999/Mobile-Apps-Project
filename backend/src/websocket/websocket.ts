import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: [`${process.env.REACT_URL}`]
    }
})
export class MyWebSocket implements OnModuleInit{

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', (socket)=>{
            console.log(socket.id)
            console.log('connected websocket gateway')
        })
    }

    // listening to 'newMessage' events
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body)

        // emit a new message
        this.server.emit('onMessage', {
            sender_id: 1,
            text: body
        })
    }

}