import { memo } from "react";
import { HeroCarousel } from "./hero-carousel";
import { TMDBMovie } from "@/types/tmdb/tmdb";

interface ExploreHeroProps {
  movies: TMDBMovie[];
}

const ExploreHeroComponent = ({ movies }: ExploreHeroProps) => {
  return (
    <div className="mb-12">
      <HeroCarousel movies={movies} />
    </div>
  );
};

ExploreHeroComponent.displayName = "ExploreHero";

export const ExploreHero = memo(ExploreHeroComponent);
