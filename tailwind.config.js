/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,css}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        black: "#212121",
        white: "#fafafa",
      },
    },
  },
  plugins: [],
};
