import { getBlogPosts } from '$lib/blog'

export const load = async () => {
  const articles = await getBlogPosts()

  return { articles }
}

export const prerender = true
