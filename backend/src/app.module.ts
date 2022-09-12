import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { UserModule } from './user/user.module';
import { SpeechModule } from './speech/speech.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { OrderModule } from './order/order.module';
import { ReferencesTableModule } from './references_table/references_table.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

const knexConfigs = require('../knexfile')
@Module({
  imports: [ConfigModule.forRoot(), KnexModule.forRoot({
    config: knexConfigs[process.env.NODE_ENV || 'development'],
  }), UserModule, SpeechModule, ChatroomModule, OrderModule, ReferencesTableModule, AuthModule,],
  controllers: [],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
