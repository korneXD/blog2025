const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors
      },
      fontFamily: {
        main: ["poppins","sans-serif"],
        poppins: ["poppins","sans-serif"]
      }
    },
  },
  plugins: [],
}

export default withMT(config)