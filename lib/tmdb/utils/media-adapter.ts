import { MediaItem } from "@/types/media/media";
import { TMDBMovie, TMDBShow } from "@/types/tmdb/tmdb";

export function movieToMedia(movie: TMDBMovie): MediaItem {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    releaseYear: movie.release_date ? movie.release_date.split("-")[0] : "—",
    mediaType: "movie",
  };
}

export function showToMedia(show: TMDBShow): MediaItem {
  return {
    id: show.id,
    title: show.name,
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    vote_average: show.vote_average,
    releaseYear: show.first_air_date ? show.first_air_date.split("-")[0] : "—",
    mediaType: "tv",
  };
}

export function moviesToMedia(movies: TMDBMovie[]): MediaItem[] {
  return movies.map(movieToMedia);
}

export function showsToMedia(shows: TMDBShow[]): MediaItem[] {
  return shows.map(showToMedia);
}
