import { memo } from "react";
import { ExploreHero } from "./explore-hero";
import { ExploreSections } from "./explore-sections";
import { TMDBMovie, TMDBShow } from "@/types/tmdb/tmdb";

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
  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <ExploreHero movies={trendingMovies} />

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
