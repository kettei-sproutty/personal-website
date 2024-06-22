<script lang="ts">
import { goto } from '$app/navigation'
import { isKeyboardEvent } from '$lib/events'
import { on } from 'svelte/events'

const goHome = (event: Event) => {
  if (!isKeyboardEvent(event)) return
  if (/h/i.test(event.key)) goto('/')
}

$effect(() => {
  const cleanup = on(document, 'keydown', goHome)
  return () => cleanup()
})
</script>

<svelte:head>
  <title>Oops | Alessio Marchi</title>
  <meta name="description" content="Something went wrong" />
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<main class="error-page">
  <h1 class="error-title">Oops!</h1>
  <p class="text-pretty">Looks like you've found a glitch in the matrix.</p>
  <a href="/" class="error-cta">
    <span>Go Home</span>
    <kbd class="error-cta__kdb">(h)</kbd>
  </a>
</main>

<style lang="postcss">
  .error-page {
    @apply min-h-dvh bg-primary-900 text-primary-300 flex flex-col items-center justify-center gap-0.5;
  }

  .error-title {
    @apply text-primary-100 text-2xl;
  }

  .error-cta {
    @apply bg-primary-700 hover:bg-primary-500 border border-primary-600 text-primary-100 px-3 py-1 mt-4 rounded;
  }

  .error-cta__kdb {
    @apply text-sm text-primary-300;
  }
</style>
