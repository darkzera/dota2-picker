import { UserInterface } from "@src/util/interfaces/user";
import User from "@src/models/user";
import { UserService } from "@src/services/user";

describe('User create functional testing', () => {
    beforeAll(async () => {
        await User.query().delete().where('name', 'Inacio -fakeUser functional testing');
    });

    it('should return 200 status and sucessfull create an User - /user/create/', async () => {

        const userAdd: UserInterface = {
            name: 'Inacio -fakeUser functional testing',
            job_role: 'functional tester',
            email: 'testing@mai.net',
            password: 'pwdTesting'
        }

        const {
            body,
            status
        } = await global.testRequest.post('/user/create').send(userAdd);
        expect(status).toBe(200);

        // jest time out error causing by jest + bcrypt 
        // expect(UserService.compareLiteralAndHashPassoword(userAdd.password, body.password)).resolves.toBeTruthy();

        // body password -> literal
        // return from function -> hashed (how Im suposed to fix this???)
        expect(body).toEqual(
            expect.objectContaining({
                ... userAdd, ... {password: expect.any(String)}
            })
        )
    });

    describe('Should return 400 status due validation of', () => {

        it('failed creating User reject USER value type', async () => {
            const {
                body,
                status
            } = await global.testRequest.post('/user/create').send({
                name: 123,
                job_role: 'Missing',
                email: 'get@toke.net',
                password: 'ohmtest'
            });
            expect(status).toBe(400);
            expect(body).toEqual('name: should be string')
        });

        it('failed creating User reject JOB_ROLE value type', async () => {
            const {
                body,
                status
            } = await global.testRequest.post('/user/create').send({
                name: 'testing-name',
                job_role: 123,
                email: 'get@toke.net',
                password: 'ohmtest'
            });
            expect(status).toBe(400);
            expect(body).toEqual('job_role: should be string')
        });
    });
});

describe('User ... functional testing', () => {
    // TODO
    it('attempt to login', async() => { 
        const {
            body,
            status
        } = await global.testRequest.post('/user/login').send({
            email: 'testing@mai.net',
            password: 'pwdTesting'
        });

    })
})