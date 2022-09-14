import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { UserModule } from './user/user.module';
import { SpeechModule } from './speak/speak.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { OrderModule } from './order/order.module';
import { ReferencesTableModule } from './references_table/references_table.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';
import { AllUserJwtMiddleware } from './middleware/alluserjwt.middleware';
import { JwtService } from '@nestjs/jwt';

const knexConfigs = require('../knexfile')
@Module({
  imports: [ConfigModule.forRoot(), KnexModule.forRoot({
    config: knexConfigs[process.env.NODE_ENV || 'development'],
  }), UserModule, SpeechModule, ChatroomModule, OrderModule, ReferencesTableModule, AuthModule, WebsocketModule],
  controllers: [],
  providers: [AuthService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AllUserJwtMiddleware)
      .forRoutes('*');
  }
}
