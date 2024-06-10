import { getBlogPosts } from '$lib/blog.server'

export const load = async () => {
  const articles = await getBlogPosts()

  return { articles }
}

export const prerender = true
