import './util/module-alias';
import { Server, Controller } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { UserController } from './controllers/user';
import { Application } from 'express';

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    public init(): void {
        this.setupExpress();
        this.setupController();
    }

    // Express configuration setup
    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    private setupController(): void {
        const userController = new UserController();
        this.addControllers(userController);
    }

    public getApp(): Application {
        return this.app;
    }
}
