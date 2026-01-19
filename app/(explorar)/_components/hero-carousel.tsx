"use client";

import * as React from "react";
import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Play, InfoIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TMDBMovie } from "@/types/tmdb/tmdb";
import { getImageUrl } from "@/lib/tmdb/client";
import { VideoPlayerModal } from "@/components/shared/video-player-modal";
import { useMovieVideos } from "@/hooks/use-movie-details";

interface HeroCarouselProps {
  movies: TMDBMovie[];
}

function CarouselMovieItem({
  movie,
  isFirst,
  onPlayTrailer,
}: {
  movie: TMDBMovie;
  isFirst: boolean;
  onPlayTrailer: (trailerKey: string, title: string) => void;
}) {
  const { data: videos } = useMovieVideos(movie.id.toString());

  const backdropUrl = getImageUrl.backdrop(movie.backdrop_path);

  const trailer =
    videos?.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official,
    ) || videos?.results.find((video) => video.type === "Trailer");

  if (!backdropUrl) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover object-top transition-transform duration-2000 ease-in-out group-hover:scale-105"
          priority={isFirst}
          loading={isFirst ? undefined : "lazy"}
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 85vw, 909px"
          quality={85}
          fetchPriority={isFirst ? "high" : "auto"}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-dark-400 via-dark-400/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-4 lg:p-8 items-end w-[98%] z-10">
        <div className="flex flex-row items-center gap-2 md:gap-3 w-auto">
          <button
            onClick={() => trailer && onPlayTrailer(trailer.key, movie.title)}
            disabled={!trailer}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-3 py-2.5 md:px-6 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label={trailer ? "Assistir trailer" : "Trailer não disponível"}
          >
            <div className="bg-white rounded-full p-1">
              <Play className="w-3 h-3 md:w-3 md:h-3 text-black fill-black" />
            </div>
            <span className="hidden md:inline text-sm lg:text-base">
              {trailer ? "Assistir" : "Indisponível"}
            </span>
          </button>

          <Link
            href={`/filmes/${movie.id}`}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-3 py-2.5 md:px-6 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Ver detalhes do filme"
          >
            <InfoIcon className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            <span className="hidden md:inline text-sm lg:text-base">
              Detalhes
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const HeroCarouselComponent = ({ movies }: HeroCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  );

  const [activeTrailer, setActiveTrailer] = useState<{
    key: string;
    title: string;
  } | null>(null);

  const handlePlayTrailer = (trailerKey: string, title: string) => {
    setActiveTrailer({ key: trailerKey, title });
  };

  const handleCloseTrailer = () => {
    setActiveTrailer(null);
  };

  if (!movies || movies.length === 0) return null;

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="w-full pl-10"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-3 md:-ml-6 lg:-ml-[54px]">
          {movies.slice(0, 6).map((movie, index) => (
            <CarouselItem
              key={movie.id}
              className="pl-3 md:pl-6 lg:pl-[54px] basis-[90%] sm:basis-[85%] md:basis-[70%] lg:basis-[1020px]"
            >
              <CarouselMovieItem
                movie={movie}
                isFirst={index === 0}
                onPlayTrailer={handlePlayTrailer}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {activeTrailer && (
        <VideoPlayerModal
          videoKey={activeTrailer.key}
          title={`${activeTrailer.title} - Trailer`}
          isOpen={!!activeTrailer}
          onClose={handleCloseTrailer}
        />
      )}
    </>
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
