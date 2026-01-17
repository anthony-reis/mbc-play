import { Search } from "lucide-react";
import { MediaSectionSkeleton } from "@/components/shared/media/media-section-skeleton";

interface SearchLoadingStateProps {
  query: string;
}

export function SearchLoadingState({ query }: SearchLoadingStateProps) {
  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <div className="px-6 md:px-10 pt-6 space-y-8">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-zinc-500 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Buscando por "{query}"...
          </h1>
        </div>
        <MediaSectionSkeleton count={6} />
        <MediaSectionSkeleton count={6} />
      </div>
    </div>
  );
}
