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
import { BlogLink, BlogModal, BlogSection } from '$components/blog'
import Button from '$components/ui/button.svelte'
import { ShareIcon, SocialLinkedinIcon, SocialXIcon } from '$icons/index'
import { cn } from '$lib'
import { processMotions } from '$lib/blog/motions'
import { shortcuts } from '$lib/blog/shortcuts'
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

  const selectArticle = (slug: string, event: KeyboardEvent) => {
    event.preventDefault()
    goto(`/blog/${slug}`)
    lastMotion = `${multiplier || ''}${event.key}`
    multiplier = null
  }

  const handleShowModal = (e: KeyboardEvent) => {
    e.preventDefault()
    showModal = true
  }

  const handleChangeMultiplier = (e: KeyboardEvent, multiplier: number) => {
    e.preventDefault()
    changeMultiplier(multiplier)
  }

  const handleScrollPage = (e: KeyboardEvent, motion: { direction: 'up' | 'down' }) => {
    e.preventDefault()
    const post = document.querySelector('#blog-post')
    if (post) {
      post.scrollBy({
        top: (motion.direction === 'down' ? 100 : -100) * (multiplier || 1),
        behavior: 'smooth',
      })

      lastMotion = `${multiplier || ''}${e.key}`
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    const motion = processMotions({
      articles: data.articles,
      slug: $page.params.slug,
      key: event.key,
      multiplier,
    })

    switch (motion.kind) {
      case 'null':
        lastMotion = null
        break
      case 'modal':
        return handleShowModal(event)
      case 'multiplier':
        return handleChangeMultiplier(event, motion.multiplier)
      case 'select':
        return selectArticle(motion.slug, event)
      case 'page':
        handleScrollPage(event, motion)
        break
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
</script>

<div class="min-h-page h-page relative">
  <main class="grid grid-cols-3 p-4 gap-4 max-h-[calc(100dvh - 8rem)] h-full md:grid-rows-12 grid-rows-none overflow-scroll">
    <BlogSection id="articles" isAside class="md:col-span-1 col-span-3 row-span-11" label="Articles">
      <ul class="list-none p-2 text-sm text-primary-200 flex flex-col gap md:max-h-auto max-h-36 overflow-scroll">
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
    <div class="md:col-span-2 col-span-3 row-span-11 grid md:grid-rows-10 grid-rows-none gap-3">
      <BlogSection id="post" label="Post" class={cn(!!$page.params.slug ? "row-span-9" : "row-span-10")}>
        <div id="blog-post" class="px-2 h-[98%] overscroll-none overflow-visible md:overflow-scroll">
          {@render children?.()}
        </div>
      </BlogSection>
      {#if $page.params.slug}
      <BlogSection id="share" class="row-span-1 py-1.5 px-3" label="Share">
        <div class="flex flex-row gap-4">
          <Button type="button" hasIcon><SocialXIcon className="size-4" /><span>Twitter</span></Button>
          <Button type="button" hasIcon><SocialLinkedinIcon className="size-4" /><span>LinkedIn</span></Button>
          {#if typeof window !== 'undefined' && 'share' in navigator}
            <Button onclick={handleShare} type="button" hasIcon><ShareIcon className="size-4" /><span>Share</span></Button>
          {/if}
        </div>
      </BlogSection>
      {/if}
    </div>
    <BlogSection id="shortcuts" label="Shortcuts" class="px-4 col-span-3 row-span-1 h-full md:block flex flex-col justify-center items-center">
      <div class="flex justify-between items-center pt-1.5">
        <div class="flex gap-2 divide-x divide-primary-500 items-center h-full">
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
    </BlogSection>
  </main>

  <BlogModal {closeModal} {search} {handleFilter} {showModal} />
</div>
