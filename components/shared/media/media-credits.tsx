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
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6">
            {castLabel}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {mainCast.map((member, index) => {
              const profileUrl = getImageUrl.profile(
                member.profile_path,
                "w185",
              );

              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-2 sm:mb-2.5 md:mb-3">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-red-600/20 to-purple-600/20 blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />

                    <div className="relative w-full h-full">
                      {profileUrl ? (
                        <>
                          <Image
                            src={profileUrl}
                            alt={member.name}
                            fill
                            className="rounded-full object-cover border-2 sm:border-3 md:border-4 border-zinc-800 group-hover:border-red-600 transition-all duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                          />
                          <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full rounded-full bg-linear-to-br from-zinc-800 to-zinc-900 border-2 sm:border-3 md:border-4 border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-all duration-300">
                          <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                        </div>
                      )}
                    </div>

                    {index < 3 && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-zinc-900 flex items-center justify-center shadow-lg">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-white font-semibold text-xs sm:text-sm leading-tight mb-0.5 sm:mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {member.name}
                  </p>

                  <p className="text-zinc-400 text-[10px] sm:text-xs leading-tight line-clamp-2">
                    {member.character}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
