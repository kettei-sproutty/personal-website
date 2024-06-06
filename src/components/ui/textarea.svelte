<script lang="ts">
import { cn } from '$lib'
import type { HTMLTextareaAttributes } from 'svelte/elements'

type TextAreaProps = HTMLTextareaAttributes & {
  label: string
  error: string | null
}

let { label, name, required = false, error = null, ...props }: TextAreaProps = $props()
</script>

  <label class="flex flex-col gap-1">
    <span class="text-primary-400 first-letter:uppercase">{label}</span>
    <textarea
      name={name}
      class={cn("p-2 rounded-md bg-primary-800 text-primary-300 focus:outline-none focus:ring focus:ring-primary-400 border-red-power-600", props.class)}
      required={required}
      {...props}
    ></textarea>
    <span class={cn("h-4 text-xs font-semibold", error ? 'visible' : 'invisible')}>{error}</span>
  </label>
