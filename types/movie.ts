// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  year: string;
  genres: string[];
  poster: string;
  overview: string; // Eğer overview verisini de kullanacaksanız
  backdrop_path: string;
  imdbRating?: string;
  tomatoRating?: string;
  rottenTomatoes?: string;
  release_date  : string;
  genre_ids: number[];
  vote_average  : number;
  poster_path: string;
}
