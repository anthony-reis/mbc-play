import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "black",
      values: [
        { name: "black", value: "#000000" },
        { name: "dark", value: "#0a0a0a" },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-black">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        className="p-8 bg-black"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Story />
      </div>
    ),
  ],
};
