import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable('workers_of_order');
    if (!hasTable) {
      await knex.schema.createTable('workers_of_order', (table) => {
        table.increments();
        table.integer('worker_id').notNullable;
        table.integer('order_id').notNullable;
  
        table.foreign('worker_id').references('users.id');
        table.foreign('order_id').references('orders.id');
  
        table.timestamps(false, true);
      });
    }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('workers_of_order');
}

