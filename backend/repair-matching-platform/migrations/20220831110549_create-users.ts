import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('users');
  if (!hasTable) {
    await knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('email').notNullable;
      table.string('password').notNullable;
      table.string('nickname').notNullable;
      table.integer('phone').notNullable;
      table.integer('gender_id').notNullable;
      table.string('profile_photo');
      table.boolean('is_worker').defaultTo(false).notNullable;
      table.integer('worker_info_id');
      table.integer('score');

      table.foreign('gender_id').references('genders.id');
      table.foreign('worker_info_id').references('worker_info.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
