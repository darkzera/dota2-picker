import { Controller, Post } from "@overnightjs/core";
import { Request, Response} from "express";
import User from "@src/models/user";
import { UserInterface } from "@src/util/interfaces/user";
import { ValidationError } from "objection";
import { UserService } from "@src/services/user";
@Controller('user')
export class UserController {


    @Post('create')
    public async createUser(req: Request, res:Response): Promise<Response> { 
        const user: UserInterface = {
            name: req.body.name,
            job_role: req.body.job_role,
            email: req.body.email,
            password: req.body.password
        }
        try {
            const userAdded: User = await User.query().insert(user)
            
            return res.status(200).json(userAdded);
        } catch (error) {
            if (error instanceof ValidationError){
                return res.status(400).json(error.message)
            }

            return res.json(error + "No status provider - must implement this")
        }
    }

    @Post('login')
    public async login(req: Request, res:Response): Promise<Response> { 
        try {
            const userToLogin = await User.query().where('email', req.body.email);
            
            // const userToLogin = await User.query().where()
            const pwd = await UserService.compareLiteralAndHashPassoword(req.body.password,userToLogin[0].pwdHashed)
            
   
            return res.status(200);
        }
        catch (error) {
            return res.status(400);
        }
    }

}