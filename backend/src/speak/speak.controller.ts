/* eslint-disable prettier/prettier */
import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { request } from 'express'
import { diskStorage } from 'multer';
import { SpeechUpload } from './dto/speakUpload.dto'
import { SpeechService } from './speak.service'
import { ConfigModule } from '@nestjs/config';
import { TestString } from './dto/test.dto';
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

  @Post('/uploadWebM')
@UseInterceptors(
	FileInterceptor('record',{ storage: diskStorage({
    destination: process.env.SPEECH_FILE
  })}),
)
async uploadedFile(@UploadedFile() file) {
    // const response = {
    // 	originalname: file.originalname,
    // 	filename: file.filename,
    // };
    // console.log(response);
    // console.log(file);
//   let result = await this.speechService.googleAPI(file.filename)
//     console.log(result);
	
    return this.speechService.googleAPI(file.filename);
}









	// @Post('/getDistricts')
	// getDistricts(@Body() testStringDto:TestString) {
	// 	console.log(testStringDto.testString);
		
	// 	return this.speechService.getDistricts(testStringDto.testString)
	// }
}
