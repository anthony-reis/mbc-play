"use client";

import { memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MediaCard } from "./media-card";
import { MediaItem } from "@/types/media/media";

interface MediaSectionProps {
  title?: string;
  items: MediaItem[];
}

const MediaSectionComponent = ({ title, items }: MediaSectionProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {title}
        </h2>
      )}

      <div ref={emblaRef} className="overflow-hidden pb-4">
        <div className="flex gap-4">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
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
