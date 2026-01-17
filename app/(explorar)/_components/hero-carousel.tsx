"use client";

import * as React from "react";
import { memo } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Play, Info } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TMDBMovie } from "@/types/tmdb/tmdb";
import { getImageUrl } from "@/lib/tmdb/client";

interface HeroCarouselProps {
  movies: TMDBMovie[];
}

const HeroCarouselComponent = ({ movies }: HeroCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  );

  if (!movies || movies.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full pl-10"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-3 md:-ml-6 lg:-ml-[54px]">
        {movies.slice(0, 6).map((movie, index) => {
          const backdropUrl = getImageUrl.backdrop(movie.backdrop_path);
          if (!backdropUrl) return null;

          const isFirst = index === 0;

          return (
            <CarouselItem
              key={movie.id}
              className="pl-3 md:pl-6 lg:pl-[54px] basis-[90%] sm:basis-[85%] md:basis-[70%] lg:basis-[909px]"
            >
              <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
                <div className="absolute inset-0">
                  <Image
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-[2000ms] ease-in-out group-hover:scale-105"
                    priority={isFirst}
                    loading={isFirst ? undefined : "lazy"}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 85vw, 909px"
                    quality={85}
                    fetchPriority={isFirst ? "high" : "auto"}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 items-start max-w-3xl z-10">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-widest mb-2 md:mb-3 drop-shadow-2xl leading-none text-white">
                    {movie.title}
                  </h1>

                  <p className="text-gray-200 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-2 mb-3 md:mb-4 max-w-lg drop-shadow-md font-medium hidden sm:block">
                    {movie.overview}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full sm:w-auto">
                    <button className="flex items-center justify-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-4 py-2.5 md:px-6 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95">
                      <div className="bg-white rounded-full p-0.5 md:p-1">
                        <Play className="w-2.5 h-2.5 md:w-3 md:h-3 text-black fill-black" />
                      </div>
                      <span className="text-sm md:text-sm lg:text-base">
                        Assistir
                      </span>
                    </button>

                    <button className="flex items-center justify-center gap-1.5 md:gap-2 bg-[#1F1F1F]/60 backdrop-blur-md hover:bg-[#1F1F1F]/80 text-white px-4 py-2.5 md:px-6 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 border border-transparent hover:border-white/10">
                      <Info className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      <span className="text-sm md:text-sm lg:text-base">
                        Detalhes
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

HeroCarouselComponent.displayName = "HeroCarousel";

export const HeroCarousel = memo(
  HeroCarouselComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.movies.length === nextProps.movies.length &&
      prevProps.movies[0]?.id === nextProps.movies[0]?.id
    );
  },
);
