import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('worker_info');
  if (!hasTable) {
    await knex.schema.createTable('worker_info', (table) => {
      table.increments();
      table.string('info');
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('worker_info');
}
