import { OpenDota } from "@src/clients/OpenDota";
import axios from 'axios'
import * as allHeroes from "@test/fixtures/allHeroes.json"
import allHeroesNormalized from "@test/fixtures/normalized.json";
jest.mock('axios');

describe('OpenDota client', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;  // #7

    it('it should return normalized heroes from opendota api call', async () => {
        mockedAxios.get.mockResolvedValue(allHeroes) // #7

        const openDota = new OpenDota(axios);
        const response = await openDota.try();
        expect(response).toEqual(allHeroesNormalized);


    });

    it('it should return like INTERNAL error from DotaAPI service when request failed BEFORE reach external service', async () => {
        const openDota = new OpenDota(axios);

        mockedAxios.get.mockRejectedValue({ 
            message: 'Network error' 
        });

        // This is a necessary syntax below 
        await expect(openDota.try()).rejects.toThrow(
            'Internal Error - Failed to request on external API: Network error' 
        );
    });


    it('it should get ClientResponseError when Dota API services responds with error (404)', async() => {
        mockedAxios.get.mockRejectedValue({
            response: {
                status: 404,
                data: { error: ['Not found'] },
            },
        });
        const openDota = new OpenDota(axios);
        await expect(openDota.try()).rejects.toThrow(
            'Unexpected error returned by Dota API external service: Error: {"error":["Not found"]} Code: 404'
        )
    })


})
