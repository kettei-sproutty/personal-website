import {
  EmailIcon,
  GitIcon,
  GlobeIcon,
  LeftIcon,
  LinkedinIcon,
  LogoIcon,
  PhoneIcon,
  TwitterIcon,
} from '$components/icons'
import GithubIcon from '$components/icons/github-icon.svelte'
import type { SVGAttributes } from 'svelte/elements'

export const getIconFromName = (
  name: string,
): __sveltets_2_IsomorphicComponent<SVGAttributes<EventTarget>> | null => {
  switch (name.toLowerCase()) {
    case 'git':
      return GitIcon
    case 'github':
      return GithubIcon
    case 'globe':
      return GlobeIcon
    case 'twitter':
      return TwitterIcon
    case 'linkedin':
      return LinkedinIcon
    case 'phone':
      return PhoneIcon
    case 'left':
      return LeftIcon
    case 'logo':
    case 'alessiomarchi.dev':
      return LogoIcon
    case 'email':
      return EmailIcon
    default:
      return null
  }
}
