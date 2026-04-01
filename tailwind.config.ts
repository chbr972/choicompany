import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        // Cyan accent — use sparingly for CTAs, links, highlights
        brand: {
          50: "#e0faff",
          100: "#b3f3ff",
          200: "#80ebff",
          300: "#4de0ff",
          400: "#26d9ff",
          500: "#00D4FF",
          600: "#00AACE",
          700: "#007FA0",
          800: "#005A75",
          900: "#003A4D",
        },
        // Warm amber — verdicts, callouts
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        // Dark surface backgrounds
        surface: {
          950: "#07090E",
          900: "#0D1117",
          800: "#161B26",
          750: "#1A2030",
          700: "#1F2A3C",
          600: "#263347",
          500: "#2E3D53",
          400: "#3C4E66",
        },
        // Text scale — 50 (brightest on dark) → 900 (darkest)
        ink: {
          50: "#F0F6FF",
          100: "#DDE6F5",
          200: "#BECFE8",
          300: "#96B0D5",
          400: "#6E8FBD",
          500: "#4E71A0",
          600: "#375685",
          700: "#263E6B",
          800: "#172A53",
          900: "#0C1A3A",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#DDE6F5",
            lineHeight: "1.85",
          },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.2)",
        "card-hover": "0 8px 30px -5px rgba(0,0,0,0.5), 0 4px 12px -5px rgba(0,0,0,0.35)",
        "card-lg": "0 4px 20px -2px rgba(0,0,0,0.4), 0 2px 8px -2px rgba(0,0,0,0.25)",
        "glow-cyan": "0 0 20px rgba(0,212,255,0.15), 0 0 40px rgba(0,212,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
