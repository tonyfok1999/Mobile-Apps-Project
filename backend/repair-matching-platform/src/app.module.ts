import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const knexConfigs = require('../knexfile')
@Module({
  imports: [ConfigModule.forRoot(), KnexModule.forRoot({
    config: knexConfigs[process.env.NODE_ENV || 'development'],
  }), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
