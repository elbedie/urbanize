import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#e6f1ff",
    100: "#c3daf7",
    200: "#9ac3ee",
    300: "#6fa9e4",
    400: "#4d95dc",
    500: "#2b82d4",
    600: "#226bb0",
    700: "#1b568d",
    800: "#134069",
    900: "#0c2c48",
  },
  success: {
    500: "#1f9e64",
  },
  warning: {
    500: "#e8a23a",
  },
  danger: {
    500: "#d64545",
  },
};

const fonts = {
  heading: "Inter, system-ui, -apple-system, sans-serif",
  body: "Inter, system-ui, -apple-system, sans-serif",
};

export const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export type Theme = typeof theme;
