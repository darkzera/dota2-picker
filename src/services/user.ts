/* eslint-disable @typescript-eslint/ban-types */
import toHash from "bcrypt"
import jwt from 'jsonwebtoken';

export class UserService { 

    public static hashPassword(pwd: string): string{
        try {
            pwd = toHash.hashSync(pwd, 8)
            return pwd;
        } catch (error) {
            console.error('Error hashing function');
            return error.message;
        }
    }

    public static compareLiteralAndHashPassoword(literalPwd: string, hashedPwd: string): Promise<boolean> {
        // return toHash.compareSync(literalPwd, hashedPwd);
        return toHash.compare(literalPwd, hashedPwd);
    }

    public static generateToken(payload: object): string {  
        return jwt.sign(payload, 'test-key', {
            expiresIn: 10000
        })
    }

}