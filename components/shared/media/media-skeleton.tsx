import { Skeleton } from "@/components/ui/skeleton";

export function MediaHeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] bg-gradient-to-b from-zinc-900 to-dark">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <Skeleton className="h-12 md:h-16 w-3/4 mb-4" />
        <Skeleton className="h-6 w-48" />
      </div>
    </div>
  );
}

export function MediaInfoSkeleton() {
  return (
    <div className="px-6 md:px-10 py-8">
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      <div className="space-y-2 max-w-4xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function MediaCreditsSkeleton() {
  return (
    <div className="px-6 md:px-10 py-12">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
