import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './stratgies/local.strategy';
import { WorkerAuthController } from './worker-auth.controller';
import { WorkerAuthService } from './worker-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy } from './stratgies/jwt.stratrgy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [WorkerAuthController],
  providers: [WorkerAuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class WorkerAuthModule {}
