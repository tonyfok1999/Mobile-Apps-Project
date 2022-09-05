import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('orders');
  if (!hasTable) {
    await knex.schema.createTable('orders', (table) => {
      table.increments();
      table.integer('user_id').notNullable;
      table.integer('worker_id');
      table.integer('state_id').notNullable;
      table.integer('service_subtype_id').notNullable;
      table.string('working_address').notNullable;
      table.date('working_date').notNullable;
      table.integer('budget');
      table.string('voice_message');
      table.string('voice_text');
      table.integer('score_by_user');
      table.integer('score_by_worker');

      table.foreign('user_id').references('users.id');
      table.foreign('worker_id').references('users.id');
      table.foreign('state_id').references('order_states.id');
      table.foreign('service_subtype_id').references('service_subtypes.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('orders');
}
