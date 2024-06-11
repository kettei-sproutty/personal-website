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
import BlogLink from '$components/blog/blog-link.svelte'
import BlogModal from '$components/blog/blog-modal.svelte'
import BlogSection from '$components/blog/blog-section.svelte'
import Button from '$components/ui/button.svelte'
import ShareIcon from '$icons/share-icon.svelte'
import SocialLinkedInIcon from '$icons/social-linkedin-icon.svelte'
import SocialTwitterIcon from '$icons/social-x-icon.svelte'
import { cn } from '$lib'
import { setMotions } from '$lib/blog'
import type { MouseEventHandler } from 'svelte/elements'

let { data, children } = $props()

let multiplier = $state<number | null>(null)
let lastMotion = $state<string | null>(null)

let search = $state('')
let showModal = $state(false)

let filteredArticles = $derived(
  data.articles.filter((article) =>
    article.metadata.title.toLowerCase().includes(search.toLowerCase()),
  ),
)

$effect(() => {
  if (filteredArticles.length === data.articles.length) return

  if (filteredArticles.length === 0) {
    goto('/blog')
    return
  }

  if (
    !$page.params.slug ||
    filteredArticles.find((article) => article.slug === $page.params.slug) ||
    filteredArticles.length === 1
  )
    goto(`/blog/${filteredArticles[0].slug}`)
})

const closeModal = () => {
  showModal = false
}

const handleFilter = (value: string) => {
  search = value
}

$effect(() => {
  const changeMultiplier = (value: number) => {
    multiplier = value
    lastMotion = value.toString()
  }

  const selectArticle = (slug: string, key: string) => {
    goto(`/blog/${slug}`)
    lastMotion = `${multiplier || ''}${key}`
    multiplier = null
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    const motion = setMotions({
      articles: data.articles,
      slug: $page.params.slug,
      key: event.key,
      multiplier,
    })

    switch (motion.kind) {
      case 'null':
        event.preventDefault()
        lastMotion = null
        break
      case 'modal':
        event.preventDefault()
        showModal = true
        break
      case 'multiplier':
        event.preventDefault()
        changeMultiplier(motion.multiplier)
        break
      case 'select':
        event.preventDefault()
        selectArticle(motion.slug, event.key)
        break
      case 'page': {
        event.preventDefault()
        const post = document.querySelector('#blog-post')
        if (post) {
          post.scrollBy({
            top: (motion.direction === 'down' ? 100 : -100) * (multiplier || 1),
            behavior: 'smooth',
          })

          lastMotion = `${multiplier || ''}${event.key}`
        }
        break
      }
      case 'repeat': {
        event.preventDefault()
        console.log('repeat')
        break
      }
    }
  }

  window.addEventListener('keyup', handleKeyUp)

  return () => window.removeEventListener('keyup', handleKeyUp)
})

const handleShare: MouseEventHandler<HTMLButtonElement> = (event) => {
  event.preventDefault()
  if ('navigator' in window) {
    navigator.share({
      title: 'Alessio Marchi',
      text: 'Check out this blog post',
      url: window.location.href,
    })
  }
}

const shortcuts = [
  { key: '0-9', description: 'multiplier' },
  { key: 'j', description: 'list down' },
  { key: 'k', description: 'list up' },
  { key: 'J', description: 'page down' },
  { key: 'K', description: 'page up' },
  { key: 'x', description: 'repeat last' },
  { key: '\\', description: 'filter' },
]
</script>

<div class="min-h-page h-page relative">
  <main class="grid grid-cols-3 p-4 gap-4 max-h-[calc(100dvh - 10rem)] h-full grid-rows-12">
    <BlogSection id="articles" isAside class="md:col-span-1 col-span-3 row-span-11" label="Articles">
      <ul class="list-none p-2 text-sm text-primary-200 flex flex-col gap">
        {#if filteredArticles.length === 0 && data.articles.length > 0}
          <li class="w-full text-primary-400">No articles found, remove filters</li>
        {/if}
        {#each filteredArticles as article}
          <li class="w-full">
            <BlogLink article={article} />
          </li>
        {/each}
      </ul>
    </BlogSection>
    <div class="md:col-span-2 col-span-3 row-span-11 grid grid-rows-10 gap-3">
      <section class={cn("blog-section", {
        "row-span-9": !!$page.params.slug,
        "row-span-10": !$page.params.slug,
        })}>
        <h2 class="blog-section__title">Post</h2>
        <div class="h-2"></div>
        <div id="blog-post" class="px-2 h-[98%] overflow-scroll overscroll-none">
          {@render children?.()}
        </div>
      </section>
      {#if $page.params.slug}
      <section class="blog-section row-span-1 p-4">
        <h2 class="blog-section__title">Share</h2>
        <div class="flex flex-row gap-4">
          <Button type="button" hasIcon><SocialTwitterIcon className="size-4" /><span>Twitter</span></Button>
          <Button type="button" hasIcon><SocialLinkedInIcon className="size-4" /><span>LinkedIn</span></Button>
          {#if typeof window !== 'undefined' && 'share' in navigator}
            <Button onclick={handleShare} type="button" hasIcon><ShareIcon className="size-4" /><span>Share</span></Button>
          {/if}
        </div>
      </section>
      {/if}
    </div>
  </main>
  <div class="fixed md:block hidden bottom-10 w-full px-4">
    <div class="p-2 blog-section flex justify-between px-4">
      <h2 class="blog-section__title">Shortcuts <span class="text-primary-400 font-thin">(keyup)</span></h2>
      <div class="flex gap-2 divide-x divide-primary-500 items-center">
        {#each shortcuts as { key, description }}
          <div class="flex flex-row gap-1 items-center text-sm first:pl-0 pl-2">
            <kbd class="text-primary-200">{key}</kbd>
            <span class="text-primary-400 text-sm pl-2">{description}</span>
          </div>
        {/each}
      </div>
      <div class="text-sm">
        <span class="text-primary-400">Last Motion</span>
        <span aria-live="polite" class="text-primary-300 min-w-4 inline-block">
          {lastMotion}
        </span>
      </div>
    </div>
  </div>
  <BlogModal {closeModal} {search} {handleFilter} {showModal} />
</div>

<style lang="postcss">
  .blog-section {
    @apply border border-primary-500 rounded-md relative;
  }

  .blog-section__title {
    @apply text-sm font-sans bg-primary-900 inline-block -top-3 absolute left-2 px-2 font-bold;
  }
</style>

