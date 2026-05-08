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
    role: 'Senior Front-End Developer',
    titleLines: ['OTT & Smart TV Specialist', 'Streaming Platform Engineer'],
    summary:
      '6+ years building high-performance OTT platforms and Smart TV applications across LG WebOS, Samsung Tizen, VIZIO and Chromecast. Passionate about crafting exceptional streaming experiences with clean code and scalable architecture.',
    bioLines: [
      'I am a Senior Front-End Developer specializing in OTT and Smart TV platforms. I love crafting smooth, reliable and scalable streaming experiences that millions of users enjoy every day.',
      'I have hands-on experience across the entire streaming stack on the front-end side — from video playback, DRM, analytics to payments and multi-tenant architectures.'
    ],
    contact: {
      email: 'lethinh02411@gmail.com',
      phone: '0915 955 629',
      phoneHref: '+84915955629',
      location: 'Ho Chi Minh City, Vietnam'
    },
    socials: [
      {
        platform: 'LinkedIn',
        label: 'linkedin.com/in/lequanthinh/',
        url: 'https://www.linkedin.com/in/l%C3%AA-th%E1%BB%8Bnh-b20342196/',
        icon: 'linkedin',
        short: 'in'
      },
      {
        platform: 'GitHub',
        label: 'github.com/Le-Quang-Thinh/portfolio',
        url: 'https://github.com/Le-Quang-Thinh/portfolio',
        icon: 'github',
        short: 'gh'
      }
    ],
    cvUrl: '/cv.pdf',
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
    { value: '80%', label: 'Bundle Reduction' },
    { value: 'M+', label: 'Users Reached' }
  ],

  stickyNote: '"Built for billions of streams."',

  coreStrengths: [
    {
      icon: 'Tv',
      name: 'Smart TV & OTT Expertise',
      description:
        'Tizen, webOS, VIZIO, Chromecast, HLS/DASH, DRM — shipped to 4 TV stores'
    },
    {
      icon: 'Zap',
      name: 'Performance & Optimization',
      description:
        '80%+ bundle reduction, memory leak hunting, rendering bottleneck profiling'
    },
    {
      icon: 'Building2',
      name: 'Clean Architecture & Scalability',
      description:
        'Multi-tenant platforms, React ecosystems, CI/CD, Docker, RBAC'
    },
    {
      icon: 'Wrench',
      name: 'Problem Solving & Ownership',
      description:
        'Root-cause analysis, cross-team debugging, end-to-end delivery'
    },
    {
      icon: 'Target',
      name: 'Product Mindset',
      description:
        'User-centric thinking, metrics-driven decisions, on-time shipping'
    }
  ],

  ottDiagram: {
    title: 'Delivering Seamless Streaming\nAcross All Platforms',
    nodes: [
      {
        icon: 'Tv',
        name: 'Smart TV',
        sub: 'WebOS / Tizen / VIZIO',
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
        icon: 'Radio',
        name: 'Streaming',
        sub: 'HLS / DASH / DRM',
        position: 'bottom'
      },
      {
        icon: 'BarChart3',
        name: 'Analytics',
        sub: 'Mux / Firebase / GA4',
        position: 'bottomRight'
      }
    ]
  },

  experiences: [
    {
      id: 'exp-2022-present',
      stampText: 'Present',
      stampTone: 'rust',
      period: '2022 — Present',
      title: 'Senior Front-End Developer',
      company: 'Youthdev Company · Smart TV & OTT Division',
      highlights: [
        {
          label: 'Smart TV',
          items: [
            'Co-architected 4 Smart TV apps from scratch, published on TV stores (.ipk/.wgt)',
            'Integrated DRM (Widevine/FairPlay), HLS/DASH, Chromecast Cast SDK',
            'Designed 10-foot UI with smooth remote/keyboard navigation across all platforms'
          ]
        },
        {
          label: 'Performance',
          items: [
            'Cut bundle size 80%+ (80MB → ~12MB)',
            'Solved critical memory leaks & rendering bottlenecks',
            'Integrated analytics: KCPA, Firebase, Mux, Google Analytics'
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
      stampText: 'Present',
      stampTone: 'rust',
      period: '2020 — Present',
      title: 'Front-End Developer',
      company: 'Youthdev Company · Web Platform & CMS',
      highlights: [
        {
          label: 'Web & CMS',
          items: [
            'Built CMS dashboard (React-Admin, MUI) with multi-tenant & RBAC',
            'Developed 4 OTT web platforms with SSR (Express/Node.js) for SEO',
            'Set up GitLab CI/CD, Docker workflows; mentored 1 junior developer'
          ]
        },
        {
          label: 'Integrations',
          items: [
            'Stripe, PayPal, MoMo — subscription & recurring billing',
            'DRM, OneSignal, Firebase, Mux, GA, DFP Ads integration',
            'Built Cypress E2E test suite for critical flows'
          ]
        }
      ],
      tags: [
        'React-Admin',
        'MUI',
        'Node.js',
        'Express',
        'SSR',
        'Stripe',
        'PayPal',
        'MoMo',
        'Cypress',
        'Docker'
      ]
    },
    {
      id: 'exp-2019-2020',
      stampText: 'Good Start',
      stampTone: 'khaki',
      period: '2019 — 2020',
      title: 'Trainee / Junior Full-Stack',
      company: 'Youthdev Company · Internal E-Learning Platform',
      bullets: [
        'Developed Pi Project (e-learning) with courses, flashcards and audio playback',
        'Built RESTful APIs with Laravel, handled front-end UI and integrations',
        'Continued supporting system and adding urgent features'
      ],
      tags: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'REST API']
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
        'Co-architected and built 4 TV applications from scratch, published on all major TV stores. Full DRM, HLS/DASH, analytics, and 10-foot remote-friendly UI.',
      metrics: [
        { icon: 'Package', text: '80%+ bundle reduction' },
        { icon: 'Smartphone', text: '4 platforms' },
        { icon: 'Lock', text: 'DRM protected' }
      ],
      stack: ['React', 'TypeScript', 'HLS/DASH', 'Widevine', 'Firebase', 'Mux'],
      classification: 'CONFIDENTIAL',
      role: 'Senior Front-End Engineer & Architect',
      duration: '2022 — Present',
      responsibilities: [
        'Co-architected 4 Smart TV applications from scratch and published to LG Content Store, Samsung TV App Store, and VIZIO SmartCast',
        'Built cross-platform OTT video player with HLS/DASH adaptive streaming and DRM protection (Widevine + FairPlay)',
        'Designed 10-foot UI navigation system with full remote-control and keyboard support across all TV platforms',
        'Engineered lazy-loading and module-splitting architecture reducing bundle size from 80MB to under 12MB (80%+ reduction)',
        'Integrated analytics pipelines: Mux, Firebase Analytics, Google Analytics 4, and KCPA event tracking',
        'Led performance profiling to eliminate memory leaks and rendering bottlenecks on constrained TV hardware',
        'Collaborated with backend, QA, and product teams to deliver and certify all production store releases'
      ],
      outcomes: [
        'Published to 4 major TV ecosystems: LG WebOS, Samsung Tizen, VIZIO SmartCast, and Chromecast',
        '80%+ bundle reduction — from 80MB down to under 12MB',
        'End-to-end DRM coverage via Widevine and FairPlay across all sessions',
        'Millions of active users served across all TV platforms'
      ],
      releases: [
        {
          name: 'SCTV TV',
          platform: 'SmartTV, Hotel',
          image: '/images/appRelease/smart/sctvOnline.png'
        },
        {
          name: 'Amasian',
          platform: 'SmartTV, Hotel',
          image: '/images/appRelease/smart/amasian.svg'
        },
        {
          name: 'LG channel VN',
          platform: 'Hotel',
          image: '/images/appRelease/smart/lgChannelVN.png'
        },
        {
          name: 'OndemanKorea',
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
      platforms: ['OnDemandViet', 'SCTV Online', 'Illuon'],
      title: 'OTT Web Platforms',
      subtitle: 'Multi-tenant streaming web apps',
      description:
        'Sole front-end developer. Built multi-tenant SSR platforms with subscription payments, DRM, push notifications, and ad integration for millions of users.',
      metrics: [
        { icon: 'Rocket', text: 'SSR/SEO optimized' },
        { icon: 'CreditCard', text: '3 payment gateways' },
        { icon: 'Users', text: 'M+ users' }
      ],
      stack: ['Next.js', 'Node.js', 'Stripe', 'PayPal', 'OneSignal', 'DFP Ads'],
      classification: 'CONFIDENTIAL',
      role: 'Lead Front-End Developer',
      duration: '2020 — Present',
      responsibilities: [
        'Served as sole front-end developer across 4 multi-tenant OTT web platforms (OnDemandViet, SCTV Online, Illuon)',
        'Implemented SSR with Node.js/Express for SEO performance — improved organic discoverability across all platform domains',
        'Built subscription and recurring billing workflows integrating Stripe, PayPal, and MoMo payment gateways',
        'Integrated DRM-protected video playback with HLS/DASH adaptive bitrate streaming',
        'Delivered OneSignal push notification system and DFP ad integration across all tenants',
        'Architected multi-tenant configuration system enabling rapid platform whitelabeling and isolated data',
        'Set up GitLab CI/CD pipelines and Docker workflows for consistent, reliable deployments',
        'Mentored one junior front-end developer on platform architecture and delivery practices'
      ],
      outcomes: [
        '3 production payment gateways integrated: Stripe, PayPal, and MoMo',
        'Millions of active users served across all web streaming platforms',
        'SSR-optimized for search engine indexing across all platform domains',
        'Enterprise-grade multi-tenant architecture supporting multiple brands from one codebase'
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
        'Multi-tenant CMS with RBAC, S3 multipart upload, live schedule, content & subscription management with modular architecture.',
      metrics: [
        { icon: 'ShieldCheck', text: 'Multi-tenant RBAC' },
        { icon: 'Cloud', text: 'AWS S3 uploads' },
        { icon: 'Calendar', text: 'Live scheduling' }
      ],
      stack: ['React-Admin', 'MUI', 'AWS S3', 'REST API', 'Cypress'],
      classification: 'INTERNAL',
      role: 'Full-Stack Front-End Engineer',
      duration: '2020 — 2022',
      responsibilities: [
        'Designed and built multi-tenant CMS dashboard from scratch using React-Admin and Material UI',
        'Implemented Role-Based Access Control (RBAC) with granular permission management per tenant and user role',
        'Built S3 multipart file upload system with real-time progress tracking for large media assets',
        'Developed live content scheduling system for managing broadcast and on-demand content calendars',
        'Created subscription and plan management workflows supporting end-to-end content monetization',
        'Built modular content interfaces: videos, articles, series, episodes, categories, and tags',
        'Wrote Cypress E2E test suite covering all critical admin flows and content management operations'
      ],
      outcomes: [
        'Multi-tenant RBAC serving multiple content teams with fully isolated access and data',
        'AWS S3 multipart upload system supporting large video and media file ingestion',
        'Live scheduling engine enabling real-time broadcast and on-demand content management',
        'Cypress E2E test coverage across all critical admin and content management workflows'
      ],
      releases: [
        { name: 'OTT Admin Console', platform: 'CMS' },
        { name: 'Live Schedule', platform: 'CMS' }
      ]
    },
    {
      id: 'chromecast',
      thumbType: 'cast',
      thumbLabel: 'CAST',
      thumbIcon: 'Cast',
      platforms: ['Google Cast SDK', 'KCPA Analytics'],
      title: 'Chromecast Apps',
      subtitle: 'Receiver apps with cast SDK',
      description:
        'Receiver apps with KCPA tracking, seamless casting & synchronized playback analytics across all streaming sessions.',
      metrics: [
        { icon: 'BarChart3', text: 'KCPA tracking' },
        { icon: 'RefreshCw', text: 'Sync playback' },
        { icon: 'Target', text: 'Cast SDK' }
      ],
      stack: ['Google Cast', 'JavaScript', 'HLS', 'KCPA', 'Firebase'],
      classification: 'CONFIDENTIAL',
      role: 'Smart TV Engineer',
      duration: '2022 — Present',
      responsibilities: [
        'Developed Chromecast receiver applications with full Google Cast SDK integration on top of existing OTT platforms',
        'Implemented KCPA analytics event tracking across all casting and playback session lifecycles',
        'Built seamless playback state synchronization between sender (mobile/web) and receiver (TV) devices',
        'Integrated HLS adaptive streaming and DRM-protected content playback on the receiver side',
        'Handled cast session management, state transitions, resume playback, and error recovery flows',
        'Tested across multiple Chromecast hardware generations and Android TV smart display devices'
      ],
      outcomes: [
        'Google Cast SDK integration shipped across web and mobile sender applications',
        'KCPA analytics instrumented across all active cast sessions end-to-end',
        'Synchronized playback state across mobile, web, and TV receiver with zero drift',
        'Production-deployed supporting millions of Chromecast streaming sessions'
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
        { name: 'XState' },
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Laravel' },
        { name: 'React-Admin' }
      ]
    },
    {
      id: 'streaming',
      title: 'Streaming / TV',
      icon: 'Cast',
      items: [
        { name: 'HLS / DASH', featured: true },
        { name: 'Widevine DRM', featured: true },
        { name: 'FairPlay DRM', featured: true },
        { name: 'LG WebOS' },
        { name: 'Samsung Tizen' },
        { name: 'VIZIO SmartCast' },
        { name: 'Google Cast SDK' },
        { name: '10-foot UI' },
        { name: 'Mux' }
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
        { name: 'Vercel' }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Quality',
      icon: 'FlaskConical',
      items: [{ name: 'Cypress E2E' }, { name: 'Lighthouse' }, { name: 'Jest' }]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: 'Link2',
      items: [
        { name: 'Firebase' },
        { name: 'OneSignal' },
        { name: 'Google Analytics' },
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
      years: "Bachelor's Degree · 2015 – 2019"
    }
  ],

  contactSubtitle:
    'Open to senior front-end, OTT engineering, or Smart TV specialist roles. Always interested in challenging streaming platform projects.'
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
