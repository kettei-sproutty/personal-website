import preset, { type Config } from 'tailwind-config/tailwind'

export default {
  content: ['src/**/*.{svelte,ts}'],
  presets: [preset],
} satisfies Config
