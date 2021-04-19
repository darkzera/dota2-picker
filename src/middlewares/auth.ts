import { Request, Response, NextFunction } from "express";
import { UserService } from "@src/services/user";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void{
    const t = req.headers['x-access-token'];
    // const uncryptedToken = UserService.verifyToken(t);
}