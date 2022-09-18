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
import { AllUserJwtMiddleware } from './middleware/all-user-jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import { WorkerAuthModule } from './worker-auth/worker-auth.module';
import SecretConfigFactory from './config/secret.config';
import { AppController } from './app.controller';

const knexConfigs = require('../knexfile');
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SecretConfigFactory],
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: knexConfigs[process.env.NODE_ENV || 'development'],
    }),
    UserModule,
    SpeechModule,
    ChatroomModule,
    OrderModule,
    ReferencesTableModule,
    AuthModule,
    WorkerAuthModule,
  ],
  controllers: [AppController],
  providers: [AuthService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, AllUserJwtMiddleware).forRoutes('*');
  }
}
