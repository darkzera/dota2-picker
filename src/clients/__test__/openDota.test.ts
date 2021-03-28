import { OpenDota } from "@src/clients/OpenDota";
import * as HTTPUtil from "@src/util/request"
import * as allHeroes from "@test/fixtures/allHeroes.json"
import allHeroesNormalized from "@test/fixtures/normalized.json";
jest.mock('@src/util/request');

describe('OpenDota client', () => {
    // Static call
    const mockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>;
    // Instance call
    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;

    it('it should return normalized heroes from opendota api call', async () => {
        mockedRequest.get.mockResolvedValue({
            data: allHeroes
        } as HTTPUtil.Response) // #7

        const openDota = new OpenDota(mockedRequest);
        const response = await openDota.try();
        expect(response).toEqual(allHeroesNormalized);


    });

    it('it should return like INTERNAL error from DotaAPI service when request failed BEFORE reach external service', async () => {
        const openDota = new OpenDota(mockedRequest);

        mockedRequest.get.mockRejectedValue({
            message: 'Network error'
        });

        // This is a necessary syntax below 
        await expect(openDota.try()).rejects.toThrow(
            'Internal Error - Failed to request on external API: Network error'
        );
    });


    it('it should get ClientResponseError when Dota API services responds with error (404)', async () => {

        // 
        mockedRequestClass.isReqError.mockReturnValue(true);
        mockedRequest.get.mockRejectedValue({
            response: {
                status: 404,
                data: { error: ['Not found'] },
            },
        });

        const openDota = new OpenDota(mockedRequest);
        await expect(openDota.try()).rejects.toThrow(
            'Unexpected error returned by Dota API external service: Error: {"error":["Not found"]} Code: 404'
        );
    })


})
