/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
      colors: {
        cream: "#FAF9F6",
        ink: "#1A1A2E",
        accent: "#E8572A",
        muted: "#9CA3AF",
        surface: "#F3F2EF",
        border: "#E5E3DE",
      },
    },
  },
  plugins: [],
};