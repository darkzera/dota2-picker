import { MoviesFlix } from "../moviesFlix";
import normalizedMovie from "@test/fixtures/normalizedMovies.json"
import * as HTTPUtil from "@src/util/request"
import * as allMovies from "@test/fixtures/movies.json"
jest.mock('@src/util/request');
describe('Movie Flix client - test', () => {
    // Static call
    const mockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>;
    // Instance call
    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;

    it('should return an movie depends by name search', async() => {
        const movieName = 'matrix';
        mockedRequest.getMovies.mockResolvedValue({
            data: allMovies
        } as HTTPUtil.Response);

        const mFlix = new MoviesFlix(mockedRequest);
        const response = await mFlix.fetchByName(movieName);
        
        

        expect(response).toEqual(normalizedMovie);

    });


})