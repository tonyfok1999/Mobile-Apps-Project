import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('service_types');
  if (!hasTable) {
    await knex.schema.createTable('service_types', (table) => {
      table.increments();
      table.string('type').notNullable;
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('service_types');
}
