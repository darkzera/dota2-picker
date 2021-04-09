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

    it('should return an movie depends by name search', async () => {
        const movieName = 'matrix';
        mockedRequest.getMovies.mockResolvedValue({
            data: allMovies
        } as HTTPUtil.Response);
        const mFlix = new MoviesFlix(mockedRequest);
        const response = await mFlix.fetchByName(movieName);
        expect(response).toEqual(normalizedMovie);
    });


    it('should return error during requesting to external server (INTERNAL BACKEND ERR)', async() => {
        const mFlix = new MoviesFlix(mockedRequest);
        mockedRequest.getMovies.mockRejectedValue({
            message: 'Network error - Internal backend error'
        });
        await expect(mFlix.fetchByName('matrix')).rejects.toThrow(
            'Internal Error - Failed to request on external API: Network error');
    });


    it('should return error RESPONSE from external server', async() => {
        mockedRequestClass.isReqError.mockReturnValue(true);
        mockedRequest.getMovies.mockRejectedValue({
            response: {
                status: 404,
                data: { error: ['Not found'] },
            }
        });
        const mFlix = new MoviesFlix(mockedRequest);
        await expect(mFlix.fetchByName('matrix')).rejects.toThrow(
            'Unexpected error returned by Movie API external service: Error: {"error":["Not found"]} Code: 404'
        );

    })

})