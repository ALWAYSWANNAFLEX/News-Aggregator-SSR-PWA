import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#f6f7f9",
        ink: "#171717",
        muted: "#5f6876",
        accent: "#0f766e",
      },
    },
  },
  plugins: [],
};

export default config;
