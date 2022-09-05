import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('districts_of_hk');
  if (!hasTable) {
    await knex.schema.createTable('districts_of_hk', (table) => {
      table.increments();
      table.integer('region_id').notNullable;
      table.string('district').notNullable;

      table.foreign('region_id').references('regions_of_hk.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('districts_of_hk');
}
