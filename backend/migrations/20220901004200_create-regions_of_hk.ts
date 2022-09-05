import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('regions_of_hk');
  if (!hasTable) {
    await knex.schema.createTable('regions_of_hk', (table) => {
      table.increments();
      table.string('region').notNullable;
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('regions_of_hk');
}
