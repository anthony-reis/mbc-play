import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export function useQueryWithSkeleton<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> & { isInitialLoading: boolean } {
  const result = useQuery(options);

  return {
    ...result,
    isInitialLoading: result.isLoading && !result.data,
  };
}
