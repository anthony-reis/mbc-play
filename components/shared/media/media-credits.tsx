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
    <div className="px-6 md:px-10 py-6 space-y-7 border-t border-zinc-600">
      {director && (
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{directorLabel}</h3>
          <p className="text-gray-300 text-lg">{director.name}</p>
        </div>
      )}

      {producers.length > 0 && (
        <div>
          <h3 className="text-white text-xl font-bold mb-2">
            {producersLabel}
          </h3>
          <p className="text-gray-300 text-lg">
            {producers.map((p) => p.name).join(", ")}
          </p>
        </div>
      )}

      {mainCast.length > 0 && (
        <div>
          <h3 className="text-white text-2xl font-bold mb-6">{castLabel}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
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
                  <div className="relative w-32 h-32 mb-3">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-red-600/20 to-purple-600/20 blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />

                    <div className="relative w-full h-full">
                      {profileUrl ? (
                        <>
                          <Image
                            src={profileUrl}
                            alt={member.name}
                            fill
                            className="rounded-full object-cover border-4 border-zinc-800 group-hover:border-red-600 transition-all duration-300 group-hover:scale-105"
                            sizes="128px"
                          />
                          <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full rounded-full bg-linear-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-all duration-300">
                          <User className="w-12 h-12 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                        </div>
                      )}
                    </div>

                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-zinc-900 flex items-center justify-center shadow-lg">
                        <Star className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {member.name}
                  </p>

                  <p className="text-zinc-400 text-xs leading-tight line-clamp-2">
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
