"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  useShowDetails,
  useShowCredits,
  useShowVideos,
} from "@/hooks/use-show-details";
import { MediaHero } from "@/components/shared/media/media-hero";
import { MediaInfo } from "@/components/shared/media/media-info";
import { MediaCreditsSection } from "@/components/shared/media/media-credits";
import {
  MediaCreditsSkeleton,
  MediaHeroSkeleton,
  MediaInfoSkeleton,
} from "@/components/shared/media/media-skeleton";
import { ErrorState } from "@/components/shared/error-state";

interface ShowPageProps {
  params: Promise<{ id: string }>;
}

export default function ShowPage({ params }: ShowPageProps) {
  const { id } = use(params);

  const { data: show, isLoading: loadingShow } = useShowDetails(id);
  const { data: credits, isLoading: loadingCredits } = useShowCredits(id);
  const { data: videos } = useShowVideos(id);

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

  if (loadingShow) {
    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <MediaHeroSkeleton />
        <MediaInfoSkeleton />
        <MediaCreditsSkeleton />
      </div>
    );
  }

  if (!show) {
    return <ErrorState message="Nenhum conteúdo disponível no momento." />;
  }
  const releaseYear = new Date(show.first_air_date).getFullYear();
  const seasons = show.number_of_seasons;
  const duration = `${seasons} ${seasons === 1 ? "temporada" : "temporadas"}`;

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <MediaHero
        title={show.name}
        backdropPath={show.backdrop_path}
        trailerKey={trailer?.key}
      />

      <MediaInfo
        title={show.name}
        releaseYear={releaseYear}
        rating={show.vote_average}
        duration={duration}
        ageRating="13"
        genres={show.genres}
        overview={show.overview}
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
