import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('chatrooms');
  if (!hasTable) {
    await knex.schema.createTable('chatrooms', (table) => {
      table.increments();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chatrooms');
}
