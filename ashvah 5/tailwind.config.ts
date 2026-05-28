import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // ASHVAH light-theme palette
        bone: "#FAF9F6",
        "off-white": "#F9F9F8",
        graphite: "#111111",
        "graphite-soft": "#1A1A1A",
        silver: "#666666",
        "silver-light": "#8A8A8A",
        hairline: "#E5E5E5",
        "hairline-strong": "#D4D4D4",
        ink: "#0A2540", // accent — refined deep blue
        copper: "#B87333", // alternate accent — used sparingly
        // Semantic aliases for shadcn-style components
        background: "#FAF9F6",
        foreground: "#111111",
        card: "#FFFFFF",
        "card-foreground": "#111111",
        border: "#E5E5E5",
        input: "#E5E5E5",
        muted: "#F1F1EF",
        "muted-foreground": "#666666",
        accent: "#0A2540",
        "accent-foreground": "#FFFFFF",
        destructive: "#B00020",
        "destructive-foreground": "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial type scale
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "500" }],
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "500" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "500" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em", fontWeight: "500" }],
      },
      borderRadius: {
        none: "0",
        sharp: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "6px",
      },
      spacing: {
        "section": "clamp(4rem, 8vw, 8rem)",
        "section-sm": "clamp(3rem, 5vw, 5rem)",
      },
      backgroundImage: {
        "weave-light":
          "repeating-linear-gradient(45deg, rgba(17,17,17,0.012) 0 1px, transparent 1px 8px), repeating-linear-gradient(-45deg, rgba(17,17,17,0.012) 0 1px, transparent 1px 8px)",
        "grid-faint":
          "linear-gradient(rgba(17,17,17,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
