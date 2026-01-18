import { HeroCarouselSkeleton } from "@/app/(explorar)/_components/hero-carousel-skeleton";
import { MediaSectionSkeleton } from "../shared/media/media-section-skeleton";

interface PageSkeletonProps {
  withHero?: boolean;
  sections?: number;
}

export function PageSkeleton({
  withHero = false,
  sections = 3,
}: PageSkeletonProps) {
  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      {withHero && (
        <div className="mb-12">
          <HeroCarouselSkeleton />
        </div>
      )}

      <div className="px-6 md:px-10 space-y-12">
        {Array.from({ length: sections }).map((_, i) => (
          <MediaSectionSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
