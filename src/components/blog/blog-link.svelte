<script lang="ts">
import { page } from '$app/stores'
import { cn } from '$lib'
import type { BlogPost } from '$lib/blog'

type BlogLinkProps = {
  article: BlogPost
}

let { article }: BlogLinkProps = $props()
</script>

<a
  aria-current={$page.params.slug === article.slug ? "page" : undefined}
  href="/blog/{article.slug}"
  class={cn(
    "flex justify-between hover:bg-primary-600 transition-colors duration-200 ease-in-out px-2",
    "focus:bg-primary-500",
    {
      "bg-primary-700": $page.params.slug === article.slug,
    },
  )}
>
  <span>{article.metadata.title}</span>
  <span class="text-primary-400">
    {Intl.DateTimeFormat("en", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(article.metadata.date))}
  </span>
</a>
