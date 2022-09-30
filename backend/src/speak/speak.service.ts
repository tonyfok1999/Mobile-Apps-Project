import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { SpeedResult } from './dto/speakResult.dto';
import { SubmitFrom } from './dto/subminForm.dto';
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
ConfigModule.forRoot({
  envFilePath: ['.env'],
});

@Injectable()
export class SpeechService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async uploadWebM(speechUpload) {
    console.log(speechUpload);

    return;
  }

  async googleAPI(filename) {
    // The path to the remote LINEAR16 file

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    try {
      const audio = {
        content: readFileSync('./uploads/' + filename).toString('base64'),
      };
      const config = {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'yue-Hant-HK',
      };
      const request = {
        audio: audio,
        config: config,
      };

      // Detects speech in the audio file
      const [response] = await client.recognize(request);
      const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n');
      console.log(`Transcription: ${transcription}`);
      // let result = this.getDistricts(transcription);
      // console.log(result[0]);

      let district = await this.knex.raw(`SELECT id FROM districts_of_hk WHERE ? ~ district `, [transcription]);
      //  console.log(district.rows.length);

      if (district.rows.length == 0) {
        district = 1;
      } else {
        district = district.rows[0].id;
      }
      // console.log(district);

      let serviceSubType = await this.knex.raw(`SELECT id FROM service_subtypes WHERE '${transcription}' ~ subtype`);
      // console.log(serviceSubType.rows);

      if (serviceSubType.rows.length == 0) {
        serviceSubType = [1];
      } else {
        serviceSubType = [serviceSubType.rows[0].id];
      }
      // console.log(serviceSubType);

      // let serviceType = await this.knex
      //   .join('service_subtypes', 'service_types.id', '=', 'service_subtypes.service_type_id')
      //   .select('type')
      //   .from('service_types')
      //   .where('subtype', serviceSubType);
      // console.log(serviceType[0].type);
      let speedResult: SpeedResult = { district: district, serviceSubType: serviceSubType, speakFileName: filename,transcription:transcription };
      return speedResult;

    } catch(e) {
      console.log(e);
      
      let district = 1;
      let serviceSubType = [1];
   let transcription='Hello'

      let speedResult: SpeedResult = { district: district, serviceSubType: serviceSubType, speakFileName: filename,transcription:transcription };
      return speedResult;
    }
  }
  
  
  async formDataToDB(data: SubmitFrom,userId:number) {
    console.log(userId);
    
    let oderID = await this.knex('orders').insert({
      user_id: userId,
      working_address: data.district,
      service_subtype_id: data.serviceSubTypeNumber[0],
      budget: data.budget,
      voice_message: data.speakFileName,
      voice_text: data.transcription
    }).returning('id')

return {oderID:oderID};
  }
  
  
  
    async formImageToDB(files:Express.Multer.File[],oderId:number) {
      // files[?].filename
      try{
        
        
        for(let image of files){
         console.log(files);
         
          console.log(oderId);
          console.log( image.filename);
          
          await this.knex('order_images').insert({
            
            order_id: oderId,
            image_name: image.filename
           
          })
        }
        return {State: 'ok'}
      }catch{
        return {State: 'err for insert oder image'}
      }
    }


}

