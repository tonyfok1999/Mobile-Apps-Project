import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { MyWebSocket } from './websocket';
import { SocketClient } from './socket-client';

@Module({
  controllers: [WebsocketController],
  providers: [WebsocketService,MyWebSocket, SocketClient]
})
export class WebsocketModule {}
