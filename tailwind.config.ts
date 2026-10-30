import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lead: {
          navy: {
            DEFAULT: "#0b2341",
            dark: "#07172b",
            light: "#12335c",
            card: "#112e52",
          },
          primary: {
            DEFAULT: "#0284c7",
            hover: "#0369a1",
            light: "#e0f2fe",
            subtle: "#f0f9ff",
          },
          accent: {
            cyan: "#06b6d4",
            blue: "#2563eb",
            amber: "#f59e0b",
            emerald: "#10b981",
            rose: "#f43f5e",
            purple: "#8b5cf6",
          },
          bg: "#f1f5f9",
          card: "#ffffff",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

