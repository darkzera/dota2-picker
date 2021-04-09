import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('organizers_users', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.integer('userId').unsigned().index().references('id').inTable('users')
        table.integer('organizerId').unsigned().index().references('id').inTable('organizers')
    })


}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('organizers_users')
}

