<script lang="ts">
import { page } from '$app/stores'
import Details from './details.svelte'
import Resume from './resume.svelte'

let { resume } = $page.data
</script>

<svelte:head>
  <title>About me | Alessio Marchi</title>
  <link rel="canonical" href="https://alessiomarchi.com/about" />
</svelte:head>

<main class="about">
  <div class="about-details">
    <section id="about" class="row-span-1 w-full text-pretty">
      <Details />
    </section>
    <section class="row-span-1 w-full max-w-full overflow-scroll text-left">
      <pre class="">{JSON.stringify(resume, undefined, "\t")}</pre>
    </section>
  </div>
  <section class="about-resume w-full">
    <Resume {resume} />
  </section>
</main>

<style lang="postcss">
  .about {
    @apply grid grid-cols-2 grid-rows-2 h-dvh gap-1;
  }

  .about-details {
    @apply col-span-1 row-span-2 grid grid-rows-2 p-4 border-r-[0.5px] border-r-primary-500 divide-y divide-primary-500;
  }

  .about-resume {
    @apply col-span-1 row-span-2;
  }
</style>
