"use client";

import { MediaInfoProps } from "@/types/media/media";
import { Star } from "lucide-react";

export function MediaInfo({
  title,
  releaseYear,
  rating,
  duration,
  ageRating = "13",
  genres,
  overview,
}: MediaInfoProps) {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 relative z-10">
      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight mb-3 sm:mb-4 md:mb-5 text-white drop-shadow-lg">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 md:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 font-medium">
            <span>{releaseYear}</span>

            <span className="text-white">•</span>

            <span className="px-2 py-0.5 border border-gray-400/50 rounded text-xs sm:text-sm md:text-base">
              {ageRating}
            </span>

            <span className="text-white">•</span>

            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-2 sm:px-2.5 md:px-3 py-1 text-xs sm:text-sm md:text-base bg-transparent border border-gray-400/50 rounded-full text-white hover:bg-white/10 transition-colors"
              >
                {genre.name}
              </span>
            ))}

            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-transparent border border-gray-400/50 rounded-full px-2 sm:px-2.5 md:px-3 py-1 ">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-full md:max-w-4xl lg:max-w-5xl drop-shadow-md">
          {overview || "Sinopse não disponível."}
        </p>
      </div>
    </div>
  );
}
