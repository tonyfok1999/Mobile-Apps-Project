import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("chatrooms", (table) => {
    table.dropColumn("attendee_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("chatrooms", (table) => {
    table.integer("attendee_id").notNullable;
    table.foreign("attendee_id").references("attendees.id");
  });
}
