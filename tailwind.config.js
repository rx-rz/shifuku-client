/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        general_sans: ["General Sans", "sans-serif"],
        boska: ["Boska", "sans-serif"],
      },
      colors: {
        secondary: "#4527D6",
      },
    },
  },
  plugins: [],
};
