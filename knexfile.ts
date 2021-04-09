import config, { IConfig } from "config"
import Knex from "knex"

const dbConfig: IConfig = config.get('App.database');


const knexConfig = {
    development: {
        client: 'mysql2',
        connection: {
            // host: dbConfig.get('mysqlUrl'),
            host: '127.0.0.1',
            user: 'root',
            // database: dbConfig.get('database'),
            database: 'movieflix'
        }
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'migrations'
    },
    seeds: {
        directory: './seeds'
    }
};



export default knexConfig;