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
import { SpeechUpload } from './dto/speechUpload.dto'
import { SpeechService } from './speech.service'
import { ConfigModule } from '@nestjs/config';
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
    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
    };
    // console.log(response);
    console.log(file);
   await this.speechService.googleAPI(file.filename)
    
    return response;
}


	// @Get('/totext')
	// googleAPI() {
	// 	return this.speechService.googleAPI()
	// }
}
