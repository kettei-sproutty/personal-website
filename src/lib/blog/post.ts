import type { MetadataKey } from './motions'

export interface BlogPost {
  content: string
  metadata: Record<MetadataKey, string>
  slug: string
}

export const filterPosts = (posts: BlogPost[], search: string) => {
  return posts.filter((post) => {
    return post.metadata.title.toLowerCase().includes(search.toLowerCase())
  })
}
