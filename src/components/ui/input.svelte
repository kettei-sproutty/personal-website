<script lang="ts">
import { cn } from '$lib'
import type { HTMLInputAttributes } from 'svelte/elements'

type InputProps = HTMLInputAttributes & {
  label: string
  error: string | null
  showLabel?: boolean
}

const {
  label,
  type,
  name,
  required = false,
  error = null,
  showLabel = true,
  ...props
}: InputProps = $props()
</script>

<label class="flex flex-col gap-1">
  <label for={name} class={cn("text-primary-400 first-letter:uppercase", { "sr-only": !showLabel })}>{label}</label>
  <input
    id={name}
    type={type}
    name={name}
    class={cn("p-2 rounded-md bg-primary-800 text-primary-300 focus:outline-none focus:ring focus:ring-primary-400 border-red-power-600", props.class)}
    required={required}
    {...props}
  />
  <span class={cn("h-4 text-xs font-semibold", error ? 'visible' : 'invisible')}>{error}</span>
</label>
