/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
      center: true,
    },
    extend: {
      fontFamily: {
        knewave: ['Knewave', 'serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        'soft-black': '#1a1a1a',
        'soft-white': '#f5f5f5',
        neon: {
          pink: '#FF6EC7',
          green: '#39FF14',
          blue: '#1B03A3',
          yellow: '#FFFF33',
          orange: '#FF5F1F',
        }
      },
    },
  },
  plugins: [],
};
