/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c586a5",
      },
    },
    fontFamily: {
      inter: "Inter",
      prata: "Prata",
    },
  },
  plugins: [],
};
