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
        surface: {
          DEFAULT: "#0B1220",
          elevated: "#111827",
          card: "#151F32",
          "card-hover": "#1A2740",
          border: "#243044",
          "border-light": "#2D3B52",
          hover: "#1E2D45",
          muted: "#64748B",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        danger: { DEFAULT: "#EF4444", muted: "#FCA5A5" },
        warning: { DEFAULT: "#F59E0B", muted: "#FCD34D" },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25)",
        glow: "0 0 40px rgba(16, 185, 129, 0.08)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(36,48,68,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(36,48,68,0.4) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
