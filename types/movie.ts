// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  year: string;
  genres: string[];
  poster: string;
  overview: string;
  backdrop_path: string;
  backdrop_paths: string[];
  imdbRating?: string;
  tomatoRating?: string;
  rottenTomatoes?: string;
  release_date  : string;
  genre_ids: number[];
  vote_average  : number;
  poster_path: string;
  trailerLink: string;

}
