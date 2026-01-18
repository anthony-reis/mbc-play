"use client";

import { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MediaCard } from "./media-card";
import { MediaItem } from "@/types/media/media";

interface MediaCarouselProps {
  items: MediaItem[];
}

const MediaCarouselComponent = ({ items }: MediaCarouselProps) => {
  if (!items || items.length === 0) return null;

  return (
    <Carousel
      className="w-full pl-10"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-3 md:-ml-6 lg:-ml-[54px]">
        {items.map((item) => (
          <CarouselItem
            key={`${item.mediaType}-${item.id}`}
            className="pl-3 md:pl-6 lg:pl-[54px] basis-[180px] md:basis-[220px]"
          >
            <MediaCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

MediaCarouselComponent.displayName = "MediaCarousel";

export const MediaCarousel = memo(
  MediaCarouselComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.items.length === nextProps.items.length &&
      prevProps.items[0]?.id === nextProps.items[0]?.id
    );
  },
);
