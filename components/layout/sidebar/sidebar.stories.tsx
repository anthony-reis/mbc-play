import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./sidebar";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDecorator = (pathname: string, title: string) => [
  (Story: any) => (
    <div
      className="h-screen w-screen relative bg-dark"
      onClick={(e) => {
        const link = (e.target as HTMLElement).closest("a");
        if (link) {
          e.preventDefault();
        }
      }}
    >
      <Story />
      <main className="lg:ml-65 p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-zinc-400 mb-4">
          Item selecionado:{" "}
          <span className="text-white font-semibold">{title}</span>
        </p>
        <div className="space-y-4 max-w-2xl">
          <div className="h-32 bg-zinc-800 rounded-lg"></div>
          <div className="h-32 bg-zinc-800 rounded-lg"></div>
          <div className="h-32 bg-zinc-800 rounded-lg"></div>
        </div>
      </main>
    </div>
  ),
];

export const Home: Story = {
  decorators: DefaultDecorator("/", "Home"),
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const Movies: Story = {
  decorators: DefaultDecorator("/filmes", "Filmes"),
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/filmes",
      },
    },
  },
};

export const Series: Story = {
  decorators: DefaultDecorator("/series", "Séries"),
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/series",
      },
    },
  },
};
