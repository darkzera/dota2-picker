import { AxiosStatic } from "axios";


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

    // #4
    public async try(): Promise<NormalizedHeroes[]> {
        const url = 'https://api.opendota.com/api/heroes'
        const objResponse = await this.request.get<Hero, Hero[]>(url, {
            headers: {
                Authorization: 'fake-token'
            }
        });

        // Cast to array
        const herois = Object.values(objResponse);
        const finalFormat = this.normalizeData(herois)
        // Above casting its resulting an last position with null values - finalFormat[length] = NULL VALUES
        // Must check .normalizeData() to verify why its LOOP one extra position
        // -> So decided to .pop() and remove the last position before return it 
        finalFormat.pop();
        return finalFormat;
    }


    // #5
    private normalizeData(dataResponse: Hero[]): NormalizedHeroes[] {
        const finalHero: NormalizedHeroes[] =
            dataResponse.map((hero => ({
                id: hero.id,
                name: hero.localized_name,
                primary_attr: hero.primary_attr,
                roles: hero.roles
            })));


        return finalHero;


        //     const finalHero2: NormalizedHeroes[] =
        //         dataResponse.filter(this.isValid.bind(this))
        //             .map((hero => ({
        //                 id: hero.id,
        //                 name: hero.localized_name,
        //                 primary_attr: hero.primary_attr,
        //                 roles: hero.roles
        //             })));

    }


    // Suposed to check to check if value is null
    // TODO: WORK on this 
    // #6
    private isValid(dataCheck: Partial<Hero>): boolean {
        return dataCheck.id !== null

    }

}