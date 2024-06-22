<script lang="ts">
import { enhance } from '$app/forms'
import GeneralIcon from '$components/icons/general-icon.svelte'
import TextDivider from '$components/text-divider.svelte'
import Toast from '$components/toast.svelte'
import Button from '$components/ui/button.svelte'
import Input from '$components/ui/input.svelte'
import TextArea from '$components/ui/textarea.svelte'
import { cn } from '$lib/cn'

const contacts = [
  { name: 'GitHub', url: 'https://github.com/kettei-sproutty' },
  { name: 'Twitter', url: 'https://x.com/alessiom97' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alessio-marchi-a007631b7',
  },
]

let showToast = $state(true)
</script>

<svelte:head>
  <title>Contacts | Alessio Marchi</title>
  <meta name="author" content="Alessio Marchi" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://alessiomarchi.com/about" />
</svelte:head>

<main
  class="bg-primary-900 text-primary-300 flex flex-col items-center justify-center gap-1 m-auto max-w-md h-[calc(100dvh-6rem)] p-4"
>
  <h1 class="text-primary-100 text-3xl">Get in touch!</h1>
  <p class="text-sm text-center">
    I'd love to hear from you. Whether you have a question, feedback, or just
    want to say hello, feel free to reach out.
  </p>
  <div class="flex items-center justify-evenly w-full gap-1 pt-4">
    {#each contacts as { name, url }}
      <a
        tabindex="0"
        href={url}
        class="inline-flex flex-col items-center group gap-1 focus:outline-none"
      >
        <div
          class={cn(
            "bg-primary-700 group-hover:bg-primary-900 group-focus:bg-primary-900",
            "border border-transparent group-hover:border-primary-300 group-focus:border-primary-300",
            "rounded-full text-primary-100 p-2 flex items-center justify-center",
          )}
        >
          <span class="sr-only">{name}</span>
          <GeneralIcon iconName={name} class="size-5" />
        </div>
        <span
          class={cn(
            "text-primary-400 group-hover:text-primary-200 group-focus:text-primary-200",
          )}
        >
          {name}
        </span>
      </a>
    {/each}
  </div>
  <TextDivider padding={false}>or send me an email</TextDivider>
  <form method="post" class="w-full" use:enhance>
    <Input
      fullWidth
      required
      label="your email"
      name="email"
      type="email"
      error={null}
      class="w-full"
    />
    <Input
      fullWidth
      required
      label="subject"
      name="subject"
      type="text"
      error={null}
      class="w-full"
    />
    <TextArea
      fullWidth
      required
      label="message"
      name="message"
      error={null}
      class="w-full resize-none"
    />
    <Button disabled type="submit" fullWidth class="w-full mt-2">Send</Button>
  </form>
</main>
<Toast
  handleClose={() => {
    showToast = false;
  }}
  bind:show={showToast}
  position="bottom-right"
  message={"The send email form is not yet implemented."}
/>
