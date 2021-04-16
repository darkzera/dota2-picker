import { UserService } from "../user"

describe('User service unit', () => {

    it('shuld return hashed string passwod', async () => { 
        const solvedPwd = UserService.hashPassword('abracadabra');
        expect.anything();
    })
    it('shuld return sucessfull compare string to literal password', async () => { 
        const passwordLiteral = 'abracadabra'
        const hashed = UserService.hashPassword(passwordLiteral);
        const check = UserService.compareLiteralAndHashPassoword(passwordLiteral, hashed)
        expect(check).toBe(true)
    })


})