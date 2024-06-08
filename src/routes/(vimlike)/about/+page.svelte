<svelte:head>
  <title>About me | Alessio Marchi</title>
  <link rel="canonical" href="https://alessiomarchi.com/about" />
</svelte:head>

<script lang="ts">
import Resume, { resume } from '$components/resume/resume.svelte'
import DownloadIcon from '$icons/download-icon.svelte'
import { Highlight } from 'svelte-highlight'
import json from 'svelte-highlight/languages/json'

const handleDownload = () => {
  window.print()
}
</script>

<main class="content h-page divide-x divide-primary-600 relative">
  <section class="about-me p-4 text-primary-300 flex flex-col gap-2">
    <h1 class="text-4xl text-primary-100">
      Hi, I'm Alessio! <span aria-hidden="true" class="grayscale">👋</span>
    </h1>
    <p>
      I'm a Senior Software Developer based in Rome, Italy, currently working in
      <span class="bg-primary-700 underline"
        >{resume.workHistory[0].company}</span
      >
      as
      <span class="bg-primary-700 underline">{resume.workHistory[0].role}</span
      >.
    </p>
    <p>
      I love programming in <span class="bg-primary-700 underline"
        >TypeScript</span
      >
      and I'm passionate about
      <span class="bg-primary-700 underline">React</span>,
      <span class="bg-primary-700 underline">NextJS</span>, and
      <span class="bg-primary-700 underline">Svelte</span>
      and web technologies in general, but my heart belongs to
      <span class="bg-primary-700 underline">Rust</span> and all the ecosystem around
      it.
    </p>
    <p>
      Experimenting with new technologies and tools, even if they are not
      strictly related to my work, is one of my favorite hobbies, that enabled
      me to bring Rust in my company workflow.
    </p>
    <p>
      I'm a strongly believer in the <span class="bg-primary-700 underline"
        >Open Source</span
      >
      philosophy and community behind it, supporting projects I love as much as I
      can.
    </p>
    <p>
      Saldy, most of my work is private or under NDA, but I'm always open to new
      opportunities and collaborations, so feel free to reach out to me!
    </p>
    <p>
      <a class="bg-primary-700 hover:bg-primary-600 underline" href="/contacts"
        >Get in touch!</a
      >
    </p>
  </section>
  <section class="about-json overflow-hidden h-full">
    <div class="w-full bg-primary-700 px-2 flex justify-end">+me.json</div>
    <Highlight
      class="overflow-scroll"
      style="height: calc(100% - var(--header-height)"
      language={json}
      code={JSON.stringify(resume, null, 2)}
    />
  </section>
  <section
    id="resume"
    class="about-resume border-l border-l-primary-900 max-h-page lg:overflow-scroll overflow-auto"
  >
    <Resume />
  </section>
  <button
    type="button"
    on:click={handleDownload}
    class="absolute top-5 right-5 size-12 bg-primary-800 hover:scale-105 transition-transform rounded-full flex items-center justify-center hover:border border-primary-100"
  >
    <DownloadIcon className="size-4" />
  </button>
</main>

<style lang="postcss">
  .content {
    @apply flex flex-col;
  }

  .about-json {
    display: none;
  }

  @media (min-width: 768px) {
    .content {
      display: grid;
      grid-template-areas: "a b" "c b";
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(6, 1fr);
      height: calc(100dvh - 4rem);
    }
    .about-me {
      grid-area: a;
      grid-column: span 3;
    }

    .about-json {
      display: block;
      grid-area: c;
      grid-column: span 3;
    }

    .about-resume {
      grid-area: b;
      grid-column: span 3;
    }
  }

  @media print {
    * {
      visibility: hidden !important;
      background-color: var(--bg-primary-100) !important;
    }

    .about-resume {
      visibility: visible !important;
      position: absolute;
      display: block !important;
      grid-area: auto !important;
      grid-column: auto !important;
      min-height: 100dvh !important;
      left: 0;
      top: 0;
      background-color: var(--primary-100) !important;
    }
  }
</style>
