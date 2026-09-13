/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0a0c",
        cardBg: "#121218",
        accentNeon: "#38bdf8",
      },
    },
  },
  plugins: [],
}