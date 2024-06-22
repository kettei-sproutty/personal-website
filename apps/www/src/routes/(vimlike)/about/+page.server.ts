export type ResumeContactType = {
  name: 'email' | 'phone' | (string & {})
  value: string
}

export type ResumeType = {
  name: `${string} ${string}`
  role: string
  about: string[]
  contacts: ResumeContactType[]
  workHistory: WorkHistoryType[]
  sidebarInfos: Record<string, string[]>
}

export type WorkHistoryProjectType = {
  description: string
  stack: string[]
}

export type WorkHistoryType = {
  company: string
  role: string
  projects: WorkHistoryProjectType[]
  period: string
}

export const load = () => {
  const resume = {
    name: 'Alessio Marchi',
    role: 'Senior Software Developer',
    about: [
      'I am a 26-year-old Senior Software Developer located in Rome, Italy, specializing in Rust, TypeScript, and contributing to open-source community projects. My passion extends to the broader tech community, where I actively engage.',
      'I am dedicated to sharing knowledge, engaging in discussions, and collaborating globally. My commitment to personal growth drives me to continuously learn, experiment with new technologies, and refine my skills.',
    ],
    contacts: [
      {
        name: 'email',
        value: 'mailto:alessiomarchi.dev@gmail.com',
      },
      {
        name: 'GitHub',
        value: 'https://github.com/kettei-sproutty',
      },
      { name: 'Twitter', value: 'https://x.com/alessiom97' },
      {
        name: 'LinkedIn',
        value: 'https://www.linkedin.com/in/alessio-marchi-a007631b7',
      },
      {
        name: 'alessiomarchi.dev',
        value: 'https://alessiomarchi.dev',
      },
    ],
    workHistory: [
      {
        company: 'Accenture',
        role: 'Senior Software Developer',
        period: '2022 - present',
        projects: [
          {
            description:
              'Team of 3, developed a full-stack application for analyzing website accessibility (WCAG 2.2) issues and a stream-based AI chatbot for suggesting fixes.',
            stack: ['NextJS', 'Node (Hono)', 'MongoDB', 'IA', 'TailwindCSS', 'GitHub', 'Figma'],
          },
          {
            description:
              'Team of 3, built a WYSIWYG editor, similar to Docs/Word, featuring pagination, normalization, and custom blocks.',
            stack: [
              'React with Vite',
              'SlateJS',
              'TailwindCSS',
              'Jotai',
              'Turborepo',
              'Azure',
              'Figma',
            ],
          },
          {
            description:
              'Team of 2,  built an interactive 2D application using sprites and animations, along with a Rust script that generates the sprites atlas.',
            stack: [
              'NextJS (SSG)',
              'ThreeJS (R3F)',
              'Valtio',
              'Rust',
              'Framer Motion',
              'Azure',
              'Figma',
            ],
          },
        ],
      },
      {
        company: 'Accenture',
        role: 'Software Developer ',
        projects: [
          {
            description:
              'Team of 6, built a graph-based web application for handling connections between nodes in a power plant. After delivery, we studied a refactor using React Flow instead of mxGraph.',
            stack: ['React', 'mxGraph', 'Redux', 'SASS', 'Azure', 'Figma'],
          },
          {
            description:
              'Team of 8, progressively rewrote a web application from VanillaJS to Vue, incorporating a new design and new features, and managing the integration with payment services.',
            stack: ['Vue', 'Nuxt', 'Vuex', 'Adobe IO', 'Adobe AEM', 'Miro'],
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
              'Team of 4, developed an application for reserving sports fields in Rome. The application was built using a microservices architecture with a federated GraphQL gateway.',
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
              'Solo project, developed a portal for creating and managing insurance policies, enabling customers to track their policies and make payments.',
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
        'Valtio/Jotai/Redux',
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

  return {
    resume,
  }
}
