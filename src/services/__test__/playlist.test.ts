import { MoviesFlix } from "@src/clients/moviesFlix";
import normalizedMovie from "@test/fixtures/normalizedMovies.json"
import expectedPlaylist from "@test/fixtures/expectedPlaylist.json"
import { PlayList, Organizer } from "../playlist";

describe('Playlist maker test for service', () => {

    it('may return associated playlist with movies fetchin by name', async () => {

        MoviesFlix.prototype.fetchByName = jest.fn()
            .mockResolvedValue(normalizedMovie);
        const organizer: Organizer[] = [{
            nameOrganizer: 'playlist-fake',
            userId: 'any-id',
            movieNameSearch: 'matrix'
        }];
        const playlistMaker = new PlayList();
        const attachData = await playlistMaker.processMoviesForCompliledByName(organizer);
        expect(attachData).toEqual(expectedPlaylist);

    });

})