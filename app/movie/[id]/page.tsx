// app/movie/[id]/page.tsx
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
} from "@/lib/tmdb/hooks/use-movie-details";
import { MovieHero } from "../_components/movie-hero";
import { MovieInfo } from "../_components/movie-info";
import { MovieCreditsSection } from "../_components/movie-credits";

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
    ) || videos?.results.find((video) => video.type === "Trailer");

  if (loadingMovie) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-12 h-12 animate-spin" />
          <span className="text-xl">Carregando filme...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <MovieHero movie={movie} trailerKey={trailer?.key} />

      <MovieInfo movie={movie} />

      {loadingCredits ? (
        <div className="px-6 md:px-10 py-12 text-center text-zinc-500">
          Carregando informações...
        </div>
      ) : (
        credits && <MovieCreditsSection credits={credits} />
      )}
    </div>
  );
}
