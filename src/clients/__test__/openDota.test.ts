import { OpenDota, NormalizedHeroes } from "@src/clients/OpenDota";
import axios from 'axios'
import * as allHeroes from "@test/fixtures/allHeroes.json"
import allHeroesNormalized from "@test/fixtures/normalized.json";
jest.mock('axios');

describe('OpenDota client', () => {
    it('it should return normalized heroes from opendota api call', async () => {
        axios.get = jest.fn().mockResolvedValue(allHeroes);
        const openDota = new OpenDota(axios);
        const response = await openDota.try();

        // response.map((r) => {
        //     console.log(r)
        // });

        // allHeroesNormalized.map((nrm) => {
        //     console.log(nrm)
        // })



        // expect(response).toEqual(allHeroes);
        expect(response).toEqual(allHeroesNormalized);

    });
})
