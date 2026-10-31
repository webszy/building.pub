export const siteBrand = {
  name: 'building.pub',
  slogan: 'Every builder deserves to be seen.',
  subtitle: "Not just what you built. What you're building.",
  mission: 'Give every builder a chance to be seen, to learn, and to grow.',
  vision: "A place where the world can see what's being built, not just what has succeeded.",
  positioning: 'A discovery platform for people who build.',
  description: 'Discover independent projects, meet the builders behind them, and explore what people are creating.',
  canonicalOrigin: 'https://building.pub',
  locale: 'en_US',
  logoPath: '/media/brand-mark.svg',
  ogImagePath: '/media/og-default.png',
  themeColor: '#C45A1A',
} as const

export const sitePages = {
  home: {
    path: '/',
    title: 'building.pub — Discover What People Are Building',
    description: 'Discover independent projects, meet the builders behind them, and explore what people are creating — from useful tools to open-source experiments.',
  },
  products: {
    path: '/products',
    title: 'Discover Independent Projects | building.pub',
    description: 'Explore web apps, mobile apps, developer tools, AI agents, open-source projects, and experiments built by independent makers.',
  },
  categories: {
    path: '/categories',
    title: 'Explore Project Categories | building.pub',
    description: 'Browse independent projects by category. Discover web apps, developer tools, mobile apps, open-source software, games, and more.',
  },
  about: {
    path: '/about',
    title: 'Our Mission | building.pub',
    description: "Every builder deserves to be seen. Learn why building.pub exists and how we're helping independent creators get discovered.",
  },
} as const

export function absoluteSiteUrl(path: string, origin: string = siteBrand.canonicalOrigin) {
  const base = origin.endsWith('/') ? origin : `${origin}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return new URL(normalized, base).href
}
