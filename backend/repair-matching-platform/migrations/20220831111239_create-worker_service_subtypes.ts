import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('worker_service_subtypes');
  if (!hasTable) {
    await knex.schema.createTable('worker_service_subtypes', (table) => {
      table.increments();
      table.integer('worker_id').notNullable;
      table.integer('subtype_id').notNullable;

      table.foreign('worker_id').references('users.id');
      table.foreign('subtype_id').references('service_subtypes.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('worker_service_subtypes');
}
