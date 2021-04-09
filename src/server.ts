import './util/module-alias';
import { Server, Controller } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';

// database
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';
import { PlayListController } from './controllers/playlist';



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
    }

    public async close(): Promise<void> {
        await knex.destroy();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }
    private setupControllers(): void {

        const playListController = new PlayListController();
        this.addControllers(playListController);
    }

    public start(): void {

        this.app.listen(this.app.get('port'), () => {
            console.log('Express in:', this.app.get('port'));
        })
    }


    public getApp(): Application {
        return this.app;
    }
}
