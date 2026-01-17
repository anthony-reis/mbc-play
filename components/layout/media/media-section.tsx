"use client";

import { memo } from "react";
import { MediaCard } from "./media-card";
import { MediaItem } from "@/types/media/media";

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
}

const MediaSectionComponent = ({ title, items }: MediaSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

MediaSectionComponent.displayName = "MediaSection";

export const MediaSection = memo(
  MediaSectionComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.items.length === nextProps.items.length &&
      prevProps.items[0]?.id === nextProps.items[0]?.id &&
      prevProps.items[prevProps.items.length - 1]?.id ===
        nextProps.items[nextProps.items.length - 1]?.id
    );
  },
);
