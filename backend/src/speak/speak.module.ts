import { Module } from '@nestjs/common';
import { SpeechService } from './speak.service';
import { SpeechController } from './speak.controller';

@Module({
  controllers: [SpeechController],
  providers: [SpeechService]
})
export class SpeechModule {}
