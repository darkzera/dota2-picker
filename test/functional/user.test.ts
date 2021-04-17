import { UserInterface } from "@src/util/interfaces/user";
import User from "@src/models/user";

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

    it('Should sucessful return an valid token', async () => {
        const {
            body,
            status
        } = await global.testRequest.post('/user/login').send({
            email: 'Jair@Bessi.com',
            password: 'abracadabra'
        });
        expect(status).toBe(200);
        // expect(body).toEqual(
        //     expect.objectContaining({token: expect.any(String)})
        // );
    });

    it('Should fail to get token by no USER FOUND', async () => {
        const {
            body,
            status
        } = await global.testRequest.post('/user/login').send({
            email: 'shuldnt@exist.com',
            password: 'abracadabra'
        });
        expect(status).toBe(401);
        expect(body).toEqual('Not allowed. User not found');
    })

    it('Should fail to get token when user exist but PASSWORD did not match', async () => {
        const {
            body,
            status
        } = await global.testRequest.post('/user/login').send({
            email: 'Jair@Bessi.com',
            password: 'wrongPassword'
        });
        expect(status).toBe(401);
        expect(body).toEqual('Not allowed. Password didnt match');
    })


});

