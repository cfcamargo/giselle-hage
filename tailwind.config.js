/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'degrade': 'linear-gradient(180deg, #3E3063 42.19%, #000 100%)',
        'banner' : 'url("/background.png")',
      }),
      textColor: theme => ({
        'degrade': 'linear-gradient(180deg, #3E3063 42.19%, #000 100%)'
      }),
      screens : {
        'xs' : '390px'
      }
    },
  },
  plugins: [],
}

