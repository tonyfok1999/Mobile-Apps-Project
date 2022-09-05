import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeechService } from './speech.service';


@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}



  @Get('/totext')
  googleAPI() {
    return this.speechService.googleAPI();
  }

 


}
