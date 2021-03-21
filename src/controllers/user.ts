import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
@Controller('users/')
export class UserController {
    @Get('')
    public getUsers(_: Request, res: Response): void {
        res.status(200).json([
            {
                name: 'Antonio',
                job_role: 'Python Badass',
                birthdate: '2018-03-29T13:34:00.000',
                admission_date: '2018-03-29T13:34:00.000',
            },
        ]);
    }
}
