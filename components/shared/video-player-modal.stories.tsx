import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayerModal } from "./video-player-modal";

const meta = {
  title: "Components/VideoPlayerModal",
  component: VideoPlayerModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    videoKey: {
      control: "text",
      description: "ID do vídeo do YouTube",
    },
    title: {
      control: "text",
      description: "Título do vídeo",
    },
    isOpen: {
      control: "boolean",
      description: "Estado de abertura do modal",
    },
  },
} satisfies Meta<typeof VideoPlayerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videoKey: "dQw4w9WgXcQ",
    title: "Trailer exemplo",
    isOpen: true,
    onClose: () => console.log("Modal fechado"),
  },
};
