<script lang="ts" context="module">
export const routes: Record<string, string> = {
  '1': 'about',
  '2': 'contacts',
}

export const comingSoonRoutes = ['blog', 'projects']
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { on } from "svelte/events";
  import { isKeyboardEvent } from "$lib/events";

  $effect(() => {
    const handleKeydown = (e: Event) => {
      if (!isKeyboardEvent(e)) return;
      if (/^c$/i.test(e.key)) return void goto("/changelog");

      const route = routes[e.key];
      if (route) goto(`/${route}`);
    };

    const cleanup = on(document, "keydown", handleKeydown);
    return () => cleanup();
  });
</script>

<svelte:head>
  <title>Alessio Marchi</title>
  <link rel="canonical" href="https://alessiomarchi.com" />
</svelte:head>

<main class="home-page">
  <h1 class="text-4xl font-sans uppercase">Alessio Marchi</h1>
  <div
    class="flex flex-col items-center justify-center w-full max-w-xs px-4 rounded-lg overflow-hidden"
  >
    {#each Object.entries(routes) as [key, route]}
      <a tabindex="0" hreflang="en" href={`/${route}`} class="home-page__link">
        <span class="first-letter:uppercase">{route}</span>
        <kbd class="text-primary-300 text-sm">({key})</kbd>
      </a>
    {/each}
    {#each comingSoonRoutes as route}
      <div
        class="flex items-center justify-between w-full h-10 px-2 text-primary-300"
      >
        <span class="first-letter:uppercase">{route}</span>
        <kbd class="text-primary-300 text-sm">(soon)</kbd>
      </div>
    {/each}
  </div>
  <div class="absolute bottom-0 right-0 text-primary-200 px-2 uppercase">
    <a href="/changelog" hreflang="en"
      >Changelog <kbd class="text-primary-300 text-sm">(c)</kbd></a
    >
  </div>
</main>

<style lang="postcss">
  .home-page {
    @apply min-h-dvh flex flex-col items-center h-full justify-center gap-4;
  }

  .home-page__link {
    @apply flex items-center justify-between w-full hover:bg-primary-600 transition-colors duration-100 h-10 px-2;
    @apply focus:bg-primary-600 focus:ring-0 focus:outline-none;
  }
</style>
