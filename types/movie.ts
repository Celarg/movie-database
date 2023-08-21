export const MovieTypeMap = {
    series: 'TV Series',
    movie: 'Movie',
    episode: 'Episode'
}

export type MovieType = keyof typeof MovieTypeMap;

export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster?: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: MovieType;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface MovieSearchResponse {
    Search?: MovieShort[];
    Response: 'False' | 'True';
    Error?: string;
    totalResults: string;
}

export type MovieShort = Pick<Movie, 'Poster'| 'Title' | 'Type' | 'Year'| 'imdbID'>
