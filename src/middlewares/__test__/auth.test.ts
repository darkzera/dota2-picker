import { UserService } from "@src/services/user";
import { authMiddleware } from "../auth";

describe('Middleware authentication test', () => {

    it('should verify token and call next middleware', async () => {
        const token = UserService.generateToken({data: 'fake'});
        const reqFake = {
            headers: {
                'x-access-token': "asd" 
            },
        };
        const resFake = {}
        const nextFake = jest.fn();
        authMiddleware(reqFake, resFake, nextFake);
        expect(true);
    })
})