import { QueryClient, dehydrate } from "@tanstack/react-query";
import { movieKeys } from "./keys";
import { movieService } from "@/services/movie-service";

export async function prefetchHomeData() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: movieKeys.trending(),
      queryFn: movieService.getTrending,
    }),
    queryClient.prefetchQuery({
      queryKey: movieKeys.upcoming(),
      queryFn: movieService.getUpcoming,
    }),
    queryClient.prefetchQuery({
      queryKey: movieKeys.topRated(),
      queryFn: movieService.getTopRated,
    }),
    queryClient.prefetchQuery({
      queryKey: movieKeys.action(),
      queryFn: movieService.getAction,
    }),
  ]);

  return dehydrate(queryClient);
}
