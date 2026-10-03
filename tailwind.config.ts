import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#faf9f5",
          100: "#f5f3ec",
          200: "#eae6dc",
          300: "#ded8ca",
          muted: "#f0ece1",
        },
        ink: {
          primary: "#1c1917",
          secondary: "#44403c",
          muted: "#78716c",
          faint: "#a8a29e",
        },
        accent: {
          terracotta: "#c2410c",
          olive: "#4d7c0f",
          warmamber: "#b45309",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
