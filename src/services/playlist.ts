import { MoviesFlix, NormalizedMovie } from "@src/clients/moviesFlix";

export interface Organizer{
    nameOrganizer: string,
    userId: string, 
    movieNameSearch: string,
}

export interface AssociatedMovies extends Organizer, NormalizedMovie{}

export class PlayList {
    constructor(protected mFlix = new MoviesFlix()) { }

    public async processMoviesForCompliledByName(playlist: Organizer[]): Promise<AssociatedMovies[]> {
        const playListMovies: AssociatedMovies[] = [];

        for (const makePlaylist of playlist) {
            const moviesFetched = await this.mFlix.fetchByName(makePlaylist.movieNameSearch);
            // moviesFetched -> movies fetched by name 
            // so next, we must attach movies to organized
            const finalAttachedData = moviesFetched.map((movie) => ({
                ... {},
                ... {
                    nameOrganizer: makePlaylist.nameOrganizer,
                    userId: makePlaylist.userId,
                    movieNameSearch: makePlaylist.movieNameSearch,
                },
                ...movie,
            }));
            playListMovies.push(...finalAttachedData)
        }

        
        return playListMovies;
    }
}