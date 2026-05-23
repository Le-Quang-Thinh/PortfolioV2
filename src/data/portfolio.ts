/**
 * Single source of truth for the portfolio.
 * All section components consume `portfolioData` and never hard-code content.
 */

export type SocialIconKey =
  | 'linkedin'
  | 'github'
  | 'mail'
  | 'phone'
  | 'location'
  | 'cv'

export interface SocialLink {
  platform: 'LinkedIn' | 'GitHub'
  label: string
  url: string
  icon: SocialIconKey
  short: string
}

export interface ContactInfo {
  email: string
  phone: string
  phoneHref: string
  location: string
}

export interface Profile {
  name: string
  shortName: string
  monogram: string
  role: string
  titleLines: string[]
  summary: string
  bioLines: string[]
  contact: ContactInfo
  socials: SocialLink[]
  cvUrl: string
  footerQuote: string
  footerSig: string
}

export interface Kpi {
  value: string
  label: string
}

export interface CoreStrength {
  icon: string
  name: string
  description: string
}

export interface OttNode {
  icon: string
  name: string
  sub: string
  position: 'top' | 'left' | 'right' | 'bottomLeft' | 'bottom' | 'bottomRight'
}

export interface SkillItem {
  name: string
  featured?: boolean
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  items: SkillItem[]
}

export type ProjectThumbType = 'tv' | 'web' | 'cms' | 'cast'

export type ClassificationLevel =
  | 'SECRET'
  | 'CONFIDENTIAL'
  | 'INTERNAL'
  | 'PUBLIC'

export interface Project {
  id: string
  thumbType: ProjectThumbType
  thumbLabel: string
  thumbIcon: string
  platforms: string[]
  title: string
  subtitle: string
  description: string
  metrics: { icon: string; text: string }[]
  stack: string[]
  // Case-study fields for the project detail modal
  classification?: ClassificationLevel
  role?: string
  duration?: string
  responsibilities?: string[]
  outcomes?: string[]
  // Product showcase — placeholder names, edit freely in portfolio.ts
  releases?: { name: string; platform?: string; image?: string }[]
}

export type StampTone = 'rust' | 'navy' | 'khaki'

export interface ExperienceHighlight {
  label: string
  items: string[]
}

export interface Experience {
  id: string
  stampText: string
  stampTone: StampTone
  period: string
  title: string
  company: string
  highlights?: ExperienceHighlight[]
  bullets?: string[]
  tags: string[]
}

export interface Education {
  id: string
  icon: string
  degree: string
  school: string
  years: string
}

export interface NavItem {
  href: string
  label: string
  iconKey:
    | 'home'
    | 'about'
    | 'experience'
    | 'projects'
    | 'skills'
    | 'education'
    | 'contact'
}

export interface PortfolioData {
  profile: Profile
  nav: NavItem[]
  kpis: Kpi[]
  stickyNote: string
  coreStrengths: CoreStrength[]
  ottDiagram: { title: string; nodes: OttNode[] }
  experiences: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  education: Education[]
  contactSubtitle: string
}

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Lê Quang Thịnh',
    shortName: 'Lê Quang Thịnh',
    monogram: 'LQT',
    role: 'Senior Frontend Developer',
    titleLines: ['OTT & Smart TV Specialist', 'Streaming Platform Engineer'],
    summary:
      '6+ years building OTT streaming platforms across Web, Smart TV (LG WebOS, Samsung Tizen, VIZIO) and Chromecast. Co-architected 4 Smart TV apps from scratch — all published to TV stores. Built 4 multi-tenant web platforms and a CMS from scratch as initial sole developer. Cut bundle size by 80%+ (80MB → 12MB) and resolved critical memory/performance issues on legacy devices (Chrome 38+). Comfortable operating as both an independent contributor and a collaborative team member in fast-paced, product-driven environments.',
    bioLines: [
      'I am a Senior Frontend Developer specializing in OTT and Smart TV platforms. I focus on building smooth, reliable and scalable streaming experiences — from video playback and DRM to payments and multi-tenant architecture.',
      'I have worked across the full front-end streaming stack: adaptive video (HLS/DASH), Smart TV native SDKs (WebOS, Tizen, VIZIO), Chromecast, analytics pipelines, and subscription billing. I am comfortable operating as both an independent contributor and a collaborative team member in fast-paced, product-driven environments.'
    ],
    contact: {
      email: 'lethinh02411@gmail.com',
      phone: '+84 915 955 629',
      phoneHref: '+84915955629',
      location: 'Ho Chi Minh City, Vietnam'
    },
    socials: [
      {
        platform: 'LinkedIn',
        label: 'linkedin.com/in/le-thinh-b20342196',
        url: 'https://www.linkedin.com/in/l%C3%AA-th%E1%BB%8Bnh-b20342196/',
        icon: 'linkedin',
        short: 'in'
      },
      {
        platform: 'GitHub',
        label: 'github.com/Le-Quang-Thinh',
        url: 'https://github.com/Le-Quang-Thinh',
        icon: 'github',
        short: 'gh'
      }
    ],
    cvUrl: '/Le_Quang_Thinh_Senior_Frontend_Developer_CV.pdf',
    footerQuote:
      '"Code is architecture. Experience is optimization. Product is the result."',
    footerSig: 'Lê Quang Thịnh · 2026'
  },

  nav: [
    { href: '#home', label: 'Home', iconKey: 'home' },
    { href: '#about', label: 'About', iconKey: 'about' },
    { href: '#experience', label: 'Experience', iconKey: 'experience' },
    { href: '#projects', label: 'Projects', iconKey: 'projects' },
    { href: '#skills', label: 'Skills', iconKey: 'skills' },
    { href: '#education', label: 'Education', iconKey: 'education' },
    { href: '#contact', label: 'Contact', iconKey: 'contact' }
  ],

  kpis: [
    { value: '6+', label: 'Years Experience' },
    { value: '4', label: 'TV Apps Published' },
    { value: '4', label: 'Web Platforms Built' },
    { value: '80%+', label: 'Bundle Reduction' },
    { value: '80→12MB', label: 'Bundle Size Cut' }
  ],

  stickyNote: '"Built for billions of streams."',

  coreStrengths: [
    {
      icon: 'Tv',
      name: 'Smart TV & OTT Expertise',
      description:
        'Tizen, WebOS, VIZIO, Chromecast, HLS/DASH, DRM — co-architected 4 apps shipped to TV stores'
    },
    {
      icon: 'Zap',
      name: 'Performance & Optimization',
      description:
        '80%+ bundle reduction (80MB → 12MB), memory leak resolution, legacy device support (Chrome 38+)'
    },
    {
      icon: 'Building2',
      name: 'Clean Architecture & Scalability',
      description:
        'Multi-tenant platforms, React ecosystem, CI/CD, Docker, RBAC — built from scratch as initial sole developer'
    },
    {
      icon: 'Wrench',
      name: 'Problem Solving & Ownership',
      description:
        'Root-cause analysis, cross-team debugging, end-to-end delivery on constrained hardware'
    },
    {
      icon: 'Target',
      name: 'Product Mindset',
      description:
        'User-centric thinking, metrics-driven decisions, onboarding and mentoring junior developers'
    }
  ],

  ottDiagram: {
    title: 'Delivering Seamless Streaming\nAcross All Platforms',
    nodes: [
      {
        icon: 'Radio',
        name: 'Streaming',
        sub: 'HLS / DASH / DRM',
        position: 'top'
      },
      { icon: 'Laptop', name: 'Web', sub: 'React / Next.js', position: 'left' },
      {
        icon: 'Smartphone',
        name: 'Mobile',
        sub: 'iOS / Android',
        position: 'right'
      },
      {
        icon: 'Cast',
        name: 'Chromecast',
        sub: 'Google Cast SDK',
        position: 'bottomLeft'
      },

      {
        icon: 'Tv',
        name: 'Smart TV',
        sub: 'WebOS / Tizen / VIZIO',
        position: 'bottom'
      },
      {
        icon: 'BarChart3',
        name: 'Analytics',
        sub: 'Mux / Firebase / KCPA',
        position: 'bottomRight'
      }
    ]
  },

  experiences: [
    {
      id: 'exp-2022-present',
      stampText: 'Present',
      stampTone: 'rust',
      period: 'Apr 2022 — Present',
      title: 'Senior Frontend Developer',
      company: 'Youthdev Company · Smart TV & OTT Division',
      highlights: [
        {
          label: 'Smart TV',
          items: [
            'Co-architected 4 Smart TV apps from scratch with one other developer — published to LG, Samsung, and VIZIO TV stores (.ipk/.wgt)',
            'Extended 2 apps (Amasian, LG Channel VN) to hotel TV environments via LG ProCentric system, covering both consumer and hospitality deployment models',
            'Integrated DRM (Widevine/FairPlay), HLS/DASH adaptive streaming, and Google Cast SDK for Chromecast',
            'Designed 10-foot UI with smooth remote/keyboard navigation across all platforms'
          ]
        },
        {
          label: 'Performance',
          items: [
            'Cut bundle size 80%+ (80MB → ~12MB) via code splitting, tree shaking, and dead code elimination',
            'Resolved critical memory leaks and rendering bottlenecks on legacy Smart TVs (Chrome 38+) using ES5 transpilation and polyfills',
            'Integrated video analytics: KCPA, Firebase, Mux, Google Analytics'
          ]
        }
      ],
      tags: [
        'React',
        'TypeScript',
        'LG WebOS',
        'Samsung Tizen',
        'VIZIO',
        'HLS/DASH',
        'DRM',
        'Mux',
        'Firebase',
        'Chromecast'
      ]
    },
    {
      id: 'exp-2020-present',
      stampText: 'Growth',
      stampTone: 'navy',
      period: 'Feb 2020 — Apr 2022 (+ on-demand support)',
      title: 'Front-End Developer',
      company: 'Youthdev Company · Web Platform & CMS',
      highlights: [
        {
          label: 'Web & CMS',
          items: [
            'Built all web products from scratch as initial sole developer; onboarded a new team member after 3 months and continued as primary contributor',
            'Developed 4 multi-tenant OTT web platforms (OnDemandViet, SCTV Online, Muchomas, Illuon) with shared codebase and SSR (Express/Node.js) for SEO',
            'Built CMS dashboard (React-Admin, TypeScript, Styled Components, MUI) with multi-tenant RBAC, S3 multipart video upload, and live schedule management'
          ]
        },
        {
          label: 'Integrations & Quality',
          items: [
            'Integrated 3 payment gateways (Stripe, PayPal, MoMo) with subscription billing and upgrade/downgrade flows',
            'Configured DRM, OneSignal push notifications, Firebase, Mux, Google Analytics, and Google DFP ad serving',
            'Built Cypress E2E test suite; set up GitLab CI/CD + Docker pipelines; mentored 1 junior developer'
          ]
        }
      ],
      tags: [
        'React-Admin',
        'TypeScript',
        'MUI',
        'Node.js',
        'Express',
        'SSR',
        'Stripe',
        'PayPal',
        'MoMo',
        'Cypress',
        'Docker',
        'AWS S3'
      ]
    },
    {
      id: 'exp-2019-2020',
      stampText: 'Good Start',
      stampTone: 'khaki',
      period: 'Jun 2019 — Feb 2020',
      title: 'Trainee / Junior Full-Stack',
      company: 'Youthdev Company · Internal E-Learning Platform',
      bullets: [
        'Built Pi Project — an internal e-learning platform with slide-based courses, flashcard systems, and audio course playback',
        'Handled both back-end (Laravel API, database design) and front-end (HTML, CSS, JavaScript UI), building a full-stack foundation',
        'Continued supporting the system and contributing urgent features during subsequent roles'
      ],
      tags: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS']
    }
  ],

  projects: [
    {
      id: 'smart-tv-apps',
      thumbType: 'tv',
      thumbLabel: 'SMART TV',
      thumbIcon: 'Tv',
      platforms: ['LG WebOS', 'Samsung Tizen', 'VIZIO'],
      title: 'Smart TV Apps',
      subtitle: 'Netflix-style streaming applications',
      description:
        'Co-architected 4 TV applications from scratch with one other developer, published on all major TV stores. Full DRM, HLS/DASH adaptive streaming, analytics, and 10-foot remote-friendly UI.',
      metrics: [
        { icon: 'Package', text: '80%+ bundle reduction' },
        { icon: 'Smartphone', text: '4 platforms published' },
        { icon: 'Lock', text: 'DRM protected' }
      ],
      stack: [
        'React',
        'TypeScript',
        'HLS/DASH',
        'Widevine',
        'Firebase',
        'Mux',
        'KCPA'
      ],
      classification: 'CONFIDENTIAL',
      role: 'Senior Frontend Developer (Co-Architect)',
      duration: 'Apr 2022 — Present',
      responsibilities: [
        'Co-architected 4 Smart TV applications from scratch with one other developer — published to LG Content Store, Samsung TV App Store, and VIZIO SmartCast',
        'Extended 2 apps (Amasian, LG Channel VN) to hotel TV environments via LG ProCentric system, covering both consumer and hospitality deployment models',
        'Built cross-platform OTT video player with HLS/DASH adaptive streaming and DRM protection (Widevine + FairPlay)',
        'Designed 10-foot UI navigation system with full remote-control and keyboard support across all TV platforms',
        'Reduced bundle size from 80MB to under 12MB (80%+ reduction) through aggressive code splitting, tree shaking, and lazy loading',
        'Resolved critical memory leaks and rendering bottlenecks on hardware-constrained legacy TVs (Chrome 38+) using ES5 transpilation and polyfills',
        'Integrated analytics pipelines: Mux, Firebase Analytics, Google Analytics, and KCPA event tracking',
        'Built Chromecast receiver applications using Google Cast SDK with KCPA integration for stable cross-device casting'
      ],
      outcomes: [
        'Published to 4 major TV ecosystems: LG WebOS, Samsung Tizen, VIZIO SmartCast, and Chromecast',
        '80%+ bundle size reduction — from 80MB down to under 12MB',
        'Full DRM coverage via Widevine and FairPlay across all streaming sessions',
        'Legacy device support down to Chrome 38 — stable playback on older hardware'
      ],
      releases: [
        {
          name: 'SCTV Online TV',
          platform: 'SmartTV',
          image: '/images/appRelease/smart/sctvOnline.png'
        },
        {
          name: 'Amasian',
          platform: 'SmartTV',
          image: '/images/appRelease/smart/amasian.svg'
        },
        {
          name: 'LG Channel VN',
          platform: 'Hotel TV',
          image: '/images/appRelease/smart/lgChannelVN.png'
        },
        {
          name: 'OnDemandKorea',
          platform: 'SmartTV',
          image: '/images/appRelease/smart/odk.png'
        }
      ]
    },
    {
      id: 'ott-web',
      thumbType: 'web',
      thumbLabel: 'OTT WEB',
      thumbIcon: 'Globe',
      platforms: ['OnDemandViet', 'SCTV Online', 'Illuon', 'Muchomas'],
      title: 'OTT Web Platforms',
      subtitle: 'Multi-tenant streaming web apps',
      description:
        'Built as initial sole front-end developer. 4 multi-tenant SSR platforms with subscription payments, DRM, push notifications, and ad integration — sharing one codebase across all brands.',
      metrics: [
        { icon: 'Rocket', text: 'SSR / SEO optimized' },
        { icon: 'CreditCard', text: '3 payment gateways' },
        { icon: 'Users', text: '4 brands, 1 codebase' }
      ],
      stack: [
        'Next.js',
        'Node.js',
        'Stripe',
        'PayPal',
        'MoMo',
        'OneSignal',
        'DFP Ads'
      ],
      classification: 'CONFIDENTIAL',
      role: 'Key Front-End Developer (Initial Sole Developer)',
      duration: 'Feb 2020 — Apr 2022',
      responsibilities: [
        'Built all web products from scratch as the initial sole front-end developer; onboarded a new team member after 3 months and continued as primary contributor',
        'Developed 4 multi-tenant OTT web platforms (OnDemandViet, SCTV Online, Muchomas, Illuon) with shared codebase architecture',
        'Implemented SSR with Node.js/Express for SEO optimization — improved Google PageSpeed and Lighthouse scores across all platform domains',
        'Integrated 3 payment gateways (Stripe, PayPal, MoMo) with subscription billing, upgrade/downgrade flows, and recurring billing management',
        'Configured DRM-protected video playback with HLS/DASH adaptive streaming',
        'Integrated OneSignal push notifications, Firebase analytics, Mux video analytics, Google DFP ad serving',
        'Set up GitLab CI/CD pipelines and Docker workflows for consistent deployments',
        'Wrote Cypress E2E test suite covering all critical admin flows and content management operations',
        'Mentored 1 junior developer through code reviews, establishing React best practices'
      ],
      outcomes: [
        '4 multi-tenant OTT platforms sharing one codebase — OnDemandViet, SCTV Online, Muchomas, Illuon',
        '3 production payment gateways integrated: Stripe, PayPal, and MoMo',
        'SSR-optimized across all platform domains for search engine indexing',
        'Enterprise-grade multi-tenant architecture supporting multiple brands with isolated data and configs'
      ],
      releases: [
        {
          name: 'OnDemandViet',
          platform: 'OTT Web',
          image: '/images/appRelease/web/ondemanViet.png'
        },
        {
          name: 'SCTV Online',
          platform: 'OTT Web',
          image: '/images/appRelease/web/sctv.png'
        },
        {
          name: 'Illuon',
          platform: 'OTT Web',
          image: '/images/appRelease/web/illuon.png'
        },
        {
          name: 'Muchomas',
          platform: 'OTT Web, Closed'
          // image: '/images/appRelease/web/illuon.png'
        }
      ]
    },
    {
      id: 'cms',
      thumbType: 'cms',
      thumbLabel: 'CMS',
      thumbIcon: 'Settings',
      platforms: ['React-Admin', 'TypeScript', 'MUI'],
      title: 'Internal CMS',
      subtitle: 'Content management platform',
      description:
        'Multi-tenant CMS built from scratch as sole developer. Features RBAC, S3 multipart upload, live schedule management, content & subscription management with modular reusable architecture.',
      metrics: [
        { icon: 'ShieldCheck', text: 'Multi-tenant RBAC' },
        { icon: 'Cloud', text: 'AWS S3 multipart upload' },
        { icon: 'Calendar', text: 'Live scheduling' }
      ],
      stack: [
        'React-Admin',
        'TypeScript',
        'MUI',
        'Styled Components',
        'AWS S3',
        'REST API',
        'Cypress'
      ],
      classification: 'INTERNAL',
      role: 'Sole Front-End Developer',
      duration: 'Feb 2020 — Apr 2022',
      responsibilities: [
        'Designed and built multi-tenant CMS dashboard from scratch as sole front-end developer using React-Admin, TypeScript, and Material UI',
        'Implemented Role-Based Access Control (RBAC) with granular permission management per tenant and user role',
        'Built S3 multipart file upload system with real-time progress tracking for large video and media assets',
        'Developed live content scheduling system for managing broadcast and on-demand content calendars',
        'Created subscription and plan management workflows supporting end-to-end content monetization',
        'Built modular reusable CRUD components for content: videos, series, episodes, categories, and tags',
        'Customized Material UI with Styled Components to match per-tenant branding requirements',
        'Established React best practices and clean code standards for the team through regular code reviews, pair programming, and onboarding documentation'
      ],
      outcomes: [
        'Multi-tenant RBAC serving multiple content teams with fully isolated access and data',
        'S3 multipart upload system supporting large video file ingestion with real-time progress',
        'Live scheduling engine enabling real-time broadcast and on-demand content management',
        'Reusable CRUD module architecture — feature development speed increased significantly after rollout'
      ],
      releases: [
        { name: 'OTT Admin Console', platform: 'CMS' },
        { name: 'Live Schedule Manager', platform: 'CMS' }
      ]
    },
    {
      id: 'chromecast',
      thumbType: 'cast',
      thumbLabel: 'CAST',
      thumbIcon: 'Cast',
      platforms: ['Google Cast SDK', 'KCPA Analytics'],
      title: 'Chromecast Apps',
      subtitle: 'Receiver apps with Cast SDK',
      description:
        'Receiver apps built on Google Cast SDK with KCPA tracking, seamless casting and synchronized playback analytics across all streaming sessions.',
      metrics: [
        { icon: 'BarChart3', text: 'KCPA tracking' },
        { icon: 'RefreshCw', text: 'Sync playback' },
        { icon: 'Target', text: 'Google Cast SDK' }
      ],
      stack: [
        'Google Cast',
        'JavaScript',
        'TypeScript',
        'HLS',
        'KCPA',
        'Firebase'
      ],
      classification: 'CONFIDENTIAL',
      role: 'Smart TV & Chromecast Engineer',
      duration: 'Apr 2022 — Present',
      responsibilities: [
        'Built Chromecast receiver applications on top of Google Cast SDK with KCPA analytics integration',
        'Implemented KCPA event tracking across all casting and playback session lifecycles',
        'Built seamless playback state synchronization between sender (mobile/web) and receiver (TV) devices',
        'Integrated HLS adaptive streaming and DRM-protected content playback on the receiver side',
        'Handled cast session management, state transitions, resume playback, and error recovery flows',
        'Tested across multiple Chromecast hardware generations'
      ],
      outcomes: [
        'Google Cast SDK integration shipped across web sender applications',
        'KCPA analytics instrumented across all active cast sessions end-to-end',
        'Synchronized playback state between sender and TV receiver with stable cross-device casting'
      ],
      releases: [{ name: 'OnDemandKorea Cast', platform: 'Chromecast' }]
    }
  ],

  skills: [
    {
      id: 'languages',
      title: 'Languages',
      icon: 'Braces',
      items: [
        { name: 'JavaScript ES6+', featured: true },
        { name: 'TypeScript', featured: true },
        { name: 'HTML5' },
        { name: 'CSS3 / SCSS' },
        { name: 'PHP' }
      ]
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      icon: 'Atom',
      items: [
        { name: 'React.js', featured: true },
        { name: 'Next.js', featured: true },
        { name: 'Redux' },
        { name: 'Context API' },
        { name: 'XState' },
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Laravel' },
        { name: 'React-Admin' },
        { name: 'Material UI (MUI)' },
        { name: 'Styled Components' },
        { name: 'Tailwind CSS' }
      ]
    },
    {
      id: 'streaming',
      title: 'Streaming / TV',
      icon: 'Cast',
      items: [
        { name: 'HLS / DASH', featured: true },
        { name: 'DRM (Widevine / FairPlay)', featured: true },
        { name: 'LG WebOS', featured: true },
        { name: 'Samsung Tizen', featured: true },
        { name: 'VIZIO SmartCast' },
        { name: 'Google Cast SDK' },
        { name: '10-foot UI' },
        { name: 'Mux' },
        { name: 'KCPA' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: 'Wrench',
      items: [
        { name: 'Git' },
        { name: 'GitLab CI/CD' },
        { name: 'Docker' },
        { name: 'Webpack' },
        { name: 'Babel' },
        { name: 'AWS S3' },
        { name: 'CloudFront' },
        { name: 'Vercel' },
        { name: 'Claude AI', featured: true }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Quality',
      icon: 'FlaskConical',
      items: [
        { name: 'Cypress E2E', featured: true },
        { name: 'Chrome Lighthouse' },
        { name: 'Jest' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: 'Link2',
      items: [
        { name: 'Firebase' },
        { name: 'OneSignal' },
        { name: 'Google Analytics / GTM' },
        { name: 'DFP Ads' },
        { name: 'Stripe' },
        { name: 'PayPal' },
        { name: 'MoMo' },
        { name: 'KCPA' }
      ]
    }
  ],

  education: [
    {
      id: 'edu-ttn',
      icon: 'GraduationCap',
      degree: 'Information Technology',
      school: 'Tây Nguyên University – TNU',
      years: "Bachelor's Degree · 2014 – 2019"
    }
  ],

  contactSubtitle: `Senior Frontend Developer with OTT & Smart TV expertise, 
open to web application and product engineering roles. 
On-site, hybrid, or remote in Ho Chi Minh City.`
}

export type MemoryAccent = 'cyan' | 'magenta' | 'amber' | 'lime' | 'violet'

export interface MemoryChapter {
  id: string
  index: string
  title: string
  banner: string
  date: string
  description: string
  image: string
  accent: MemoryAccent
}

export const memoryArchive: MemoryChapter[] = [
  {
    id: 'chapter-01',
    index: '01',
    title: 'ECHO OF THE STARLIGHT VOW',
    banner: 'INTO THE MEMORY PROGRAM',
    date: '2099.04.30',
    description:
      'A fragmented dream surfaces from the archive — twin moons over a silent terminal, a promise spoken in a language no one remembers. The signal is clear; the meaning is not.',
    image: '/images/memory/01.jpg',
    accent: 'cyan'
  },
  {
    id: 'chapter-02',
    index: '02',
    title: 'NEON GHOSTS OF SECTOR ZERO',
    banner: 'INTO THE MEMORY PROGRAM',
    date: '2099.05.18',
    description:
      'Recovery agents drift through abandoned corridors of the lower city. Each footstep echoes against rain-slick chrome; each glance summons a face that should not still be smiling.',
    image: '/images/memory/02.jpg',
    accent: 'magenta'
  },
  {
    id: 'chapter-03',
    index: '03',
    title: 'CROWN OF THE SUNSET ENGINE',
    banner: 'INTO THE MEMORY PROGRAM',
    date: '2099.07.02',
    description:
      'High atop the eastern spire, the engine awakens. Its halo paints the dusk in gold — and within the light, the operator finds a memory that was never theirs.',
    image: '/images/memory/03.jpg',
    accent: 'amber'
  },
  {
    id: 'chapter-04',
    index: '04',
    title: 'SILENT BLOOM PROTOCOL',
    banner: 'INTO THE MEMORY PROGRAM',
    date: '2099.08.21',
    description:
      'The greenhouse below the surface answers only to a heartbeat. When she places her palm on the glass, the entire colony begins to sing — softly, then all at once.',
    image: '/images/memory/04.jpg',
    accent: 'lime'
  },
  {
    id: 'chapter-05',
    index: '05',
    title: 'AURORA OF THE FORGOTTEN COURT',
    banner: 'INTO THE MEMORY PROGRAM',
    date: '2099.10.09',
    description:
      'A coronation lost between timelines — banners that never fell, an empress crowned by static. The archive cannot say if she ever existed, only that she still waits.',
    image: '/images/memory/05.jpg',
    accent: 'violet'
  }
]
