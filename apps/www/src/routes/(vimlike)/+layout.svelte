<script lang="ts">
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { GitIcon, LeftIcon, LogoIcon } from '$components/icons'
import { on } from 'svelte/events'

enum Mode {
  NORMAL = 'normal',
  INSERT = 'insert',
}

let mode = $state<Mode>(Mode.NORMAL)

const url = $derived(`${$page.url?.pathname}/+page.svelte`)

$effect(() => {
  const modeHandler = (e: Event) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      mode = Mode.INSERT
    } else if (mode === Mode.INSERT) {
      mode = Mode.NORMAL
      if (e instanceof KeyboardEvent && e.key === 'Backspace') return void goto('/')
    } else if (mode === Mode.NORMAL && e instanceof KeyboardEvent) {
      if (e.key === 'Backspace') goto('/')
    }
  }

  const keydownCleanup = on(window, 'keydown', modeHandler)
  const clickCleanup = on(window, 'click', modeHandler)

  return () => {
    keydownCleanup()
    clickCleanup()
  }
})

const { children } = $props()
</script>

  <div class="min-h-dvh relative">
    <header class="print:hidden px-2 w-full sticky top-0 bg-primary-700 h-8 flex items-center">
      <a hreflang="en" href="/">
        <div class="flex items-center gap-2 hover:bg-primary-500 px-2 py-1 bg-primary-700 transition-colors duration-200">
          <LeftIcon class="size-4" />
          <span class="font-mono text-sm">
            Back
          </span>
          <kbd aria-hidden="true" class="text-xs text-primary-400">(backspace)</kbd>
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
          <div class="uppercase px-2 text-primary-800 bg-primary-100 rounded-full font-mono w-16 text-center">
            {mode}
          </div>
          <div class="flex items-center space-x-1">
            <GitIcon />
            <span>main</span>
          </div>
        </div>
        <div>{url}</div>
      </div>
    </footer>
  </div>
