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
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 -mt-20 sm:-mt-24  relative z-10">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-white whitespace-nowrap">
              {title}
            </h1>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 font-medium whitespace-nowrap">
              <span className="hidden md:block">•</span>
              <span>{releaseYear}</span>
              <span>•</span>
              <span>{ageRating}</span>
              <span>•</span>
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap lg:flex-nowrap">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm md:text-base bg-transparent border border-gray-400/50 rounded-full text-white hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {genre.name}
              </span>
            ))}

            <div className="flex items-center gap-1.5 sm:gap-2  rounded-full px-3 sm:px-4 py-1.5 whitespace-nowrap">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-base font-bold text-white">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <p className="text-white font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-full md:max-w-4xl lg:max-w-5xl drop-shadow-md">
          {overview || "Sinopse não disponível."}
        </p>
      </div>
    </div>
  );
}
