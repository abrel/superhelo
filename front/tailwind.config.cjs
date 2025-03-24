/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['system-ui'],
      },
      gridTemplateColumns: {
        menu: '200px 1fr 250px',
      },
    },
  },
  plugins: [],
};
