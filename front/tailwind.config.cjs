/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logialOrange: '#f29400',
        logialBlue: '#007bc2',
      },
      fontFamily: {
        main: ['Comfortaa'],
      },
      gridTemplateColumns: {
        menu: '200px 1fr 250px',
      },
    },
  },
  plugins: [],
};
