<script lang="ts">
import Button from '$components/ui/button.svelte'
import Input from '$components/ui/input.svelte'
import { cn } from '$lib'
import BlogSection from './blog-section.svelte'

type BlogModalProps = {
  showModal: boolean
  handleFilter: (value: string) => void
  closeModal: () => void
  search: string
}

let { showModal, handleFilter, closeModal, search }: BlogModalProps = $props()

let value = $state(search)

const handleClose = (event: MouseEvent | KeyboardEvent) => {
  if (!showModal) return
  if (event instanceof KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Escape') {
      event.preventDefault()
      closeModal()
    }

    return
  }

  event.preventDefault()
  closeModal()
}

const handleSearch = (event: MouseEvent | KeyboardEvent) => {
  if (!showModal) return
  if (event instanceof KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      handleFilter(value)
      closeModal()
    }

    return
  }

  handleFilter(value)
  closeModal()
}

$effect(() => {
  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        handleClose(event)
        break
      case 'Enter':
        handleSearch(event)
        break
    }
  }

  window.addEventListener('keyup', handleKeyUp)

  return () => window.removeEventListener('keyup', handleKeyUp)
})
</script>

<dialog open={showModal}>
  <div
    class={cn(
      "fixed inset-0 bg-black bg-opacity-50 z-50 w-full h-full",
      showModal ? "flex" : "hidden",
    )}
  ></div>
  {#if showModal}
    <div
      class={cn(
        "fixed inset-0 flex justify-center items-center z-50",
        showModal ? "flex" : "hidden",
      )}
    >
      <BlogSection class="text-primary-300 bg-primary-900 p-4 w-80" label="Search" id="search">
        <Input
          autofocus
          showLabel={false}
          label="search"
          value={value}
          oninput={(e) => e.target instanceof HTMLInputElement && (value = e.target.value)}
          error={null}
          placeholder={"Search for an article"}
        />
        <div class="flex gap-2">
          <Button onkeypress={closeModal} onclick={closeModal} class="w-1/2 flex items-center justify-center bg-primary-900" type="button">
            <span class="text-center text-sm">Close</span>
            <kbd class="text-primary-300 font-thin text-xs">(Esc)</kbd>
          </Button>
          <Button onkeypress={handleSearch} onclick={handleSearch} class="w-1/2 flex items-center justify-center bg-primary-900" type="button">
            <span class="text-center text-sm">Search</span>
            <kbd class="text-primary-300 font-thin text-xs">(Enter)</kbd>
          </Button>
        </div></BlogSection
      >
    </div>
  {/if}
</dialog>
