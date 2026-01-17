"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, getGenreDisplayName } from "@/lib/tmdb/constants/genres";

interface CategoryListProps {
  onCategoryClick?: () => void;
}

export function CategoryList({ onCategoryClick }: CategoryListProps) {
  const pathname = usePathname();

  return (
    <div className="mt-14 h-small:mt-6 px-10 h-small:px-8 h-xs:px-6 flex-1 overflow-y-auto scrollbar-hide">
      <h3 className="text-[15px] h-small:text-xs h-xs:text-[10px] font-light text-zinc-500 mb-8 h-small:mb-4 h-xs:mb-2 leading-[0.81] tracking-[0.05em]">
        Categorias
      </h3>

      <ul className="flex flex-col gap-3.5 h-small:gap-2 h-xs:gap-1 pb-4">
        {CATEGORIES.map((category) => {
          const categoryHref = `/genre/${category.toLowerCase()}`;
          const isActive = pathname.startsWith(categoryHref);

          const displayName = getGenreDisplayName(category);

          return (
            <li key={category}>
              <Link
                href={categoryHref}
                onClick={onCategoryClick}
                prefetch={false}
                className={`text-[15px] h-small:text-sm h-xs:text-xs font-bold transition-colors duration-200 block ${
                  isActive ? "text-white" : "text-zinc-600 hover:text-white"
                }`}
              >
                {displayName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
