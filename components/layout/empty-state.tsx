import Link from "next/link";
import { Search, Film, Tv } from "lucide-react";

interface EmptyStateProps {
  query: string;
  type: "movie" | "show" | "dual";
}

export function EmptyState({ query, type }: EmptyStateProps) {
  if (type === "dual") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="relative mb-6">
          <div className="flex gap-4">
            <Film className="w-16 h-16 text-zinc-700" />
            <Tv className="w-16 h-16 text-zinc-700" />
          </div>
          <Search className="w-10 h-10 text-zinc-600 absolute -bottom-2 left-1/2 -translate-x-1/2" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Nenhum resultado encontrado
        </h2>

        <p className="text-zinc-400 text-lg mb-2 max-w-md">
          Não encontramos filmes ou séries com "{query}"
        </p>

        <p className="text-zinc-500 text-sm mt-4">
          Dica: Tente buscar com palavras diferentes ou verifique a ortografia
        </p>
      </div>
    );
  }

  // Modo single (apenas filme ou série)
  const isMovie = type === "movie";
  const Icon = isMovie ? Film : Tv;
  const contentType = isMovie ? "filme" : "série";
  const contentTypePlural = isMovie ? "filmes" : "séries";
  const alternativeType = isMovie ? "série" : "filme";
  const alternativeTypePlural = isMovie ? "séries" : "filmes";
  const alternativeLink = isMovie ? "/series" : "/filmes";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-6">
        <Icon className="w-20 h-20 text-zinc-700" />
        <Search className="w-8 h-8 text-zinc-600 absolute -bottom-1 -right-1" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">
        Nenhum {contentType} encontrado
      </h2>

      <p className="text-zinc-400 text-lg mb-6 max-w-md">
        Não encontramos nenhum {contentType} com "{query}"
      </p>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 max-w-md">
        <p className="text-zinc-300 mb-4">
          Procurando por {alternativeType === "filme" ? "um" : "uma"}{" "}
          {alternativeType}?
        </p>
        <Link
          href={alternativeLink}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Search className="w-5 h-5" />
          Buscar em{" "}
          {alternativeTypePlural.charAt(0).toUpperCase() +
            alternativeTypePlural.slice(1)}
        </Link>
      </div>

      <p className="text-zinc-500 text-sm mt-8">
        Dica: Tente buscar com palavras diferentes ou verifique a ortografia
      </p>
    </div>
  );
}
