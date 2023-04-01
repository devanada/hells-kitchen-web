/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0D1117",
        light: "#f7f9f9",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
