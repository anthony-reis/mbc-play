"use client";

import { Play } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb/client";
import { useState } from "react";
import { TMDBShowDetails } from "@/types/tmdb/show-details";

interface ShowHeroProps {
  show: TMDBShowDetails;
  trailerKey?: string;
}

export function ShowHero({ show, trailerKey }: ShowHeroProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  const backdropUrl = getImageUrl.backdrop(show.backdrop_path, "original");
  const posterUrl = getImageUrl.poster(show.poster_path, "w500");

  return (
    <div className="relative h-[85vh] min-h-[600px]">
      <div className="absolute inset-0">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={show.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-[#191919]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919] via-transparent to-transparent" />
      </div>

      <div className="relative h-full px-6 md:px-10 flex items-end pb-20">
        <div className="flex gap-8 max-w-7xl w-full">
          {posterUrl && (
            <div className="hidden md:block flex-shrink-0">
              <img
                src={posterUrl}
                alt={show.name}
                className="w-[300px] rounded-lg shadow-2xl"
              />
            </div>
          )}

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-4">
                {show.name}
              </h1>
              {show.tagline && (
                <p className="text-xl text-zinc-400 italic">"{show.tagline}"</p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                ⭐ {show.vote_average.toFixed(1)}
              </span>
              <span>•</span>
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>•</span>
              <span>{show.number_of_seasons} temporadas</span>
              {show.episode_run_time[0] && (
                <>
                  <span>•</span>
                  <span>{show.episode_run_time[0]} min/ep</span>
                </>
              )}
            </div>

            <p className="text-lg text-zinc-300 max-w-3xl line-clamp-4">
              {show.overview}
            </p>

            <div className="flex gap-4">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <Play className="w-6 h-6" />
                  Assistir Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="w-full max-w-6xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
