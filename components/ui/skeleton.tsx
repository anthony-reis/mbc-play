import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-zinc-800/50",
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-linear-to-r",
        "before:from-transparent before:via-zinc-700/20 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
