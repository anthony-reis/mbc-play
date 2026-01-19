import { memo, useMemo } from "react";
import { ExploreHero } from "./explore-hero";
import { ExploreSections } from "./explore-sections";
import { TMDBMovie, TMDBShow } from "@/types/tmdb/tmdb";
import { shuffleArray } from "@/lib/tmdb/utils/shuffle-array";

interface ExploreContentProps {
  trendingMovies: TMDBMovie[];
  trendingShows?: TMDBShow[];
  upcomingMovies?: TMDBMovie[];
  popularShows?: TMDBShow[];
  topRatedMovies?: TMDBMovie[];
  loadingTrendingShows: boolean;
  loadingUpcoming: boolean;
  loadingPopular: boolean;
  loadingTopRated: boolean;
}

const ExploreContentComponent = ({
  trendingMovies,
  trendingShows,
  upcomingMovies,
  popularShows,
  topRatedMovies,
  loadingTrendingShows,
  loadingUpcoming,
  loadingPopular,
  loadingTopRated,
}: ExploreContentProps) => {
  const exploreHeroMovies = useMemo(() => {
    const combined = [...trendingMovies, ...(upcomingMovies || [])];
    const uniqueMovies = Array.from(
      new Map(combined.map((movie) => [movie.id, movie])).values(),
    );
    return shuffleArray(uniqueMovies);
  }, [trendingMovies, upcomingMovies]);

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <ExploreHero movies={exploreHeroMovies} />

      <ExploreSections
        trendingMovies={trendingMovies}
        trendingShows={trendingShows}
        upcomingMovies={upcomingMovies}
        popularShows={popularShows}
        topRatedMovies={topRatedMovies}
        loadingTrendingShows={loadingTrendingShows}
        loadingUpcoming={loadingUpcoming}
        loadingPopular={loadingPopular}
        loadingTopRated={loadingTopRated}
      />
    </div>
  );
};

ExploreContentComponent.displayName = "ExploreContent";

export const ExploreContent = memo(ExploreContentComponent);
