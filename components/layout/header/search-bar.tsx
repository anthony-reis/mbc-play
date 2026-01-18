"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/lib/stores/search-store";
import { useRouter, usePathname } from "next/navigation";

export function SearchBar() {
  const { query, setQuery, clearSearch } = useSearchStore();
  const router = useRouter();
  const pathname = usePathname();

  const isInDetailPage = /^\/(filmes|series)\/\d+$/.test(pathname);

  const handleSearchClick = () => {
    if (isInDetailPage && query.trim().length >= 2) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative w-full max-w-[889px]">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute left-3 md:left-4 lg:left-5 h-4 w-4 md:h-5 md:w-5 text-zinc-500 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <Search className="w-full h-full" />
        </button>

        <Input
          type="text"
          placeholder="Pesquisar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              isInDetailPage &&
              query.trim().length >= 2
            ) {
              router.push(`/?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          className="
            h-10 md:h-12 lg:h-14
            h-small:h-10
            h-xs:h-9
            w-full rounded-[30px] border-none bg-dark-200
            pl-10 md:pl-12 lg:pl-14 
            pr-10 md:pr-12 lg:pr-14
            text-sm md:text-base lg:text-lg
            text-white font-semibold
            placeholder:text-zinc-500 placeholder:font-normal
            focus-visible:ring-1 focus-visible:ring-white/10 focus-visible:ring-offset-0
            transition-all
            shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2)]
          "
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 md:right-4 lg:right-5 h-5 w-5 md:h-6 md:w-6 text-zinc-500 hover:text-white transition-colors z-10"
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>
    </div>
  );
}
