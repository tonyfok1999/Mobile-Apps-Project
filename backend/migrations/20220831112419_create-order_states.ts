import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('order_states');
  if (!hasTable) {
    await knex.schema.createTable('order_states', (table) => {
      table.increments();
      table.string('order_state').notNullable;
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_states');
}
