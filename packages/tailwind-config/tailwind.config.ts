import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export type { Config }

export default {
  theme: {
    fontFamily: {
      sans: ['Exo\\ 2'],
      mono: ['JetBrains\\ Mono'],
    },
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
      violet: 'var(--violet);',
      transparent: colors.transparent,
    },
    plugins: [typographyPlugin],
  },
} satisfies Omit<Config, 'content'>
