import { Logger, OnModuleInit } from "@nestjs/common";
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
            Logger.log(`connected websocket gateway - socket id: ${socket.id}`)
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