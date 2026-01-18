export interface MediaItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  releaseYear: string;
  mediaType: "movie" | "tv";
}

export interface Genre {
  id: number;
  name: string;
}

export interface MediaInfoProps {
  title: string;
  releaseYear: number;
  rating: number;
  duration: string;
  ageRating?: string;
  genres: Genre[];
  overview: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MediaCreditsProps {
  cast: CastMember[];
  crew: CrewMember[];
  directorLabel?: string;
  producersLabel?: string;
  castLabel?: string;
}
