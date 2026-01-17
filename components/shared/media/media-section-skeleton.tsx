import { Skeleton } from "@/components/ui/skeleton";
import { MediaCardSkeleton } from "./media-card-skeleton";

interface MediaSectionSkeletonProps {
  count?: number;
}

export function MediaSectionSkeleton({ count = 8 }: MediaSectionSkeletonProps) {
  return (
    <section className="space-y-4">
      <Skeleton className="h-8 w-48 bg-zinc-800/50" />

      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
        {Array.from({ length: count }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
