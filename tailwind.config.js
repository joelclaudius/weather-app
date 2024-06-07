// /** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display"], // Add 'display' family
        sans: ["Inter"],
      },
      colors: {
        color1: "#616161",
      },
    },
  },
  plugins: [],
};
