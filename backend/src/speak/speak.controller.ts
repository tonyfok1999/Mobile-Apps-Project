/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { SpeechUpload } from './dto/speakUpload.dto';
import { SpeechService } from './speak.service';
import { ConfigModule } from '@nestjs/config';
import { TestString } from './dto/test.dto';
import { SubmitFrom } from './dto/subminForm.dto';
import { json } from 'stream/consumers';
import { request } from 'express';
ConfigModule.forRoot({
  envFilePath: ['.env'],
});
@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  // @Post('/uploadWebM')
  // uploadWebM(@Body() speechUpload: SpeechUpload) {
  //   console.log(speechUpload);

  // 	return this.speechService.uploadWebM(speechUpload)
  // }

  @Post('/submitOderFrom')
  async submitOderFrom(@Body() data:SubmitFrom) {
    console.log(data);

    // console.log(JSON.parse(data.district));

    // console.log('submitOderFrom');
    // console.log(submitFrom);
    // console.log(submitFrom.district);
    // console.log(JSON.parse(submitFrom.district));

    return 'ok';
  }

  @Post('/uploadWebM')
  @UseInterceptors(
    FileInterceptor('record', {
      storage: diskStorage({
        destination: process.env.SPEECH_FILE,
      }),
    })
  )
  async uploadedFile(@UploadedFile() file) {
    return this.speechService.googleAPI(file.filename);
  }
}
