export interface TMDBShowDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  created_by: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface TMDBShowCredits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }>;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}
