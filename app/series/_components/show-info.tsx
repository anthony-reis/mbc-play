import { TMDBShowDetails } from "@/types/tmdb/show-details";

interface ShowInfoProps {
  show: TMDBShowDetails;
}

export function ShowInfo({ show }: ShowInfoProps) {
  return (
    <div className="px-6 md:px-10 py-12 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Gêneros</h2>
        <div className="flex flex-wrap gap-2">
          {show.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-4 py-2 bg-zinc-800 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-zinc-400 text-sm mb-2">Status</h3>
          <p className="text-lg">{show.status}</p>
        </div>

        <div>
          <h3 className="text-zinc-400 text-sm mb-2">Episódios</h3>
          <p className="text-lg">{show.number_of_episodes} episódios</p>
        </div>

        {show.networks.length > 0 && (
          <div>
            <h3 className="text-zinc-400 text-sm mb-2">Rede</h3>
            <p className="text-lg">{show.networks[0].name}</p>
          </div>
        )}

        {show.created_by.length > 0 && (
          <div>
            <h3 className="text-zinc-400 text-sm mb-2">Criado por</h3>
            <p className="text-lg">{show.created_by[0].name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
