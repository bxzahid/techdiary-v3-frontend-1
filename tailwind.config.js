module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#58D4E1',
        secondary: '#FDF9F3',
        paste: {
          100: '#def6f9',
          200: '#bceef3',
          300: '#9be5ed',
          400: '#79dde7',
          500: '#58d4e1',
          600: '#46aab4',
          700: '#357f87',
          800: '#23555a',
          900: '#122a2d',
        },
      },
      fontFamily: {
        techdiary: ['Nunito', 'Kohinoor Bangla'],
        mono: ['Space Mono', 'monospace'],
      },
      zIndex: {
        '-1': '-1',
      }
    },
  },
  variants: {},
}
