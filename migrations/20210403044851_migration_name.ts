import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    const db = knex.schema;

    await db.createTable('organizers', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('nameOrganizer')
        table.string('movieNameSearch')
        table.integer('userId')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('organizers')
}

