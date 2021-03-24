import axios, { AxiosStatic, AxiosResponse } from "axios";


export interface Heroes { 
    heroes: Hero[];
}

export interface Hero {
    id: number,
    name: string,
    localized_name: string,
    primary_attr: string,
    attack_type: string,
    roles: string[],
    legs: string

}
export interface NormalizedHeroes {
    id: number,
    name: string,
    primary_attr: string,
    roles: string[]
}

export class OpenDota {
    constructor(protected request: AxiosStatic) { }

    public async try(): Promise<NormalizedHeroes[]> {
        const url =  'https://api.opendota.com/api/heroes'
        const objResponse = await this.request.get<Hero, Hero[]>(url);
        // Cast to array
        const herois = Object.values(objResponse);

        const finalFormat = this.normalizeData(herois)

        finalFormat.pop();
        return finalFormat;
    }


    private normalizeData(dataResponse: Hero[]): NormalizedHeroes[]{
        const finalHero: NormalizedHeroes[] = 
            dataResponse.map((hero => ({
                id: hero.id,
                name: hero.localized_name,
                primary_attr: hero.primary_attr,
                roles: hero.roles
            })));
        return finalHero;
    }

}