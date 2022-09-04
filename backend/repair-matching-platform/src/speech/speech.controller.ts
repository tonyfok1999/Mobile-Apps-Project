import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeechService } from './speech.service';


@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}



  @Get('/totext')
  findAll() {
    return this.speechService.findAll();
  }

 


}
