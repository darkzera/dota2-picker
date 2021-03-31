import { OpenDota, NormalizedHeroes } from "@src/clients/OpenDota";
import * as HTTPUtil from "@src/util/request"

export class Hero {

    constructor(protected openDota = new OpenDota()){ }

    public async getAllHeroes(): Promise<NormalizedHeroes[] | any>{
  
        return await this.openDota.try()

    }


    public async processFavoriteHeroes(id: number): Promise<any> {

        return -1
    }





}