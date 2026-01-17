// components/movie/movie-credits.tsx
"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb/client";
import { MovieCredits } from "@/types/tmdb/movie-details";

interface MovieCreditsProps {
  credits: MovieCredits;
}

export function MovieCreditsSection({ credits }: MovieCreditsProps) {
  const director = credits.crew.find((person) => person.job === "Director");
  const producers = credits.crew
    .filter((person) => person.job === "Producer")
    .slice(0, 2);
  const cast = credits.cast.slice(0, 10);

  return (
    <div className="px-6 md:px-10 space-y-8">
      {/* Diretor */}
      {director && (
        <div>
          <h3 className="text-white text-xl font-bold mb-3">Director</h3>
          <p className="text-gray-300 text-lg">{director.name}</p>
        </div>
      )}

      {/* Produtores */}
      {producers.length > 0 && (
        <div>
          <h3 className="text-white text-xl font-bold mb-3">Produtores</h3>
          <p className="text-gray-300 text-lg">
            {producers.map((p) => p.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
