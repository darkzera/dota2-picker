import { Controller, Post } from "@overnightjs/core";
import { Request, Response} from "express";
import User from "@src/models/user";
import { UserInterface } from "@src/util/interfaces/user";
import { InternalError } from "@src/util/errors/internal-error";
import { ValidationError } from "objection";
@Controller('user')
export class UserController {


    @Post('create')
    public async createUser(req: Request, res:Response): Promise<Response> { 
        const user: UserInterface = {
            name: req.body.name,
            job_role: req.body.job_role,
        }
        try {
            const userAdded: User = await User.query().insert(user)
            
            return res.status(200).json(userAdded);
        } catch (error) {
            if (error instanceof ValidationError){
                return res.status(400).json(error.message)
            }
            if (error instanceof error)
                return res.status(400).json(error.message)

            return res.json(error + "No status provider - must implement this")
        }

    }
}