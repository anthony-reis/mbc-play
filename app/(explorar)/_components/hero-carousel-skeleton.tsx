import { Skeleton } from "@/components/ui/skeleton";

export function HeroCarouselSkeleton() {
  return (
    <div className="w-full px-6 md:px-10">
      <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800">
        <Skeleton className="absolute inset-0 bg-zinc-800/30" />

        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 z-10">
          <Skeleton className="h-8 md:h-12 w-3/4 mb-3 bg-zinc-800/50" />

          <Skeleton className="h-4 w-full max-w-lg mb-2 bg-zinc-800/50" />
          <Skeleton className="h-4 w-2/3 max-w-lg mb-4 bg-zinc-800/50" />

          <div className="flex gap-3">
            <Skeleton className="h-11 w-32 rounded-xl bg-zinc-800/50" />
            <Skeleton className="h-11 w-32 rounded-xl bg-zinc-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
