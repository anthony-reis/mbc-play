export const movieKeys = {
  all: ["movies"] as const,
  trending: () => [...movieKeys.all, "trending"] as const,
  upcoming: () => [...movieKeys.all, "upcoming"] as const,
  topRated: () => [...movieKeys.all, "top-rated"] as const,
  action: () => [...movieKeys.all, "action"] as const,
  byGenre: (genreId: number) => [...movieKeys.all, "genre", genreId] as const,
  byGenreName: (genreName: string) =>
    [...movieKeys.all, "genre-name", genreName] as const,
};

export const showKeys = {
  all: ["shows"] as const,
  trending: () => [...showKeys.all, "trending"] as const,
  popular: () => [...showKeys.all, "popular"] as const,
  topRated: () => [...showKeys.all, "top-rated"] as const,
  airingToday: () => [...showKeys.all, "airing-today"] as const,
  drama: () => [...showKeys.all, "drama"] as const,
  byGenre: (genreId: number) => [...showKeys.all, "genre", genreId] as const,
  byGenreName: (genreName: string) =>
    [...showKeys.all, "genre-name", genreName] as const,
  details: (showId: string) => [...showKeys.all, "details", showId] as const,
  credits: (showId: string) => [...showKeys.all, "credits", showId] as const,
  videos: (showId: string) => [...showKeys.all, "videos", showId] as const,
};

export const genreKeys = {
  all: ["genres"] as const,
  movies: (genreName: string) =>
    [...genreKeys.all, "movies", genreName] as const,
  shows: (genreName: string) => [...genreKeys.all, "shows", genreName] as const,
  media: (genreName: string) => [...genreKeys.all, "media", genreName] as const,
};

export const searchKeys = {
  all: ["search"] as const,
  query: (query: string) => [...searchKeys.all, query] as const,
  movies: (query: string) => [...searchKeys.all, "movies", query] as const,
  shows: (query: string) => [...searchKeys.all, "shows", query] as const,
};
