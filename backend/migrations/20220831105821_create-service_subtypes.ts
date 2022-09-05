import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('service_subtypes');
  if (!hasTable) {
    await knex.schema.createTable('service_subtypes', (table) => {
      table.increments();
      table.integer('service_type_id').notNullable;
      table.string('subtype').notNullable;
      table.foreign('service_type_id').references('service_types.id');
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('service_subtypes');
}
