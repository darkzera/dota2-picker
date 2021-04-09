import * as Knex from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('organizermovie', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.integer('idOrganizer').unsigned().index().references('id').inTable('organizers')
        table.boolean('adult')
        table.string('backdrop_path')
        table.string('genre_ids')
        table.integer('idMovieFromAPI')
        table.string('original_language')
        table.string('original_title')
        table.string('overview')
        table.string('poster_path')
        table.string('release_date')
        table.string('title')
        table.string('video')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('organizermovie')
}

