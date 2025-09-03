/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'lao-gold': '#FFD700',
        'lao-red': '#CE1126',
        'lao-blue': '#002868',
      },
      fontFamily: {
        'sans': ['Noto Sans Lao', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}