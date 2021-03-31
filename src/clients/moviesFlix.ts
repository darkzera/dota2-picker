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

export class MoviesFlix {
    constructor(protected request = new HTTPUtil.Request) {}


    public async fetchByName(name: string): Promise<[] | any>{
        const url = 'https://api.themoviedb.org/3/movie/popular';
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODEwY2Y0NjliZjkxNmY4NDNjN2NjZDJjM2IyZWJhZSIsInN1YiI6IjYwNjM3MWJiMTEzMGJkMDAzZTU5MDc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-uxsdZMYQYfq_n3S7oJhBjthTUv68M2Hv1xFZH3TqW4';
        
        const response = await this.request.getMovies<NetFloxReponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const movies = response.data;
        
        // movies.results.forEach((movie) => {
        //     console.log(movie)});

        return movies;
    }


}