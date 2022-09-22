import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class OrderService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async getAllOrder() {
    const result = await this.knex.select('*').from('orders').orderBy('updated_at', 'desc');
    return result;
  }

  async getOrderById(id: number) {
    const result = await this.knex.select('*').from('orders').where('id', id);
    const result2 = await this.knex.select('image_name').from('order_images').where('order_id', id);
    return { orderInfo: result[0], orderImagesName: result2 };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
