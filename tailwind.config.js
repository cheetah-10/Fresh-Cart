/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "index.html"
  ],
  theme: {
    extend: {
      colors: {
        lightBeige: '#FFF4EA',
        darkPink: '#DE8888',
        softRed: '#C96868',
        darkRed: '#A14646',
      },
    },
  },
  plugins: [],
}

