import * as HTTPUtil from "@src/util/request"
import { InternalError } from "@src/util/errors/internal-error";
import config, { IConfig } from 'config'

// Interfaces
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

// error handle classes
export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Internal Error - Failed to request on external API';
        super(`${internalMessage}: ${message}`);
    }
}
export class ClientResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Unexpected error returned by Dota API external service'
        super(`${internalMessage}: ${message}`);
    }
}

// Configuracao p variavel 
// ./config/default.json
const openApiResourceConfig: IConfig = config.get('App.resources.OpenDota');

export class OpenDota {
    constructor(protected request = new HTTPUtil.Request()) { }

    // #4
    public async try(): Promise<NormalizedHeroes[]> {
        const url = `${openApiResourceConfig.get('apiUrl')}heroes`;

        
        try {
            const objResponse = await this.request.get<Hero, Hero[]>(url, {
                headers: {
                    Authorization: openApiResourceConfig.get('apiToken')
                }
            });

            // Cast to array
            const herois = Object.values(objResponse.data);
            // Above casting its resulting an last position with null values - finalFormat[length] = NULL VALUES
            // Must check .normalizeData() to verify why its LOOP one extra position
            const finalFormat = this.normalizeData(herois)
            // -> So decided to .pop() and remove the last position before return it 
            finalFormat.pop();
            
            return finalFormat;

        } catch (err) {
            if (HTTPUtil.Request.isReqError(err)){
                throw new ClientResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`
                )
            }
            throw new ClientRequestError(err.message);
        }

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
    }


    // TODO: WORK on this 
    // #6
    private isValid(dataCheck: Partial<Hero>): boolean {
        return dataCheck.id !== null

    }

}