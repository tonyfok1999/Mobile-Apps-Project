/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Req } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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

  @Post('/submitOderFrom') //form text
  async submitOderFrom(@Req() req,@Body() data: SubmitFrom) {
    let userId = req.headers.userid;
    // console.log(userId);
    
    
    return this.speechService.formDataToDB(data,userId);
  }

  @Post('/uploadOderImage') //form image
  @UseInterceptors(
    FilesInterceptor('oderImage', 3, {
      storage: diskStorage({
        destination: './uploads/',
      
      }),
    })
  )
  uploadMultipleFiles(@Req() req, @UploadedFiles() files: Express.Multer.File[]) {
    let oderId = req.headers.oderid
    return this.speechService.formImageToDB(files,oderId);
  }

  @Post('/uploadWebM')
  @UseInterceptors(
    FileInterceptor('record', {
      storage: diskStorage({
        destination: './uploads/',
      }),
    })
  )
  async uploadedFile(@UploadedFile() file) {
    return this.speechService.googleAPI(file.filename);
  }
}
