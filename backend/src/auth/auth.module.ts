import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { async } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            secret: 'secretKey'
          }),
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports:[AuthService]
})
export class AuthModule {}
