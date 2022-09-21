import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('attendees');
  if (!hasTable) {
    await knex.schema.createTable('attendees', (table) => {
      table.increments();
      table.integer('user_id').notNullable;
      table.foreign('user_id').references('users.id');
      table.integer("chatroom_id").notNullable;
      table.foreign("chatroom_id").references("chatrooms.id");
      table.boolean('is_favourite').defaultTo(false).notNullable;
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attendees');
}
