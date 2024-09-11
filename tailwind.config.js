/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}" // Includi i file SCSS nella ricerca delle classi
  ],
  theme: {

  },

  plugins: [
    require('daisyui'),],
  daisyui: {
    themes: ["dark", "light"]
  },
};