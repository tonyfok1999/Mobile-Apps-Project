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

      { service_type_id: typeArrayId[1].id, subtype: '消防電氣裝配（家居）' },
      { service_type_id: typeArrayId[1].id, subtype: '消防電氣裝配（商戶）' }, 
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
      { region_id: regionArrayId[0].id, district: '灣仔' },
      { region_id: regionArrayId[0].id, district: '東區' },
      { region_id: regionArrayId[0].id, district: '南區' },
      { region_id: regionArrayId[1].id, district: '深水埗' },
      { region_id: regionArrayId[1].id, district: '油尖旺' },
      { region_id: regionArrayId[1].id, district: '九龍城' },
      { region_id: regionArrayId[1].id, district: '黃大仙' },
      { region_id: regionArrayId[1].id, district: '觀塘' },
      { region_id: regionArrayId[2].id, district: '沙田' },
      { region_id: regionArrayId[2].id, district: '大埔' },
      { region_id: regionArrayId[2].id, district: '北區' },
      { region_id: regionArrayId[2].id, district: '元朗' },
      { region_id: regionArrayId[2].id, district: '屯門' },
      { region_id: regionArrayId[2].id, district: '西貢' },
      { region_id: regionArrayId[2].id, district: '離島' },
      { region_id: regionArrayId[2].id, district: '荃灣' },
      { region_id: regionArrayId[2].id, district: '葵青' },
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
      },
      {
        email: 'admin2@gmail.com',
        password: '$2b$04$q5avHJJKyBKMW/jjOLDHoO8QxwadepsQXmkfoo2B568e/6Id0GEVy',
        nickname: 'admin2',
        phone: 90000001,
        gender_id: genderArrayId[0].id,
      },
      {
        email: 'admin3@gmail.com',
        password: '$2b$04$gtksDXsUtFbk1JqOP0kkH.isc3Aa5lDp3H2Xg5iU8KJTYS4rvl8yC',
        nickname: 'admin3',
        phone: 90000003,
        gender_id: genderArrayId[1].id,
      },
      {
        email: 'admin4@gmail.com',
        password: '$2b$04$bqHTIC7ceRinZD4FLuFUy.REUQM9oajwPwPnDyRTEvtFZnIfYhGoG',
        nickname: 'admin4',
        phone: 90000004,
        gender_id: genderArrayId[1].id,
      },
      {
        email: 'worker1@gmail.com',
        password: '$2b$04$55phserGrX0zCJQTk4f6gOKRbzRRCCbV.U/pEInJDhBHVnoj3l9Nu',
        nickname: 'worker1',
        phone: 90000005,
        gender_id: genderArrayId[0].id,
        is_worker:true,
      },
      {
        email: 'worker2@gmail.com',
        password: '$2b$04$ShMZgtT0swlUdfA6m9Zm9OP8XLe.ZdaKDJTxAd6qR0zvsFdQ0kRu6',
        nickname: 'worker2',
        phone: 90000006,
        gender_id: genderArrayId[1].id,
        is_worker:true,
      },
    ])
    .into('users')
    .returning('id');


    await knex('worker_service_subtypes').insert([
      {
        worker_id: userArrayId[5].id,
        subtype_id: subtypeArrayId[5].id,
      },
      {
        worker_id: userArrayId[5].id,
        subtype_id:subtypeArrayId[6].id,
      },
      {
        worker_id: userArrayId[5].id,
        subtype_id:subtypeArrayId[7].id,
      },
      {
        worker_id: userArrayId[4].id,
        subtype_id:subtypeArrayId[15].id,
      },
      {
        worker_id: userArrayId[4].id,
        subtype_id: subtypeArrayId[16].id,
      },
      
    ])

    let orderArrayId: Array<{ id: number }> = await knex
    .insert([
      {
        user_id: userArrayId[0].id,  
        state_id: orderStateArrayId[0].id,
        service_subtype_id: subtypeArrayId[16].id,
        working_address: 'hk',
        working_date: '2022-10-15',
        budget: 300,
      },
      {
        user_id: userArrayId[1].id,
        state_id: orderStateArrayId[0].id,
        service_subtype_id: subtypeArrayId[15].id,
        working_address: 'ST',
        working_date: '2022-11-05',
        budget: 500,
      },
    ]).into('orders')
    .returning('id');
    

    await knex('quotes').insert([
      {
        order_id: orderArrayId[0].id,  
        worker_id: userArrayId[4].id,
        price: 250,
        working_period:1,
        
      },
      {
        order_id: userArrayId[1].id,
        worker_id: userArrayId[5].id,
        price: 300,
        working_period:2,
        
      },
    ])

    await knex('chatrooms').insert([
      {id: 1},
      {id: 2},
    ])

    await knex('attendees').insert([
      {
        user_id: userArrayId[1].id,
        chatroom_id: 1
      },
      {
        user_id: userArrayId[2].id,
        chatroom_id: 1
      },
      {
        user_id: userArrayId[2].id,
        chatroom_id: 2
      },
      {
        user_id: userArrayId[3].id,
        chatroom_id: 2
      }
    ])

}
