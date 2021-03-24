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
})
