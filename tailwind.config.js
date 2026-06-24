/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand — Sarah's Kitchen (paleta criolla premium)
        primary: {
          DEFAULT: "#ec3713", // Rojo Criollo
          dark: "#c22b0f",
          light: "#fdebe8",
        },
        accent: {
          green: "#388e3c", // Verde Cilantro (success / freshness)
          yellow: "#f5a623",
        },
        cream: "#fff9f3", // Crema Mangú (fondo claro cálido)
        cafe: {
          DEFAULT: "#221310", // Café oscuro (texto / dark mode)
          light: "#331d19",
        },
        warm: "#8a7a78", // Gris cálido (texto secundario)
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(236, 55, 19, 0.10)",
        hover: "0 20px 40px -10px rgba(236, 55, 19, 0.20)",
        primary: "0 10px 30px -8px rgba(236, 55, 19, 0.30)",
      },
      maxWidth: {
        content: "80rem", // max-w-7xl equivalente
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
