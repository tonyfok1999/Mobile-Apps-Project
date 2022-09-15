import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './stratgies/local.strategy';
import { WorkerAuthController } from './worker-auth.controller';
import { WorkerAuthService } from './worker-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'tryMe',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [WorkerAuthController],
  providers: [WorkerAuthService, LocalStrategy],
})
export class WorkerAuthModule {}
