import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('quotes');
  if (!hasTable) {
    await knex.schema.createTable('quotes', (table) => {
      table.increments();
      table.integer('order_id').notNullable;
      table.integer('worker_id').notNullable;
      table.integer('price').notNullable;
      table.integer('working_period').notNullable;
      table.string('comment');

      table.foreign('order_id').references('orders.id');
      table.foreign('worker_id').references('users.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('quotes');
}
