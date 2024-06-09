import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts,svx}'],
  theme: {
    fontFamily: {
      sans: ['Exo\\ 2'],
      mono: ['JetBrains\\ Mono'],
    },
    extend: {
      colors: {
        primary: {
          100: 'var(--primary-100);',
          200: 'var(--primary-200);',
          300: 'var(--primary-300);',
          400: 'var(--primary-400);',
          500: 'var(--primary-500);',
          600: 'var(--primary-600);',
          700: 'var(--primary-700);',
          800: 'var(--primary-800);',
          900: 'var(--primary-900);',
        },
        'day-blue': {
          100: 'var(--day-blue-100);',
          200: 'var(--day-blue-200);',
          300: 'var(--day-blue-300);',
          400: 'var(--day-blue-400);',
          500: 'var(--day-blue-500);',
          600: 'var(--day-blue-600);',
          700: 'var(--day-blue-700);',
          800: 'var(--day-blue-800);',
          900: 'var(--day-blue-900);',
        },
        'purple-blue': {
          100: 'var(--purple-blue-100);',
          200: 'var(--purple-blue-200);',
          300: 'var(--purple-blue-300);',
          400: 'var(--purple-blue-400);',
          500: 'var(--purple-blue-500);',
          600: 'var(--purple-blue-600);',
          700: 'var(--purple-blue-700);',
          800: 'var(--purple-blue-800);',
          900: 'var(--purple-blue-900);',
        },
        sunglow: {
          100: 'var(--sunglow-100);',
          200: 'var(--sunglow-200);',
          300: 'var(--sunglow-300);',
          400: 'var(--sunglow-400);',
          500: 'var(--sunglow-500);',
          600: 'var(--sunglow-600);',
          700: 'var(--sunglow-700);',
          800: 'var(--sunglow-800);',
          900: 'var(--sunglow-900);',
        },
        'steam-green': {
          100: 'var(--steam-green-100);',
          200: 'var(--steam-green-200);',
          300: 'var(--steam-green-300);',
          400: 'var(--steam-green-400);',
          500: 'var(--steam-green-500);',
          600: 'var(--steam-green-600);',
          700: 'var(--steam-green-700);',
          800: 'var(--steam-green-800);',
          900: 'var(--steam-green-900);',
        },
        'heisenberg-blue': {
          100: 'var(--heisenberg-blue-100);',
          200: 'var(--heisenberg-blue-200);',
          300: 'var(--heisenberg-blue-300);',
          400: 'var(--heisenberg-blue-400);',
          500: 'var(--heisenberg-blue-500);',
          600: 'var(--heisenberg-blue-600);',
          700: 'var(--heisenberg-blue-700);',
          800: 'var(--heisenberg-blue-800);',
          900: 'var(--heisenberg-blue-900);',
        },
        'happy-orange': {
          100: 'var(--happy-orange-100);',
          600: 'var(--happy-orange-600);',
          900: 'var(--happy-orange-900);',
        },
        'electric-green': {
          100: 'var(--electric-green-100);',
          600: 'var(--electric-green-600);',
          900: 'var(--electric-green-900);',
        },
        'red-power': {
          100: 'var(--red-power-100);',
          600: 'var(--red-power-600);',
          900: 'var(--red-power-900);',
        },
        violet: 'var(--violet);',
      },
      height: {
        page: 'var(--page-min-height);',
        a4: 'var(--a4-height);',
      },
      minHeight: {
        page: 'var(--page-min-height);',
        a4: 'var(--a4-height);',
      },
      maxHeight: {
        page: 'var(--page-min-height);',
        a4: 'var(--a4-height);',
      },
      width: {
        a4: 'var(--a4-width);',
      },
      maxWidth: {
        a4: 'var(--a4-width);',
      },
      aspectRatio: {
        a4: '210 / 297',
      },
      inset: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
} satisfies Config
