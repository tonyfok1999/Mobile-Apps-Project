import { Module } from '@nestjs/common';
import { WebsocketService } from './notinuse/websocket.service';
import { WebsocketController } from './notinuse/websocket.controller';
import { MyWebSocket } from './websocketgateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [MyWebSocket]
})
export class WebsocketModule {}
