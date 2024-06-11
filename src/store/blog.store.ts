import type { BlogPost } from '$lib/blog/post'
import { writable } from 'svelte/store'

enum ActionKey {
  UPPERCASE_K = 'UPPERCASE_K',
  UPPERCASE_J = 'UPPERCASE_J',
  LOWERCASE_K = 'LOWERCASE_K',
  LOWERCASE_J = 'LOWERCASE_J',
  BACKSLASH = 'BACKSLASH',
}

type LastMotionType = {
  multiplier: number
  key: ActionKey
}

type BlogStoreType = {
  lastMotion: LastMotionType | null
  multiplier: number | null
  search: string
  showModal: boolean
  articles: BlogPost[]
}

const initialState: BlogStoreType = {
  lastMotion: null,
  multiplier: null,
  search: '',
  showModal: false,
  articles: [],
}

export const createBlogStore = () => {
  const { subscribe, update } = writable<BlogStoreType>(initialState)

  const setMultipler = (multiplier: number) =>
    update((state) => ({ ...state, multiplier: multiplier }))

  return {
    subscribe,
    setMultipler,
  }
}
