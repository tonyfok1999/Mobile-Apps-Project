import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('genders');
  if (!hasTable) {
    await knex.schema.createTable('genders', (table) => {
      table.increments();
      table.string('gender').notNullable;
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('genders');
}
