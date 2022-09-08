import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
ConfigModule.forRoot({
  envFilePath: ['.env'],
});

@Injectable()
export class SpeechService {
  



async uploadWebM(speechUpload){
  console.log(speechUpload);
  
  return
}



  
  async googleAPI(filename) {
   
  


    // The path to the remote LINEAR16 file

  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: readFileSync(process.env.SPEECH_FILE+filename).toString('base64'),
    };
    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000 ,
      languageCode: 'yue-Hant-HK',
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);

    return transcription;
  }


 


}
