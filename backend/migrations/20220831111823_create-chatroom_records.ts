import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('chatroom_records');
  if (!hasTable) {
    await knex.schema.createTable('chatroom_records', (table) => {
      table.increments();
      table.integer('chatroom_id').notNullable;
      table.integer('sender_id').notNullable;
      table.text('text');
      table.string('image');
      
      table.foreign('sender_id').references('users.id');
      table.foreign('chatroom_id').references('chatrooms.id');

      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chatroom_records');
}
