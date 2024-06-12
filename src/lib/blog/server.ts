import fs from 'node:fs'
import path from 'node:path'
import { compile } from 'mdsvex'
import type { MetadataKey } from './motions'
import type { BlogPost } from './post'

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogDirectory = path.resolve('src/contents')
  const posts = await fs.promises.readdir(blogDirectory).catch(() => [])
  if (!posts.length) return []

  const postsList: BlogPost[] = []

  for (const post of posts) {
    const postPath = path.resolve(blogDirectory, post, 'blog.mdx')
    const postContent = await fs.promises.readFile(postPath, 'utf-8')
    const postCompiled = await compile(postContent)
    if (!postCompiled) continue

    if (!postCompiled.data) continue

    const {
      title = post.replaceAll(/-/gi, ' '),
      description,
      date = new Date().toISOString(),
      slug = post,
    } = postCompiled.data as Record<MetadataKey, string>
    const content = postCompiled.code

    postsList.push({
      content,
      metadata: { ...postCompiled.data, title, description, date, slug },
      slug,
    })
  }

  return postsList.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  )
}
