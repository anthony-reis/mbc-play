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
