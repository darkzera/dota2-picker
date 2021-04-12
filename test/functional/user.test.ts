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
            // email: 'testing@mai.net',
            // password: '123'
        }

        const {
            body,
            status
        } = await global.testRequest.post('/user/create').send(userAdd);
        expect(status).toBe(200);
        expect(body).toEqual(
            expect.objectContaining(userAdd)
        )
    });

    describe('Should return 400 status due validation of', () => {

        it('failed creating User reject USER value type', async () => {
            const {
                body,
                status
            } = await global.testRequest.post('/user/create').send({
                name: 123,
                job_role: 'Missing'
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
                job_role: 123
            });
            expect(status).toBe(400);
            expect(body).toEqual('job_role: should be string')
        });
    });
});

describe.skip('User ... functional testing', () => {
    // TODO
})