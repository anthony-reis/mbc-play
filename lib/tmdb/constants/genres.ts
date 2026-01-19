export const MOVIE_GENRE_MAP: Record<string, number> = {
  Action: 28,
  Horror: 27,
  Adventure: 12,
  Animation: 16,
  Crime: 80,
  Cartoon: 16,
  War: 10752,
  Sport: 99,
  "Sci-Fi": 878,
  Comedy: 35,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  Thriller: 53,
  Western: 37,
};

export const TV_GENRE_MAP: Record<string, number> = {
  Action: 10759,
  Horror: 10765,
  Adventure: 10759,
  Animation: 16,
  Crime: 80,
  Cartoon: 16,
  War: 10768,
  Sport: 10764,
  "Sci-Fi": 10765,
  Comedy: 35,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 10765,
  Mystery: 9648,
  Western: 37,
  Kids: 10762,
  News: 10763,
  Reality: 10764,
  Soap: 10766,
  Talk: 10767,
};

export const GENRE_TRANSLATIONS: Record<string, string> = {
  Action: "Ação",
  Horror: "Terror",
  Adventure: "Aventura",
  Animation: "Animação",
  Crime: "Crime",
  Cartoon: "Desenho",
  War: "Guerra",
  Sport: "Esporte",
  "Sci-Fi": "Ficção Científica",
  Comedy: "Comédia",
  Documentary: "Documentário",
  Drama: "Drama",
  Family: "Família",
  Fantasy: "Fantasia",
  History: "História",
  Music: "Musical",
  Mystery: "Mistério",
  Romance: "Romance",
  Thriller: "Suspense",
  Western: "Faroeste",
  Kids: "Infantil",
  News: "Notícias",
  Reality: "Reality Show",
  Soap: "Novela",
  Talk: "Talk Show",
};

export const CATEGORIES = [
  "Action",
  "Horror",
  "Adventure",
  "Animation",
  "Crime",
  "Cartoon",
  "War",
  "Sport",
  "Romance",
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export function getMovieGenreId(genre: string): number | undefined {
  if (genre in MOVIE_GENRE_MAP) {
    return MOVIE_GENRE_MAP[genre];
  }

  const normalized =
    genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  return MOVIE_GENRE_MAP[normalized];
}

export function getTvGenreId(genre: string): number | undefined {
  if (genre in TV_GENRE_MAP) {
    return TV_GENRE_MAP[genre];
  }

  const normalized =
    genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  return TV_GENRE_MAP[normalized];
}

export function isValidGenre(genre: string): boolean {
  return !!getMovieGenreId(genre) || !!getTvGenreId(genre);
}

export function translateGenre(genre: string): string {
  return GENRE_TRANSLATIONS[genre] || genre;
}

export function getGenreDisplayName(genre: string): string {
  const normalized =
    genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();

  return translateGenre(normalized);
}
