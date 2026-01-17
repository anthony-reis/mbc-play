import { getImageUrl } from "@/lib/tmdb/client";
import { TMDBShowCredits } from "@/types/tmdb/show-details";
import { User } from "lucide-react";

interface ShowCreditsSectionProps {
  credits: TMDBShowCredits;
}

export function ShowCreditsSection({ credits }: ShowCreditsSectionProps) {
  const cast = credits.cast.slice(0, 12);

  return (
    <div className="px-6 md:px-10 py-12">
      <h2 className="text-2xl font-bold mb-6">Elenco Principal</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {cast.map((actor) => {
          const profileUrl = getImageUrl.profile(actor.profile_path, "w185");

          return (
            <div key={actor.id} className="space-y-2">
              <div className="aspect-[2/3] bg-zinc-800 rounded-lg overflow-hidden">
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-zinc-600" />
                  </div>
                )}
              </div>

              <div>
                <p className="font-semibold text-sm">{actor.name}</p>
                <p className="text-xs text-zinc-400">{actor.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
