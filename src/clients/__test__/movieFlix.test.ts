import { MoviesFlix } from "../moviesFlix";

describe('Movie Flix client - test', () => {

    it('should return an movie depends by name search', async() => {
        const movieName = 'matrix';
        const mFlix = new MoviesFlix();
        const resp = await mFlix.fetchByName(movieName)
        // expect(movieName).toEqual(resp);


    });


})