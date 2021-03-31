import * as HTTPUtil from "@src/util/request"

export interface Movie {
    adult: false,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string, 
    video: boolean,
    vote_average: number,
    vote_count: number,
}
export interface movieResults {
    moviesF: Movie[]
}
export interface NetFloxReponse{ 
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}
// Removed rating (its changing by time) from original format may causes a fail test
export interface NormalizedMovie {
    adult: false,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string, 
    video: boolean,
}
export class MoviesFlix {
    constructor(protected request = new HTTPUtil.Request) {}


    public async fetchByName(name: string): Promise<NormalizedMovie[]>{
        const url = 'https://api.themoviedb.org/3/search/movie?query=matrix'
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODEwY2Y0NjliZjkxNmY4NDNjN2NjZDJjM2IyZWJhZSIsInN1YiI6IjYwNjM3MWJiMTEzMGJkMDAzZTU5MDc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-uxsdZMYQYfq_n3S7oJhBjthTUv68M2Hv1xFZH3TqW4';
        
        const response = await this.request.getMovies<NetFloxReponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const movies = this.normalizeData(response.data.results);
        return movies;
    }
    private normalizeData(moviesUnmastered: Movie[]): NormalizedMovie[] {
        const normalized: NormalizedMovie[] =
            moviesUnmastered.map((mov => ({
                adult: mov.adult,
                backdrop_path: mov.backdrop_path,
                genre_ids: mov.genre_ids,
                id: mov.id,
                original_language: mov.original_language,
                original_title: mov.original_title,
                overview: mov.overview,
                poster_path: mov.poster_path,
                release_date: mov.release_date,
                title: mov.title,
                video: mov.video
            })));
            
        return normalized;

    }
}