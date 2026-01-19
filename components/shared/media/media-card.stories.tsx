import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./media-card";
import { MediaItem } from "@/types/media/media";

const mockMovie: MediaItem = {
  id: 550,
  title: "Clube da Luta",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  vote_average: 8.4,
  mediaType: "movie",
  overview:
    "Um funcionário de escritório insone forma um clube de luta clandestino.",
  releaseYear: "1999",
  backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
};

const mockSeries: MediaItem = {
  id: 1396,
  title: "Breaking Bad",
  poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  vote_average: 9.5,
  mediaType: "tv",
  overview: "Um professor de química se torna produtor de metanfetamina.",
  releaseYear: "2008",
  backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
};

const mockHighRating: MediaItem = {
  id: 278,
  title: "Um Sonho de Liberdade",
  poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  vote_average: 9.3,
  mediaType: "movie",
  overview: "Dois homens presos se unem ao longo de vários anos.",
  releaseYear: "1994",
  backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
};

const mockLowRating: MediaItem = {
  id: 12345,
  title: "Filme de Baixa Avaliação",
  poster_path: "/invalid-path.jpg",
  vote_average: 4.2,
  mediaType: "movie",
  overview: "Um filme com baixa avaliação.",
  releaseYear: "2020",
  backdrop_path: "/example-backdrop.jpg",
};

const mockNoPoster: MediaItem = {
  id: 99999,
  title: "Filme Sem Poster Disponível - Título Muito Longo Para Testar",
  poster_path: "",
  vote_average: 7.0,
  mediaType: "movie",
  overview: "Um filme sem poster.",
  releaseYear: "2021",
  backdrop_path: "",
};

const meta = {
  title: "Components/MediaCard",
  component: MediaCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#18181b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    item: {
      description: "Objeto com dados do filme ou série do TMDB",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalList: Story = {
  args: {
    item: mockMovie,
  },
  render: () => (
    <div className="max-w-6xl overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-4">Filmes em Alta</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        <MediaCard item={mockMovie} />
        <MediaCard item={mockSeries} />
        <MediaCard item={mockHighRating} />
        <MediaCard item={mockLowRating} />
        <MediaCard item={mockNoPoster} />
        <MediaCard item={{ ...mockMovie, id: 501 }} />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Cards organizados em lista horizontal com scroll, como aparecem na aplicação real",
      },
    },
  },
};
