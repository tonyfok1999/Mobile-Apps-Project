import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { MyWebSocket } from './websocket';

@Module({
  controllers: [WebsocketController],
  providers: [WebsocketService, MyWebSocket]
})
export class WebsocketModule {}
