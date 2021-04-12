import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {

    const db = knex.schema;

    await db.createTable('users', (table: Knex.TableBuilder) => { 
        table.increments('id').primary()
        table.string('name')
        table.string('job_role')
        table.string('email')
        table.string('password')
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('users')
}

