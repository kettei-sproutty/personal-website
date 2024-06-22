<script lang="ts">
import { cn } from '$lib/cn'
import CloseIcon from './icons/close-icon.svelte'

type ToastProps = {
  message: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  show: boolean
  handleClose: () => void
}

let { message, position, handleClose, show = $bindable() }: ToastProps = $props()
</script>

{#if show}
  <div
    class={cn(
      "absolute bg-primary-800 border-t border-primary-300 md:w-96 w-full p-2 grid grid-cols-10",
      "bottom-10 left-1/2 -translate-x-1/2",
      {
        "md:top-10 md:left-5 translate-x-0": position === "top-left",
        "md:top-10 md:right-5 left-auto translate-x-0":
          position === "top-right",
        "md:bottom-10 md:left-5 translate-x-0": position === "bottom-left",
        "md:bottom-10 md:right-5 left-auto translate-x-0":
          position === "bottom-right",
      },
    )}
  >
    <span class="text-primary-200 col-span-9 text-sm">
      {message}
    </span>
    <div class="flex justify-end">
      <button
        onclick={handleClose}
        class="col-span-1 w-min h-min rounded-full border border-transparent hover:border-primary-300 focus:border-primary-300"
      >
        <CloseIcon class="text-primary-200" />
      </button>
    </div>
  </div>
{/if}
