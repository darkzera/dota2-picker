import { MoviesFlix, NormalizedMovie } from "@src/clients/moviesFlix";
import normalizedMovie from "@test/fixtures/normalizedMovies.json"
import expectedPlaylist from "@test/fixtures/expectedPlaylist.json"
import { 
    PlayList, 
    Organizer,
    ServiceProcessingError,
} from "../playlist";

jest.mock('@src/clients/moviesFlix');
describe('Playlist maker test for service', () => {

    const mockedMoviesFlixServ = new MoviesFlix() as jest.Mocked<MoviesFlix>;

    // mockedMoviesFlixServ.fetchByName.mockResolvedValue(normalizedMovie);
    // FIX 
    // const normal: NormalizedMovie[] = normalizedMovie;
    // mockedMoviesFlixServ.fetchByName.mockResolvedValue(normal)

    it('may return associated playlist with movies fetchin by name', async () => {
        // this works
        MoviesFlix.prototype.fetchByName = jest.fn()
            .mockResolvedValue(normalizedMovie);
        const organizer: Organizer[] = [{
            nameOrganizer: 'playlist-fake',
            userId: 1,
            movieNameSearch: 'matrix'
        }];
        const playlistMaker = new PlayList();
        const attachData = await playlistMaker.processMoviesForCompliledByName(organizer);
        
        expect(attachData).toEqual(expectedPlaylist);
    });

    // empty request
    it('suposed to fail when we request as empty data', async () => {
        const playlistMaker = new PlayList();
        const noDataRequest = await playlistMaker.processMoviesForCompliledByName([]);
        expect(noDataRequest).toEqual([]);
    });


    // suposed to throw a Internal error if we dont even reach to call APi
    it('shoul return ', async () => {
        const organizer: Organizer[] = [{
            nameOrganizer: 'playlist-fake',
            userId: 1,
            movieNameSearch: 'matrix'
        }];


        mockedMoviesFlixServ.fetchByName.mockRejectedValue('Error fetching data');
        const playListMaker = new PlayList(mockedMoviesFlixServ);
        await expect(playListMaker.processMoviesForCompliledByName(organizer))
            .rejects.toThrow(ServiceProcessingError);

    });

    // // suposed to throw a error from external service (ImDB/movieFlix)
    // it('shoul return ', async () => {

    // });

})