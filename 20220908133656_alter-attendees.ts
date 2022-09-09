import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("attendees", (table) => {
    table.integer("chatroom_id").notNullable;
    table.foreign("chatroom_id").references("chatrooms.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("attendees", (table) => {
    table.dropColumn("chatroom_id");
  });
}
