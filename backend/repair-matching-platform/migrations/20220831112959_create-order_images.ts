import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('order_images');
  if (!hasTable) {
    await knex.schema.createTable('order_images', (table) => {
      table.increments();
      table.integer('order_id').notNullable;
      table.string('image_name').notNullable;
      table.integer('order_image_state_id').notNullable;

      table.foreign('order_id').references('orders.id');
      table.foreign('order_image_state_id').references('order_image_states.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_images');
}
