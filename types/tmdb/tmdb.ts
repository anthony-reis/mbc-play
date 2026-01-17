export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface TMDBShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
}

// ✅ TORNAR GENÉRICO
export interface TMDBResponse<T = TMDBMovie> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}
