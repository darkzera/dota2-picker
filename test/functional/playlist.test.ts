import Organizer from "@src/models/organizer"
import OrganizerUser from "@src/models/organizerUser";

describe('Playlists + organizer fi functional tests', () => {
    beforeAll(async () => {
        await OrganizerUser.query().delete().where('userId', 1);
        await Organizer.query()
            .for(1)
            .delete()
            .where('nameOrganizer', 'playlist-fake')
    })

    describe('when creating playlist org', () => {
        it('should sucessfull create an organizer model', async () => {
            const organizer = {
                nameOrganizer: 'playlist-fake',
                userId: 1,
                movieNameSearch: 'matrix'
            };
            console.log('Suposed to create Organizer like this: ', organizer);
            const { body, status } = await global.testRequest.post('/organizer').send(organizer);
            expect(status).toBe(201);
            expect(body).toEqual(
                expect.objectContaining(organizer)
            );
        });

        it('should return error 422 if we get a validation error ', async () => {
            const organizer = {
                nameOrganizer: 'invalid-name',
                userId: 'l1', // error here -> should be int
                movieNameSearch: 'matrix'
            };
            const { body, status } = await global.testRequest.post('/organizer').send(organizer);
            expect(status).toBe(422);
            expect(body).toEqual({
                error: "userId: should be integer",
            });

        });

    });

    describe('it should load organizer from <User> and attach from external service', () => { 

        it('it should load organizer from <User> and attach into movies to return sucessfuly', async () => { 
            const info = { 
                userId: 1,
                name: 'Raphaelon',
                token: 'token-cavernoso'
            };
            const { body, status } = await global.testRequest.post('/organizer/loadOrgMovies').send(info);
            expect(status).toBe(200);

        })

        it.skip('shuold return error with client side error with validation failure', async () => {
            const infoError = {
                userId: 1,
                name: 'Raphaelon',
                token: 'token-cavernoso'
            }
            const { body, status } = await global.testRequest.post('/organizer/loadOrgMovies').send(infoError);
            expect(status).toBe(401);
            // console.log("=>" + body);
            

        })

    });
});