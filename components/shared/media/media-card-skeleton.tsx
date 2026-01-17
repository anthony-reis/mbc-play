import { Skeleton } from "@/components/ui/skeleton";

export function MediaCardSkeleton() {
  return (
    <div className="relative min-w-[180px] w-[180px] md:min-w-[220px] md:w-[220px] snap-start">
      <div className="isolate">
        <Skeleton className="aspect-[2/3] w-full rounded-xl mb-3 bg-zinc-800/50" />
      </div>
    </div>
  );
}
