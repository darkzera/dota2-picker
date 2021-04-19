/* eslint-disable @typescript-eslint/ban-types */
import toHash from "bcrypt"
import jwt from 'jsonwebtoken';
import config, { IConfig } from 'config'
import { DecodedUser } from "@src/util/interfaces/user";

const APIconfigResource: IConfig = config.get('App.resources.jsonToken')
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
        const tokenKey = `${APIconfigResource.get('jwt-secret-key')}`;
        return jwt.sign(payload, tokenKey, {
            expiresIn: 2000000
        })
    }

    public static verifyToken(token: string): DecodedUser {
        const tokenKey = `${APIconfigResource.get('jwt-secret-key')}`;
        const must: DecodedUser = jwt.verify(token, tokenKey) as DecodedUser
        console.log("-- Must: " , must);
        return must;
    }

    

}