<svelte:head>
  <title>Contacts | Alessio Marchi</title>
  <meta name="author" content="Alessio Marchi" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://alessiomarchi.com/about" />
</svelte:head>

<script lang="ts">
import { enhance } from '$app/forms'
import TextDivider from '$components/text-divider.svelte'
import GithubIcon from '$icons/social-github-icon.svelte'
import LinkedInIcon from '$icons/social-linkedin-icon.svelte'
import Xicon from '$icons/social-x-icon.svelte'
import type { ChangeEventHandler } from 'svelte/elements'
import type { SubmitFunction } from './$types'

import Input from '$components/ui/input.svelte'
import Textarea from '$components/ui/textarea.svelte'

const contacts = [
  { name: 'GitHub', url: 'https://github.com/kettei-sproutty', Icon: GithubIcon },
  { name: 'X', url: 'https://x.com/alessiom97', Icon: Xicon },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alessio-marchi-a007631b7',
    Icon: LinkedInIcon,
  },
]

type FormState = {
  status: 'success' | 'error' | 'pending' | null
  issues: Record<string, string | null>
}

let formState = $state<FormState>({ status: null, issues: {} })
let isButtonDisabled = $derived(
  formState.status === 'pending' || Object.keys(formState.issues).length > 0,
)

const enhanceFunction: SubmitFunction = ({ formElement }) => {
  formState.status = 'pending'
  return async ({ result }) => {
    console.log(result)
    if (result.type === 'success') {
      formState.status = 'success'
      formElement.reset()
      formState.status = null
    } else {
      formState.status = 'error'
      if ('data' in result && result.data?.issues) {
        formState.issues = result.data?.issues || {}
      }
    }
  }
}

const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
  if (e.target && 'name' in e.target && typeof e.target.name === 'string') {
    formState.issues[e.target.name] = null
    if (Object.keys(formState.issues).length === 0) formState.status = null
  }
}
</script>

<main
  class="min-h-page bg-primary-900 text-primary-300 flex flex-col items-center justify-center gap m-auto max-w-md p-4"
>
  <h1 class="text-white text-3xl">Get in touch!</h1>
  <p class="text-sm text-center">
    I'd love to hear from you. Whether you have a question, feedback, or just
    want to say hello, feel free to reach out.
  </p>
  <div class="flex items-center justify-evenly w-full p-4 gap">
    {#each contacts as { name, url, Icon }}
      <div class="flex flex-col items-center">
        <a
          href={url}
          class="rounded-full bg-primary-700 text-primary-100 p-2 flex items-center justify-center hover:border-primary-200 border-transparent border"
        >
          <span class="sr-only">{name}</span>
          <Icon />
        </a>
        <span
        class="text-primary-400">{name}</span>
      </div>
    {/each}
  </div>
  <TextDivider>or send me an e-mail</TextDivider>
  <form
    class="flex flex-col gap w-full"
    method="POST"
    action="?/send-email"
    use:enhance={enhanceFunction}
  >
    <Input oninput={handleChange} error={formState.issues["name"] || null} label="Name" type="text" name="name" required />
    <Input oninput={handleChange} error={formState.issues["email"] || null} label="Email" type="email" name="email" required />
    <Input oninput={handleChange} error={formState.issues["subject"] || null} label="Subject" type="text" name="subject" required />
    <Textarea oninput={handleChange} error={formState.issues["message"] || null} label="Message" name="message" rows={3} required />
    <button
      type="submit"
      disabled={isButtonDisabled}
      class="bg-primary-700 hover:bg-primary-500 transition-colors duration-100 text-white px-4 py-2 mt-4 rounded"
    >
      Send
    </button>
  </form>
</main>
