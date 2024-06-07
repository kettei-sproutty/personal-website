import { redirect } from '@sveltejs/kit'
import { compile } from 'mdsvex'

export const load = async () => {
  try {
    const changelogsRaw = await fetch(
      'https://raw.githubusercontent.com/kettei-sproutty/personal-website/main/CHANGELOG.md',
    )
    const changelogText = await changelogsRaw.text()

    const compiled = await compile(changelogText)
    if (!compiled) {
      redirect(500, '/500')
    }

    return {
      status: 200,
      data: {
        changelogs: compiled,
      },
    }
  } catch (error) {
    redirect(500, '/500')
  }
}

export const ssr = true
