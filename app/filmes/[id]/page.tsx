"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
} from "@/hooks/use-movie-details";
import { MediaInfo } from "@/components/shared/media/media-info";
import { MediaCreditsSection } from "@/components/shared/media/media-credits";
import { MediaHero } from "@/components/shared/media/media-hero";
import {
  MediaCreditsSkeleton,
  MediaHeroSkeleton,
  MediaInfoSkeleton,
} from "@/components/shared/media/media-skeleton";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);

  const { data: movie, isLoading: loadingMovie } = useMovieDetails(id);
  const { data: credits, isLoading: loadingCredits } = useMovieCredits(id);
  const { data: videos } = useMovieVideos(id);

  const trailer =
    videos?.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official,
    ) ||
    videos?.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    ) ||
    videos?.results.find(
      (video) =>
        video.type === "Teaser" && video.site === "YouTube" && video.official,
    ) ||
    videos?.results.find(
      (video) => video.type === "Teaser" && video.site === "YouTube",
    );

  if (loadingMovie) {
    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <MediaHeroSkeleton />
        <MediaInfoSkeleton />
        <MediaCreditsSkeleton />
      </div>
    );
  }

  if (!movie) {
    notFound();
  }

  const releaseYear = new Date(movie.release_date).getFullYear();
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <MediaHero
        title={movie.title}
        backdropPath={movie.backdrop_path}
        trailerKey={trailer?.key}
      />

      <MediaInfo
        title={movie.title}
        releaseYear={releaseYear}
        rating={movie.vote_average}
        duration={`${runtimeHours}h ${runtimeMinutes}m`}
        ageRating="13"
        genres={movie.genres}
        overview={movie.overview}
      />

      {loadingCredits ? (
        <div className="px-6 md:px-10 py-12 text-center text-zinc-500">
          Carregando informações...
        </div>
      ) : (
        credits && (
          <MediaCreditsSection cast={credits.cast} crew={credits.crew} />
        )
      )}
    </div>
  );
}
