<script lang="ts">
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import LeftIcon from '$icons/left-icon.svelte'
import LogoIcon from '$icons/logo-icon.svelte'

enum Mode {
  NORMAL = 'normal',
  INSERT = 'insert',
}

let mode = $state<Mode>(Mode.NORMAL)

const url = $derived(`${$page.url?.pathname}/+page.svelte}`)

$effect(() => {
  const modeHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      mode = Mode.INSERT
    } else if (mode === Mode.INSERT) {
      mode = Mode.NORMAL
    } else if (mode === Mode.NORMAL && e instanceof KeyboardEvent) {
      if (e.key === 'Backspace') {
        history.back()
        // Fallback if there is no history
        goto('/')
      }
    }
  }

  window.addEventListener('keydown', modeHandler)
  window.addEventListener('click', modeHandler)

  return () => {
    window.removeEventListener('keydown', modeHandler)
    window.removeEventListener('click', modeHandler)
  }
})

const { children } = $props()
</script>

<div class="min-h-dvh relative">
  <header class="print:hidden px-4 w-full sticky top-0 bg-primary-700 h-8 flex items-center">
    <a hreflang="en" href="/">
      <div class="flex items-center gap-2 hover:bg-primary-600 transition-colors duration-200">
        <LeftIcon />
        <span class="font-mono">
          Back
          <kbd aria-hidden="true" class="text-sm text-primary-400">(backspace)</kbd>
        </span>
      </div>
    </a>
    <div class="ml-auto">
      <LogoIcon />
    </div>
  </header>
  {@render children()}
  <footer class="print:hidden fixed bottom-0 w-full">
    <div class="bg-primary-700 p-2 text-white text-xs flex items-center justify-between gap-4 w-full px-4">
      <div class="flex items-center space-x-4 flex-grow">
        <div class="font-mono uppercase px-2 text-primary-800 bg-primary-100 rounded-full font-mono w-16 text-center">
          {mode}
        </div>
        <div class="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="6" x2="6" y1="3" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
          <span>main</span>
        </div>
      </div>
      <div>{url}</div>
    </div>
  </footer>
</div>
