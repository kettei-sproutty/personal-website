<svelte:head>
  <title>Blog | Alessio Marchi</title>
  <meta name="description" content="Blog posts by Alessio Marchi" />
  <meta name="robots" content="index, follow" />
  <!-- TODO: Add RSS feed -->
  <!-- <link rel="alternate" type="application/rss+xml" title="RSS Feed for Alessio Marchi's blog" href="https://alessiomarchi.com/feed.xml" /> -->
</svelte:head>

<script lang="ts">
let { data } = $props()
</script>

<main class="grid grid-cols-3 p-4 gap-4 h-page min-h-page">
  <aside class="blog-section col-span-1">
    <h2 class="blog-section__title">Articles</h2>
    <ul class="list-none pt-2 pl-2 text-sm text-primary-200 flex flex-col gap">
      {#each data.data.articles as article}
        <li class="w-full"><a href="/blog/{article.slug}" class="w-full block hover:bg-primary-800">{article.title}</a></li>
      {/each}
    </ul>
  </aside>
  <section class="col-span-2 blog-section">
    <h2 class="blog-section__title">Post</h2>
    <div class="pt-2 pl-2">
      <slot />
    </div>
  </section>
</main>

<style lang="postcss">
  .blog-section {
    @apply border border-primary-500 rounded-md relative;
  }

  .blog-section__title {
    @apply text-sm font-sans bg-primary-900 inline-block -top-3 absolute left-2 px-2 font-bold;
  }
</style>

