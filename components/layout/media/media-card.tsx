"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { Star, Film } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb/client";
import { MediaItem } from "@/types/media/media";
import Link from "next/link";

interface MediaCardProps {
  item: MediaItem;
}

const MediaCardComponent = ({ item }: MediaCardProps) => {
  const [imageError, setImageError] = useState(false);
  const posterUrl = getImageUrl.poster(item.poster_path);

  if (!posterUrl) return null;

  return (
    <Link
      href={`/movie/${item.id}`}
      className="relative min-w-[180px] w-[180px] md:min-w-[220px] md:w-[220px] snap-start"
    >
      <div className="group cursor-pointer isolate">
        <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden mb-3 bg-zinc-800 shadow-lg ring-1 ring-white/5 transition-all duration-500 ease-out group-hover:scale-105 group-hover:ring-white/20 group-hover:shadow-2xl">
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
              <Film className="w-16 h-16 text-zinc-600 mb-3" />
              <p className="text-xs text-zinc-500 text-center px-4 font-medium line-clamp-2">
                {item.title}
              </p>
            </div>
          ) : (
            <Image
              src={posterUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 180px, 220px"
              onError={() => setImageError(true)}
              loading="lazy"
              quality={80}
            />
          )}

          <div className="absolute top-0 right-0 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md shadow-sm z-10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-white">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

MediaCardComponent.displayName = "MediaCard";

export const MediaCard = memo(MediaCardComponent, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});
