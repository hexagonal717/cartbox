/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        springgreen: {
          50: '#e6fef0',
          100: '#b3f5d2',
          200: '#80ebb5',
          300: '#4ae298',
          400: '#1ddf7d',
          500: '#00ff7f',
          600: '#00e773',
          700: '#00c66b',
          800: '#00a763',
          900: '#008c55',
        },
      },
      fontFamily: {
        inter: ["Inter Variable, sans-serif"],
      },
    },
  },
  plugins: [],
}

