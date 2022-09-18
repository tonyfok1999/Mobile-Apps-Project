import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable('connected_users');
    if (!hasTable) {
      await knex.schema.createTable('connected_users', (table) => {
        table.increments();
        table.string('socket_id').notNullable;
        table.integer('user_id').notNullable;
  
        table.foreign('user_id').references('users.id');
  
        table.timestamps(false, true);
      });
    }
}


export async function down(knex: Knex): Promise<void> {
 await knex.schema.dropTableIfExists('connected_users');
}

