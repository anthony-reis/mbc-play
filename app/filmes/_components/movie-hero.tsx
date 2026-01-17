"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb/client";
import { MovieDetails } from "@/types/tmdb/movie-details";

interface MovieHeroProps {
  movie: MovieDetails;
  trailerKey?: string;
}

export function MovieHero({ movie, trailerKey }: MovieHeroProps) {
  const backdropUrl = movie.backdrop_path
    ? getImageUrl.backdrop(movie.backdrop_path)
    : null;

  const handlePlayTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    }
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {backdropUrl && (
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#191919] via-[#191919]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#191919] via-transparent to-transparent" />
        </div>
      )}

      {trailerKey && (
        <button
          onClick={handlePlayTrailer}
          className="absolute inset-0 m-auto w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10 group"
        >
          <Play className="w-10 h-10 md:w-14 md:h-14 text-white fill-white ml-2 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {trailerKey && (
        <p className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base font-semibold z-10">
          Assistir trailer
        </p>
      )}
    </div>
  );
}
