import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
// Controller
import { PlayListController } from './controllers/playlist';
import { UserController } from './controllers/user';

// DB 
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';

const knex = Knex(knexConfig.development);
export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }

    private async databaseSetup(): Promise<void> {
        await Model.knex(knex);
        console.log('DB is setup i guess?');
        
    }

    public async close(): Promise<void> {
        await knex.destroy();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }
    private setupControllers(): void {
        const playListController = new PlayListController();
        const userController = new UserController();
        this.addControllers([
                playListController,
                userController
            ]);
    }

    public start(): void {

        this.app.listen(this.port, () => {
            console.log('Express in:', this.port,);
        })
    }


    public getApp(): Application {
        return this.app;
    }
}
