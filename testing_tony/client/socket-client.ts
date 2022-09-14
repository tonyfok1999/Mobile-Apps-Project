import { Injectable } from "@nestjs/common";
import {io, Socket} from 'socket.io-client'

@Injectable()
export class SocketClient{
    public socketClient: Socket;

    constructor() {
        this.socketClient =io(`${process.env.NEST_URL}`)
    }

    OnModuleInit() {
        this.registerConsumerEvents()
    }

    private registerConsumerEvents(){
        this.socketClient.emit('newMessage', { message: 'hey there' })
        
        this.socketClient.on('connect', () =>{
            console.log('connected to Gateway')
        })

        this.socketClient.on('onMessage', (payload: any) =>{
            console.log(payload)
        })
    }

}