import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#18181b" },
        { name: "light", value: "#ffffff" },
      ],
    },
    viewport: {
      viewports: {
        mobile1: {
          name: "Small Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        mobile2: {
          name: "Large Mobile",
          styles: {
            width: "414px",
            height: "896px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1280px",
            height: "800px",
          },
        },
      },
    },
  },
};

export default preview;
