"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  useShowDetails,
  useShowCredits,
  useShowVideos,
} from "@/lib/tmdb/hooks/use-show-details";
import { ShowHero } from "../_components/show-hero";
import { ShowInfo } from "../_components/show-info";
import { ShowCreditsSection } from "../_components/show-credits";

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
    ) || videos?.results.find((video) => video.type === "Trailer");

  if (loadingShow) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-12 h-12 animate-spin" />
          <span className="text-xl">Carregando série...</span>
        </div>
      </div>
    );
  }

  if (!show) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <ShowHero show={show} trailerKey={trailer?.key} />

      <ShowInfo show={show} />

      {loadingCredits ? (
        <div className="px-6 md:px-10 py-12 text-center text-zinc-500">
          Carregando informações...
        </div>
      ) : (
        credits && <ShowCreditsSection credits={credits} />
      )}
    </div>
  );
}
