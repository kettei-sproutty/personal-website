<script lang="ts" context="module">
import GlobeIcon from '$icons/globe-icon.svelte'
import SocialEmailIcon from '$icons/social-email-icon.svelte'
import SocialGithubIcon from '$icons/social-github-icon.svelte'
import SocialLinkedinIcon from '$icons/social-linkedin-icon.svelte'
import SocialXIcon from '$icons/social-x-icon.svelte'
import ResumeAbout from './resume-about.svelte'
import ResumeContacts, { type ResumeContactType } from './resume-contacts.svelte'
import ResumeHeader from './resume-header.svelte'
import ResumeSidebar, { type ResumeSidebarType } from './resume-sidebar.svelte'
import ResumeWorkHistory, { type WorkHistoryType } from './resume-work-history.svelte'

export type ResumeType = {
  name: `${string}${' '}${string}`
  role: string
  about: string[]
  contacts: ResumeContactType[]
  workHistory: WorkHistoryType[]
  sidebarInfos: ResumeSidebarType
}

export const resume = {
  name: 'Alessio Marchi',
  role: 'Senior Software Developer',
  about: [
    "I'm a 26 years old Senior Software Developer based in Rome, Italy. I love Rust, Typescript, open-source community/projects and the tech community in general.",
    'I love sharing knowledge, discuss and collaborate with people from all over the world, trying to improving myself day by day, learning new things and experimenting with new technologies.',
  ],
  contacts: [
    { name: 'email', value: 'mailto:about@alessiomarchi.dev', Icon: SocialEmailIcon },
    { name: 'GitHub', value: 'https://github.com/kettei-sproutty', Icon: SocialGithubIcon },
    { name: 'Twitter', value: 'https://x.com/alessiom97', Icon: SocialXIcon },
    {
      name: 'LinkedIn',
      value: 'https://www.linkedin.com/in/alessio-marchi-a007631b7',
      Icon: SocialLinkedinIcon,
    },
    { name: 'alessiomarchi.dev', value: 'https://alessiomarchi.dev', Icon: GlobeIcon },
  ],
  workHistory: [
    {
      company: 'Accenture',
      role: 'Senior Software Developer',
      period: '2022 - present',
      projects: [
        {
          description:
            'Team of 3, build a Fullstack application for analyzing website a11y (WCAG 2.2) issues, and a stream-based AI chatbot for suggesting fixes.',
          stack: ['NextJS', 'Node (Hono)', 'MongoDB', 'IA', 'TailwindCSS', 'GitHub', 'Figma'],
        },
        {
          description:
            'Team of 3, build a WYSIWYG editor, similar to Docs/Word, with pagination, normalization, and custom blocks.',
          stack: [
            'React with Vite',
            'SlateJS/PlateJS',
            'TailwindCSS',
            'Turborepo',
            'Azure',
            'Figma',
          ],
        },
        {
          description:
            'Team of 2, build an interactive 2D application, using sprites and animations, and a Rust script that generates the sprites.',
          stack: ['NextJS (SSG)', 'ThreeJS (R3F)', 'Rust', 'Framer Motion', 'Azure', 'Figma'],
        },
      ],
    },
    {
      company: 'Accenture',
      role: 'Software Developer ',
      projects: [
        {
          description:
            'Team of 6, build a graph-based web application, for handling connections between nodes rappresenting a power plant. After the delivery it was studied a refactor using react-flow instead of mxgraph.',
          stack: ['React', 'mxGraph', 'SASS', 'Azure', 'Figma'],
        },
        {
          description:
            'Team of 8, progressive rewrite of a web application, from VanillaJS to Vue, with a new design and new features, handling the integration with payment services.',
          stack: ['Vue', 'Nuxt', 'Adobe IO', 'Adobe AEM', 'Miro'],
        },
      ],
      period: '2021 - 2022',
    },
    {
      company: 'LineApp SRL',
      role: 'Software Developer',
      period: '2020-2021',
      projects: [
        {
          description:
            'Team of 4, developed an application for reserving sport fields in Rome. The application was built using a microservices architecture, with a federated GraphQL gateway.',
          stack: ['React', 'GraphQL (Apollo Server/Client)', 'Apollo Federation', 'MongoDB'],
        },
      ],
    },
    {
      company: 'Gestione Progetti SRL',
      role: 'Software Developer',
      period: '2019-2020',
      projects: [
        {
          description:
            'Solo project, developed a portal for creating and managing insurance policies, where customers can track their policies and make payments.',
          stack: ['NextJS (SSR)', 'Hasura', 'PostgreSQL', 'GraphQL'],
        },
      ],
    },
  ],
  sidebarInfos: {
    expertise: ['TypeScript', 'Rust'],
    libraries: [
      'React/NextJS',
      'Svelte/Kit',
      'Vue/Nuxt',
      'ThreeJS',
      'TailwindCSS',
      'Apollo GraphQL',
      'Tauri',
      'Leptos',
      'Axum/Rocket',
      'Redis',
      'SlateJS',
    ],
    tools: [
      'git',
      'WASM/WASI',
      'Prettier/ESLint',
      'BiomeJS',
      'GitHub/GitLab/Azure',
      'GitHub workflow/CircleCI',
      'Jira/Confluence',
      'Firebase/Supabase',
      'Figma',
    ],
    languages: ['Italian', 'English'],
    hobbies: [
      'Game Development (Bevy)',
      'Reading (Historical Books)',
      'Listening Podcasts',
      'Traveling',
    ],
  },
} satisfies ResumeType
</script>

<div class="w-a4 min-h-a4 bg-primary-100 mx-auto">
  <div class="px-6 max-w-a4 bg-primary-100">
    <ResumeHeader resume={resume} />
    <ResumeContacts contacts={resume.contacts} />
    <div class="grid grid-cols-12 pt-7 gap-3">
      <div class="col-span-3">
        <ResumeSidebar sidebarInfos={resume.sidebarInfos} />
      </div>
      <div class="col-span-9 flex flex-col gap-2">
        <ResumeAbout about={resume.about} />
        <ResumeWorkHistory workHistory={resume.workHistory} />
      </div>
    </div>
  </div>
</div>
