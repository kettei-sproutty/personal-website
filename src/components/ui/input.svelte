<script lang="ts">
import { cn } from '$lib'
import type { HTMLInputAttributes } from 'svelte/elements'

type InputProps = HTMLInputAttributes & {
  label: string
  error: string | null
}

const { label, type, name, required = false, error = null, ...props }: InputProps = $props()
</script>

<label class="flex flex-col gap-1">
  <span class="text-primary-400 first-letter:uppercase">{label}</span>
  <input
    type={type}
    name={name}
    class={cn("p-2 rounded-md bg-primary-800 text-primary-300 focus:outline-none focus:ring focus:ring-primary-400 border-red-power-600", props.class)}
    required={required}
    {...props}
  />
  <span class={cn("h-4 text-xs font-semibold", error ? 'visible' : 'invisible')}>{error}</span>
</label>
