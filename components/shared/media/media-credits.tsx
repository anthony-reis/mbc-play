"use client";

import Image from "next/image";
import { User, Star } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb/client";
import { MediaCreditsProps } from "@/types/media/media";

export function MediaCreditsSection({
  cast,
  crew,
  directorLabel = "Diretor",
  producersLabel = "Produtores",
  castLabel = "Elenco Principal",
}: MediaCreditsProps) {
  const director = crew.find((person) => person.job === "Director");
  const producers = crew
    .filter((person) => person.job === "Producer")
    .slice(0, 2);
  const mainCast = cast.slice(0, 10);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-7 border-t border-zinc-600">
      {director && (
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">
            {directorLabel}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            {director.name}
          </p>
        </div>
      )}

      {producers.length > 0 && (
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">
            {producersLabel}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            {producers.map((p) => p.name).join(", ")}
          </p>
        </div>
      )}

      {mainCast.length > 0 && (
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">
            {castLabel}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            {mainCast.map((member) => member.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
