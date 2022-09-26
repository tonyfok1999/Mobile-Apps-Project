/* eslint-disable prettier/prettier */
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('service_types').del();
  await knex('service_subtypes').del();
  await knex('genders').del();
  await knex('regions_of_hk').del();
  await knex('districts_of_hk').del();
  await knex('order_states').del();
  await knex('order_image_states').del();

  // Inserts seed entries
  let typeArrayId: Array<{ id: number }> = await knex
    .insert([{ type: '風' }, { type: '火' }, { type: '水' }, { type: '電' }])
    .into('service_types')
    .returning('id');

  let subtypeArrayId: Array<{ id: number }> = await knex
    .insert([
      { service_type_id: typeArrayId[0].id, subtype: '空調設備安裝' },
      { service_type_id: typeArrayId[0].id, subtype: '空調設備維修' },
      { service_type_id: typeArrayId[0].id, subtype: '空調設備清洗 ' },
      { service_type_id: typeArrayId[0].id, subtype: '風喉維修' },
      { service_type_id: typeArrayId[0].id, subtype: '風喉清洗' }, 
      { service_type_id: typeArrayId[0].id, subtype: '洗冷氣' }, 
      { service_type_id: typeArrayId[0].id, subtype: '裝冷氣' }, 
      { service_type_id: typeArrayId[0].id, subtype: '整冷氣' }, 
      { service_type_id: typeArrayId[0].id, subtype: '檢查冷氣' }, 

      { service_type_id: typeArrayId[1].id, subtype: '消防電氣裝配' },
      { service_type_id: typeArrayId[1].id, subtype: '消防電氣裝配' }, 
      { service_type_id: typeArrayId[1].id, subtype: '消防設備檢查' }, 

      { service_type_id: typeArrayId[2].id, subtype: '水喉' },
      { service_type_id: typeArrayId[2].id, subtype: '水喉設備安裝' },
      { service_type_id: typeArrayId[2].id, subtype: '水喉漏水維修' },
      { service_type_id: typeArrayId[2].id, subtype: '裝水喉' },
      { service_type_id: typeArrayId[2].id, subtype: '整水喉' },
      { service_type_id: typeArrayId[2].id, subtype: '馬桶安裝' },
      { service_type_id: typeArrayId[2].id, subtype: '馬桶維修' },
      { service_type_id: typeArrayId[2].id, subtype: '裝馬桶' },
      { service_type_id: typeArrayId[2].id, subtype: '整馬桶' },
      { service_type_id: typeArrayId[2].id, subtype: '漏水調查' }, 

      { service_type_id: typeArrayId[3].id, subtype: '電子設備安裝' },
      { service_type_id: typeArrayId[3].id, subtype: '電子設備維修' },
      { service_type_id: typeArrayId[3].id, subtype: '電訊系統安裝' },
      { service_type_id: typeArrayId[3].id, subtype: '電訊系統維修' }, 
      { service_type_id: typeArrayId[3].id, subtype: '電器' },
    ])
    .into('service_subtypes')
    .returning('id');

  let regionArrayId: Array<{ id: number }> = await knex
    .insert([
      { id: 1, region: '香港島' },
      { id: 2, region: '九龍' },
      { id: 3, region: '新界' },
    ])
    .into('regions_of_hk')
    .returning('id');

  let districtArrayId: Array<{ id: number }> = await knex
    .insert([
      { region_id: regionArrayId[0].id, district: '中西區' },
      { region_id: regionArrayId[0].id, district: '堅尼地城' },
      { region_id: regionArrayId[0].id, district: '石塘咀' },
      { region_id: regionArrayId[0].id, district: '西營盤' },
      { region_id: regionArrayId[0].id, district: '上環' },
      { region_id: regionArrayId[0].id, district: '中環' },
      { region_id: regionArrayId[0].id, district: '金鐘' },
      { region_id: regionArrayId[0].id, district: '半山區' },
      { region_id: regionArrayId[0].id, district: '山頂' },

      { region_id: regionArrayId[0].id, district: '灣仔' },
      { region_id: regionArrayId[0].id, district: '銅鑼灣' },
      { region_id: regionArrayId[0].id, district: '跑馬地' },
      { region_id: regionArrayId[0].id, district: '掃桿埔' },
      { region_id: regionArrayId[0].id, district: '渣甸山' },
      { region_id: regionArrayId[0].id, district: '大坑' },
     
      { region_id: regionArrayId[0].id, district: '東區' },
      { region_id: regionArrayId[0].id, district: '天后' },
      { region_id: regionArrayId[0].id, district: '寶馬山' },
      { region_id: regionArrayId[0].id, district: '北角' },
      { region_id: regionArrayId[0].id, district: '鰂魚涌' },
      { region_id: regionArrayId[0].id, district: '西灣河' },
      { region_id: regionArrayId[0].id, district: '筲箕灣' },
      { region_id: regionArrayId[0].id, district: '柴灣' },
      { region_id: regionArrayId[0].id, district: '小西灣' },

      { region_id: regionArrayId[0].id, district: '南區' },
      { region_id: regionArrayId[0].id, district: '薄扶林' },
      { region_id: regionArrayId[0].id, district: '香港仔' },
      { region_id: regionArrayId[0].id, district: '鴨脷洲' },
      { region_id: regionArrayId[0].id, district: '黃竹坑' },
      { region_id: regionArrayId[0].id, district: '壽臣山' },
      { region_id: regionArrayId[0].id, district: '淺水灣' },
      { region_id: regionArrayId[0].id, district: '舂磡角' },
      { region_id: regionArrayId[0].id, district: '赤柱' },
      { region_id: regionArrayId[0].id, district: '大潭' },
      { region_id: regionArrayId[0].id, district: '石澳' },

      { region_id: regionArrayId[1].id, district: '深水埗' },
      { region_id: regionArrayId[1].id, district: '美孚' },
      { region_id: regionArrayId[1].id, district: '荔枝角' },
      { region_id: regionArrayId[1].id, district: '長沙灣' },
      { region_id: regionArrayId[1].id, district: '石硤尾' },
      { region_id: regionArrayId[1].id, district: '又一村' },
      { region_id: regionArrayId[1].id, district: '大窩坪' },
      { region_id: regionArrayId[1].id, district: '昂船洲' },

      { region_id: regionArrayId[1].id, district: '油尖旺' },
      { region_id: regionArrayId[1].id, district: '尖沙咀' },
      { region_id: regionArrayId[1].id, district: '油麻地' },
      { region_id: regionArrayId[1].id, district: '西九龍填海區' },
      { region_id: regionArrayId[1].id, district: '京士柏' },
      { region_id: regionArrayId[1].id, district: '旺角' },
      { region_id: regionArrayId[1].id, district: '大角咀' },


      { region_id: regionArrayId[1].id, district: '九龍城' },
      { region_id: regionArrayId[1].id, district: '紅磡' },
      { region_id: regionArrayId[1].id, district: '土瓜灣' },
      { region_id: regionArrayId[1].id, district: '馬頭角' },
      { region_id: regionArrayId[1].id, district: '馬頭圍' },
      { region_id: regionArrayId[1].id, district: '啟德' },
      { region_id: regionArrayId[1].id, district: '何文田' },
      { region_id: regionArrayId[1].id, district: '九龍塘' },
      { region_id: regionArrayId[1].id, district: '筆架山' },
      

      { region_id: regionArrayId[1].id, district: '黃大仙' },
      { region_id: regionArrayId[1].id, district: '新蒲崗' },
      { region_id: regionArrayId[1].id, district: '東頭' },
      { region_id: regionArrayId[1].id, district: '橫頭磡' },
      { region_id: regionArrayId[1].id, district: '樂富' },
      { region_id: regionArrayId[1].id, district: '鑽石山' },
      { region_id: regionArrayId[1].id, district: '慈雲山' },
      { region_id: regionArrayId[1].id, district: '牛池灣' },

      { region_id: regionArrayId[1].id, district: '觀塘' },
      { region_id: regionArrayId[1].id, district: '坪石' },
      { region_id: regionArrayId[1].id, district: '九龍灣' },
      { region_id: regionArrayId[1].id, district: '牛頭角' },
      { region_id: regionArrayId[1].id, district: '佐敦谷' },
      { region_id: regionArrayId[1].id, district: '秀茂坪' },
      { region_id: regionArrayId[1].id, district: '藍田' },
      { region_id: regionArrayId[1].id, district: '油塘' },
      { region_id: regionArrayId[1].id, district: '鯉魚門' },

      { region_id: regionArrayId[2].id, district: '沙田' },
      { region_id: regionArrayId[2].id, district: '大圍' },
      { region_id: regionArrayId[2].id, district: '火炭' },
      { region_id: regionArrayId[2].id, district: '馬料水' },
      { region_id: regionArrayId[2].id, district: '烏溪沙' },
      { region_id: regionArrayId[2].id, district: '馬鞍山' },
      
      { region_id: regionArrayId[2].id, district: '大埔' },
      { region_id: regionArrayId[2].id, district: '大埔墟' },
      { region_id: regionArrayId[2].id, district: '大埔滘' },
      { region_id: regionArrayId[2].id, district: '大尾篤' },
      { region_id: regionArrayId[2].id, district: '船灣' },
      { region_id: regionArrayId[2].id, district: '樟木頭' },
      { region_id: regionArrayId[2].id, district: '企嶺下' },

      { region_id: regionArrayId[2].id, district: '北區' },
      { region_id: regionArrayId[2].id, district: '粉嶺' },
      { region_id: regionArrayId[2].id, district: '聯和墟' },
      { region_id: regionArrayId[2].id, district: '上水' },
      { region_id: regionArrayId[2].id, district: '石湖墟' },
      { region_id: regionArrayId[2].id, district: '沙頭角' },
      { region_id: regionArrayId[2].id, district: '鹿頸' },
      { region_id: regionArrayId[2].id, district: '烏蛟騰' },

      { region_id: regionArrayId[2].id, district: '元朗' },
      { region_id: regionArrayId[2].id, district: '洪水橋' },
      { region_id: regionArrayId[2].id, district: '廈村' },
      { region_id: regionArrayId[2].id, district: '流浮山' },
      { region_id: regionArrayId[2].id, district: '天水圍' },
      { region_id: regionArrayId[2].id, district: '新田' },
      { region_id: regionArrayId[2].id, district: '落馬洲' },
      { region_id: regionArrayId[2].id, district: '錦田' },
      { region_id: regionArrayId[2].id, district: '石崗' },
      { region_id: regionArrayId[2].id, district: '八鄉' },


      { region_id: regionArrayId[2].id, district: '屯門' },
      { region_id: regionArrayId[2].id, district: '大欖涌' },
      { region_id: regionArrayId[2].id, district: '掃管笏' },
      { region_id: regionArrayId[2].id, district: '藍地' },


      { region_id: regionArrayId[2].id, district: '西貢' },
      { region_id: regionArrayId[2].id, district: '清水灣' },
      { region_id: regionArrayId[2].id, district: '大網仔' },
      { region_id: regionArrayId[2].id, district: '將軍澳' },
      { region_id: regionArrayId[2].id, district: '坑口' },
      { region_id: regionArrayId[2].id, district: '調景嶺' },
      { region_id: regionArrayId[2].id, district: '馬游塘' },

      { region_id: regionArrayId[2].id, district: '離島' },
      { region_id: regionArrayId[2].id, district: '長洲' },
      { region_id: regionArrayId[2].id, district: '坪洲' },
      { region_id: regionArrayId[2].id, district: '大嶼山' },
      { region_id: regionArrayId[2].id, district: '東涌' },
      { region_id: regionArrayId[2].id, district: '南丫島' },

      { region_id: regionArrayId[2].id, district: '荃灣' },
      { region_id: regionArrayId[2].id, district: '梨木樹' },
      { region_id: regionArrayId[2].id, district: '汀九' },
      { region_id: regionArrayId[2].id, district: '深井' },
      { region_id: regionArrayId[2].id, district: '青龍頭' },
      { region_id: regionArrayId[2].id, district: '馬灣' },
      { region_id: regionArrayId[2].id, district: '欣澳' },

      { region_id: regionArrayId[2].id, district: '葵青' },
      { region_id: regionArrayId[2].id, district: '青衣' },
    ])
    .into('districts_of_hk')
    .returning('id');

  let orderStateArrayId: Array<{ id: number }> = await knex
    .insert([
      { order_state: '等待報價' },
      { order_state: '等待客戶接受報價' },
      { order_state: '用戶接受報價等待工程進行' },
      { order_state: '工程進行中' },
      { order_state: '工程完成' },
    ])
    .into('order_states')
    .returning('id');

  let imageStateArrayId: Array<{ id: number }> = await knex
    .insert([
      { image_state: '工程進行前' },
      { image_state: '工程進行中' },
      { image_state: '工程完成' },
    ])
    .into('order_image_states')
    .returning('id');

  let genderArrayId: Array<{ id: number }> = await knex
    .insert([{ gender: '男' }, { gender: '女' }])
    .into('genders')
    .returning('id');

  let userArrayId: Array<{ id: number }> = await knex //seed password :123
    .insert([
      {
        email: 'admin1@gmail.com',
        password: '$2b$04$pUpuSG7alckkWL2gRTTjau2UluB2DfkufbTrGHXFPLvbYgN2EXVhm',
        nickname: 'admin1',
        phone: 90000001,
        gender_id: genderArrayId[0].id,
        is_worker:true,
      },
      {
        email: 'admin2@gmail.com',
        password: '$2b$04$q5avHJJKyBKMW/jjOLDHoO8QxwadepsQXmkfoo2B568e/6Id0GEVy',
        nickname: 'admin2',
        phone: 90000001,
        gender_id: genderArrayId[0].id,
        is_worker:false,
      },
      
 
    ])
    .into('users')
    .returning('id');


    await knex('worker_service_subtypes').insert([
      {
        worker_id: userArrayId[0].id,
        subtype_id: subtypeArrayId[5].id,
      },
      {
        worker_id: userArrayId[0].id,
        subtype_id:subtypeArrayId[6].id,
      },
      {
        worker_id: userArrayId[0].id,
        subtype_id:subtypeArrayId[7].id,
      },
      
    ])

  

}
