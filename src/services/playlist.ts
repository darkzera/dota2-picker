import { MoviesFlix, NormalizedMovie } from "@src/clients/moviesFlix";
import { InternalError } from "@src/util/errors/internal-error";

export interface Organizer {
    nameOrganizer: string,
    userId: number,
    movieNameSearch: string,
}

export class ServiceProcessingError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Unexpected error during data processing - internal backend error'
        super(`${internalMessage}: ${message}`);
    }

}


export interface AssociatedMovies extends Organizer, NormalizedMovie { }

export class PlayList {
    constructor(protected mFlix = new MoviesFlix()) { }

    public async processMoviesForCompliledByName(playlist: Organizer[]): Promise<AssociatedMovies[]> {
        const playListMovies: AssociatedMovies[] = [];

        try {
            for (const makePlaylist of playlist) {
                const moviesFetched = await this.mFlix.fetchByName(makePlaylist.movieNameSearch);
                // moviesFetched -> movies fetched by name 
                // so next, we must attach movies to organized
                const finalAttachedData = this.attachMoviesOrganizer(moviesFetched, makePlaylist);
                playListMovies.push(...finalAttachedData);
            }

            return playListMovies;
        } catch (error) {
            throw new ServiceProcessingError(error.message);
        }

    }


    private attachMoviesOrganizer(toAttach: NormalizedMovie[], makePlayList: Organizer): AssociatedMovies[] {
        return toAttach.map((movie) => ({
            ... {},
            ... {
                nameOrganizer: makePlayList.nameOrganizer,
                userId: makePlayList.userId,
                movieNameSearch: makePlayList.movieNameSearch,
            },
            ...movie,
        }));
    }

}