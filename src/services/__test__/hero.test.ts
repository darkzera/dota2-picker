import * as allHeroes from "@test/fixtures/allHeroes.json"
import allHeroesNormalized from "@test/fixtures/normalized.json";
import * as HTTPUtil from "@src/util/request";
import { OpenDota, NormalizedHeroes } from "@src/clients/OpenDota";
import { Hero } from "../hero";
import { Console } from "console";

jest.mock('@src/clients/OpenDota');


describe('Hero service', () => {

    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;

    it('should get normalized all heroes from external service', async () => {

        const hero = new Hero(new OpenDota());
        // const response = await hero.getAllHeroes();
        
        

    });



    // it('should get favorite heroes of user', async () => {
    //     const favHeroes = new Hero(new OpenDota());




    // })



});