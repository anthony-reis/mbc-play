"use client";

import { MovieDetails } from "@/types/tmdb/movie-details";
import { Star } from "lucide-react";

interface MovieInfoProps {
  movie: MovieDetails;
}

export function MovieInfo({ movie }: MovieInfoProps) {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  const ageRating = "13";

  return (
    <div className="px-6 md:px-10 -mt-32 relative z-10">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
          {movie.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
          <span className="px-3 py-1 bg-zinc-800/80 backdrop-blur-sm rounded-md text-white font-semibold border border-zinc-700">
            {releaseYear}
          </span>

          <span className="px-3 py-1 bg-zinc-800/80 backdrop-blur-sm rounded-md text-white font-semibold border border-zinc-700">
            {ageRating}
          </span>

          <span className="px-3 py-1 bg-zinc-800/80 backdrop-blur-sm rounded-md text-white font-semibold border border-zinc-700">
            {runtimeHours}h {runtimeMinutes}m
          </span>

          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/80 backdrop-blur-sm rounded-md border border-zinc-700">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-bold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-zinc-800/80 backdrop-blur-sm rounded-md text-white font-medium border border-zinc-700"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl">
          {movie.overview || "Sinopse não disponível."}
        </p>
      </div>
    </div>
  );
}
