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
      backgroundImage: () => ({
        'degrade': 'linear-gradient(180deg, var(--color-plum) 42.19%, var(--color-ink) 100%)',
        'banner' : 'url("/background.png")',
      }),
      textColor: () => ({
        'degrade': 'linear-gradient(180deg, var(--color-plum) 42.19%, var(--color-ink) 100%)'
      }),
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)']
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        headline: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        eyebrow: ['clamp(0.6875rem, 1vw, 0.8125rem)', { lineHeight: '1.2', letterSpacing: '0.18em' }]
      },
      screens : {
        'xs' : '390px'
      },
      colors: {
        ivory: 'var(--color-ivory)',
        plum: 'var(--color-plum)',
        champagne: 'var(--color-champagne)',
        ink: 'var(--color-ink)',
        primary: 'var(--color-plum)',
        secondary: 'var(--color-ink)'
      }
    },
  },
  plugins: [],
}
