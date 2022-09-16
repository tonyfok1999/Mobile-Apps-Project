import { Module } from '@nestjs/common';
import { SpeechService } from './speak.service';
import { SpeechController } from './speak.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [SpeechController],
  providers: [SpeechService]
})
export class SpeechModule {}
