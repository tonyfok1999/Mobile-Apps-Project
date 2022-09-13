import { Injectable } from "@nestjs/common";
import {io, Socket} from 'socket.io-client'

@Injectable()
export class SocketClient{
    public socketClient: Socket;

    constructor() {
        this.socketClient =io(`${process.env.REACT_URL}`)
    }

}