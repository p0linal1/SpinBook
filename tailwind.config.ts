import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-low": "var(--surface-low)",
        "surface-high": "var(--surface-high)",
        "surface-ink": "var(--surface-ink)",
        "surface-bright": "var(--surface-bright)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "surface-container-highest": "var(--surface-container-highest)",
        
        primary: "var(--primary)",
        "primary-container": "var(--primary-container)",
        "primary-dim": "var(--primary-dim)",
        "on-primary": "var(--on-primary)",
        "on-primary-container": "var(--on-primary-container)",
        
        secondary: "var(--secondary)",
        "secondary-container": "var(--secondary-container)",
        "secondary-dim": "var(--secondary-dim)",
        "on-secondary": "var(--on-secondary)",
        "on-secondary-container": "var(--on-secondary-container)",
        
        tertiary: "var(--tertiary)",
        "tertiary-container": "var(--tertiary-container)",
        "tertiary-dim": "var(--tertiary-dim)",
        "on-tertiary": "var(--on-tertiary)",
        "on-tertiary-container": "var(--on-tertiary-container)",
        
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        muted: "var(--muted)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "on-background": "var(--on-background)",
        
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        error: "var(--error)",
        "error-container": "var(--error-container)",
        "on-error": "var(--on-error)",
        "on-error-container": "var(--on-error-container)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        headline: ["var(--font-display)"],
        body: ["var(--font-body)"],
        label: ["var(--font-display)"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 255, 135, 0.16)",
        panel: "0 20px 60px rgba(0, 0, 0, 0.28)",
        "neon-glow": "0 0 40px rgba(0, 255, 135, 0.3)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(0,255,135,0.12), transparent 30%), radial-gradient(circle at top right, rgba(190,130,255,0.12), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
        "button-glow":
          "linear-gradient(135deg, rgba(164,255,185,1) 0%, rgba(0,253,134,1) 100%)",
        "kinetic-gradient":
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
