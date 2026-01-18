"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb/client";
import { VideoPlayerModal } from "../video-player-modal";

interface MediaHeroProps {
  title: string;
  backdropPath: string | null;
  trailerKey?: string;
}

export function MediaHero({ title, backdropPath, trailerKey }: MediaHeroProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  const backdropUrl = backdropPath
    ? getImageUrl.backdrop(backdropPath, "original")
    : null;

  return (
    <>
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {backdropUrl && (
          <div className="absolute inset-0">
            <Image
              src={backdropUrl}
              alt={title}
              fill
              className="object-cover object-[center_15%]"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent" />
          </div>
        )}

        {trailerKey && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <button
              onClick={() => setShowTrailer(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 md:border-3 border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10 group"
              aria-label="Play trailer"
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white fill-white ml-1 sm:ml-1.5 md:ml-2 group-hover:scale-110 transition-transform" />
            </button>

            <h1 className="text-base sm:text-2xl font-medium text-white drop-shadow-lg ">
              Assistir trailer
            </h1>
          </div>
        )}
      </div>

      {trailerKey && (
        <VideoPlayerModal
          videoKey={trailerKey}
          title={`${title} - Trailer`}
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}
