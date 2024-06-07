import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [vitePreprocess(), mdsvex({ extension: '.svx' })],
  kit: {
    adapter: adapter(),
    alias: {
      '$icons/*': 'src/icons/*',
      '$components/*': 'src/components/*',
    },
  },
}

export default config
