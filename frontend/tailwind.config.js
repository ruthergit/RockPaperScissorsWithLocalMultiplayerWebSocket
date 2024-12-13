/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        OilBlack: "#0C0C0C",
      },
      boxShadow: {
        right: '400px 0 25px -0px rgba(0, 0, 0, 0.2), 200px 0 25px -0px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}