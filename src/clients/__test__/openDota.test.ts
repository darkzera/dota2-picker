import { OpenDota } from "@src/clients/OpenDota";

describe('OpenDota client', () => {
    it('it should return heroes from opendota api', async () => {
        const id = 0
        const name = "Anti-Mage"
        const primary_attr = "agi"

        const openDota = new OpenDota();
        const response = await openDota.try(id, name);
        expect(response).toEqual('a');
    })
})