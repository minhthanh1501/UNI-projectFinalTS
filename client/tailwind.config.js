/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      backgroundColor: {
        primary: "#141414",
        secondary: "#0D0D0D",
      },
      colors: {
        primary: "#141414",
        secondary: "#0D0D0D",
      },
    },
  },
  plugins: [],
};
