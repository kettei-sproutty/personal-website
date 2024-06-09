<svelte:head>
  <title>Blog | Alessio Marchi</title>
  <meta name="description" content="Blog posts by Alessio Marchi" />
  <meta name="robots" content="index, follow" />
  <!-- TODO: Add RSS feed -->
  <!-- <link rel="alternate" type="application/rss+xml" title="RSS Feed for Alessio Marchi's blog" href="https://alessiomarchi.com/feed.xml" /> -->
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { cn } from '$lib'

let { data } = $props()

let selected = $state($page.params.slug)
let multiplier = $state<number | null>(null)
let lastMotion = $state<string | null>(null)
let intlOptionsDesktop: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}
let intlOptionsMobile: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
}

$effect(() => {
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'j') {
      const currentIndex = data.articles.findIndex((article) => article.slug === selected)
      if (currentIndex < data.articles.length - 1) {
        const futureIndex = currentIndex + (multiplier || 1)
        selected = data.articles[futureIndex]
          ? data.articles[futureIndex].slug
          : data.articles[data.articles.length - 1].slug
        goto(`/blog/${selected}`)
        lastMotion = `${multiplier || ''} j`
        if (multiplier) multiplier = null
      }
    }
    if (event.key === 'k') {
      const currentIndex = data.articles.findIndex((article) => article.slug === selected)
      if (currentIndex > 0) {
        const pastIndex = currentIndex - (multiplier || 1)
        selected = data.articles[pastIndex] ? data.articles[pastIndex].slug : data.articles[0].slug
        lastMotion = null
        goto(`/blog/${selected}`)
        lastMotion = `${multiplier || ''} k`
        if (multiplier) multiplier = null
      }
    }

    if (event.key.match(/[0-9]/)) {
      multiplier = Number.parseInt(event.key)
      lastMotion = `${multiplier}`
    }
  }
  window.addEventListener('keyup', handleKeyUp)

  return () => window.removeEventListener('keyup', handleKeyUp)
})
</script>

<div class="min-h-page h-page relative">
  <main class="grid grid-cols-3 p-4 gap-4 min-h-page h-page grid-rows-12">
    <aside class="blog-section md:col-span-1 col-span-3 row-span-11">
      <h2 class="blog-section__title">Articles</h2>
      <ul class="list-none p-2 text-sm text-primary-200 flex flex-col gap">
        {#each data.articles as article}
          <li class="w-full">
            <a
              aria-current={selected === article.slug ? 'page' : undefined}
              href="/blog/{article.slug}"
              class={cn(
                "flex justify-between hover:bg-primary-600 transition-colors duration-200 ease-in-out px-2",
                "focus:bg-primary-500", {
                "bg-primary-700": selected === article.slug
              })}
            >
            <span>{article.metadata.title}</span>
            <span class="text-primary-400 lg:block hidden">{Intl.DateTimeFormat('en', intlOptionsDesktop).format(new Date(article.metadata.date))}</span>
            <span class="text-primary-400 lg:hidden block">{Intl.DateTimeFormat('en', intlOptionsMobile).format(new Date(article.metadata.date))}</span>
            </a>
          </li>
        {/each}
      </ul>
    </aside>
    <section class="md:col-span-2 col-span-3 blog-section row-span-11">
      <h2 class="blog-section__title">Post</h2>
      <div class="p-2">
        <slot />
      </div>
    </section>
  </main>
  <div class="fixed md:block hidden bottom-10 w-full px-4">
    <div class="p-2 blog-section flex justify-between px-4">
      <h2 class="blog-section__title">Shortcuts <span class="text-primary-400 font-thin">(keyup)</span></h2>
      <div class="flex gap-2 divide-x divide-primary-500 items-center">
        <span class="text-primary-400 text-sm"><kbd class="text-primary-200">0-9</kbd> multiplier</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">j</kbd> list down</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">k</kbd> list up</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">J</kbd> page down</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">K</kbd> page up</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">x</kbd> repeat last</span>
        <span class="text-primary-400 text-sm pl-2"><kbd class="text-primary-200">/</kbd> filter</span>
      </div>
      <div class="text-sm">
        <span class="text-primary-400">Last Motion</span>
        <span aria-live="polite" class="text-primary-300 min-w-4 inline-block">
          {lastMotion}
        </span>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .blog-section {
    @apply border border-primary-500 rounded-md relative;
  }

  .blog-section__title {
    @apply text-sm font-sans bg-primary-900 inline-block -top-3 absolute left-2 px-2 font-bold;
  }
</style>

