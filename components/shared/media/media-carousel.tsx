"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MediaCard } from "./media-card";
import { MediaItem } from "@/types/media/media";

interface MediaCarouselProps {
  items: MediaItem[];
}

export function MediaCarousel({ items }: MediaCarouselProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="relative">
      {" "}
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={`${item.mediaType}-${item.id}`}
              className="pl-4 basis-auto"
            >
              <MediaCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 border-white/10" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 border-white/10" />
        </div>
      </Carousel>
    </div>
  );
}
