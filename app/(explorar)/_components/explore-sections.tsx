import { memo } from "react";
import { MediaSection } from "@/components/shared/media";
import { MediaSectionSkeleton } from "@/components/shared/media/media-section-skeleton";
import { moviesToMedia, showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { TMDBMovie, TMDBShow } from "@/types/tmdb/tmdb";

interface ExploreSectionsProps {
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

const ExploreSectionsComponent = ({
  trendingMovies,
  trendingShows,
  upcomingMovies,
  popularShows,
  topRatedMovies,
  loadingTrendingShows,
  loadingUpcoming,
  loadingPopular,
  loadingTopRated,
}: ExploreSectionsProps) => {
  return (
    <div className="pl-6 md:pl-10 space-y-12">
      <MediaSection title="Em alta" items={moviesToMedia(trendingMovies)} />

      {loadingTrendingShows ? (
        <MediaSectionSkeleton />
      ) : (
        trendingShows && (
          <MediaSection
            title="Séries em alta"
            items={showsToMedia(trendingShows)}
          />
        )
      )}

      {loadingUpcoming ? (
        <MediaSectionSkeleton />
      ) : (
        upcomingMovies && (
          <MediaSection
            title="Em breve"
            items={moviesToMedia(upcomingMovies)}
          />
        )
      )}

      {loadingPopular ? (
        <MediaSectionSkeleton />
      ) : (
        popularShows && (
          <MediaSection title="Populares" items={showsToMedia(popularShows)} />
        )
      )}

      {loadingTopRated ? (
        <MediaSectionSkeleton />
      ) : (
        topRatedMovies && (
          <MediaSection
            title="Aclamados"
            items={moviesToMedia(topRatedMovies)}
          />
        )
      )}
    </div>
  );
};

ExploreSectionsComponent.displayName = "ExploreSections";

export const ExploreSections = memo(ExploreSectionsComponent);
