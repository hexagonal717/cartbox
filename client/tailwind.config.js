export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'shadow-glow-dark': {
          '0%, 100%': {
            boxShadow: '0 0 0.3rem #4299e1, 0 0 0.6rem #4299e1',
          },
          '50%': {
            boxShadow: '0 0 0.3rem #ffffe1, 0 0 1.4rem #4299e1',
          },
        },
        'shadow-glow-light': {
          '0%, 100%': {
            boxShadow: '0 0 0.3rem #4299e1, 0 0 0.6rem #4299e1',
          },
          '50%': {
            boxShadow: '0 0 0.3rem #ffffe1, 0 0 1.4rem #ffffff',
          },
        },
        'border-run': {
          '0%, 100%': { clipPath: 'inset(0 0 98% 0)' },
          '25%': { clipPath: 'inset(0 98% 0 0)' },
          '50%': { clipPath: 'inset(98% 0 0 0)' },
          '75%': { clipPath: 'inset(0 0 0 98%)' },
        },
      },
      animation: {
        'border-run': 'border-pulse 2s linear infinite',
        'shadow-glow-dark': 'shadow-glow-dark 2.5s ease-in-out infinite',
        'shadow-glow-light': 'shadow-glow-light 2.5s ease-in-out infinite',
      },
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
          950: '#005b39',
        },
      },
      fontFamily: {
        inter: ['Inter Variable, sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: ['tailwindcss-animate'],
};
