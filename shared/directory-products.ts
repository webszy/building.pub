// Curated v0 directory. The page reads this through the catalog service so it
// can be swapped for a D1 query without changing the response shape.

export const directoryCategories = [
  { slug: 'web-apps', label: 'Web Apps' },
  { slug: 'mobile-apps', label: 'Mobile Apps' },
  { slug: 'ai-agents', label: 'AI & Agents' },
  { slug: 'developer-tools', label: 'Developer Tools' },
  { slug: 'browser-extensions', label: 'Browser Extensions' },
  { slug: 'open-source', label: 'Open Source' },
  { slug: 'games', label: 'Games' },
  { slug: 'other', label: 'Other' },
] as const

export type DirectoryCategorySlug = (typeof directoryCategories)[number]['slug']

export interface DirectoryCategory {
  slug: string
  label: string
}

export interface DirectoryProduct {
  slug: string
  name: string
  description: string
  category: DirectoryCategorySlug
  logo: string | null
  featured: boolean
  openSource: boolean
  addedAt: string
}

export interface DirectoryCatalog {
  products: DirectoryProduct[]
  categories: DirectoryCategory[]
  supportsFeaturedSort: boolean
}

export const productSorts = ['recently-added', 'name-asc', 'name-desc', 'featured'] as const
export type ProductSort = (typeof productSorts)[number]

const logoGlyphs = {
  circle: '<circle cx="32" cy="32" r="12" fill="#fff"/>',
  ring: '<circle cx="32" cy="32" r="11" fill="none" stroke="#fff" stroke-width="6"/>',
  diamond: '<rect x="22" y="22" width="20" height="20" rx="2" transform="rotate(45 32 32)" fill="#fff"/>',
  bars: '<path fill="#fff" d="M16 20h32v5H16zm4 9h24v5H20zm-2 9h28v5H18z"/>',
  plus: '<path fill="#fff" d="M28 14h8v12h12v8H36v12h-8V34H14v-8h14z"/>',
  arc: '<path d="M16 42c2-16 11-24 16-24s14 8 16 24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>',
  grid: '<path fill="#fff" d="M16 16h14v14H16zm18 0h14v14H34zM16 34h14v14H16zm18 0h14v14H34z"/>',
  bolt: '<path fill="#fff" d="M36 12 20 36h12l-4 16 18-26H32z"/>',
  book: '<path fill="#fff" d="M14 16h14c3.5 0 6 2.2 6 6v26H23c-5 0-9-2.4-9-8zm36 0H36c-3.5 0-6 2.2-6 6v26h11c5 0 9-2.4 9-8z"/>',
} as const

function logo(background: string, glyph: keyof typeof logoGlyphs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${background}"/>${logoGlyphs[glyph]}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const directoryProducts: DirectoryProduct[] = [
  {
    slug: 'harbor-desk',
    name: 'Harbor Desk',
    description: 'A quiet writing desk for independent makers who publish what they are building, one shipped note at a time.',
    category: 'web-apps',
    logo: logo('#1d4ed8', 'circle'),
    featured: true,
    openSource: false,
    addedAt: '2026-10-28T15:00:00.000Z',
  },
  {
    slug: 'pebble-log',
    name: 'Pebble Log',
    description: 'A mobile journal that asks a single question at the end of the day: what did you make?',
    category: 'mobile-apps',
    logo: logo('#0f766e', 'diamond'),
    featured: true,
    openSource: false,
    addedAt: '2026-10-26T15:00:00.000Z',
  },
  {
    slug: 'relay-agent',
    name: 'Relay Agent',
    description: 'Watches your repo and drafts the update you meant to post, with the commits still attached.',
    category: 'ai-agents',
    logo: logo('#7c3aed', 'bolt'),
    featured: true,
    openSource: true,
    addedAt: '2026-10-22T15:00:00.000Z',
  },
  {
    slug: 'northwind-studio-desk',
    name: 'Northwind Studio Desk for Independent Makers Who Publish in Public',
    description: 'A public building log for writers and small studios: drafts, shipped notes, and the half-finished experiments in between. The description is deliberately long so the card can clamp it after two lines instead of growing without a limit.',
    category: 'web-apps',
    logo: null,
    featured: false,
    openSource: false,
    addedAt: '2026-10-18T15:00:00.000Z',
  },
  {
    slug: 'column-reader',
    name: 'Column Reader',
    description: 'Narrows crowded pages down to a readable column without leaving the site you were already on.',
    category: 'browser-extensions',
    logo: logo('#b45309', 'bars'),
    featured: false,
    openSource: false,
    addedAt: '2026-10-14T15:00:00.000Z',
  },
  {
    slug: 'tilt-preview',
    name: 'Tilt Preview',
    description: 'Ship a static preview of any branch with one command, then throw the URL away when you merge.',
    category: 'developer-tools',
    logo: logo('#111827', 'plus'),
    featured: false,
    openSource: true,
    addedAt: '2026-10-11T15:00:00.000Z',
  },
  {
    slug: 'parcel-puzzle',
    name: 'Parcel Puzzle',
    description: 'Pack a tiny apartment before the moving truck leaves. One sitting, no account.',
    category: 'games',
    logo: logo('#e11d48', 'grid'),
    featured: false,
    openSource: false,
    addedAt: '2026-10-07T15:00:00.000Z',
  },
  {
    slug: 'quillpress',
    name: 'Quillpress',
    description: 'A static site generator small enough to read in an afternoon and plain enough to keep.',
    category: 'open-source',
    logo: logo('#be123c', 'book'),
    featured: false,
    openSource: true,
    addedAt: '2026-10-03T15:00:00.000Z',
  },
  {
    slug: 'sprout-log',
    name: 'Sprout Log',
    description: 'Track the experiments you start, not only the ones you finish, from your phone.',
    category: 'mobile-apps',
    logo: logo('#15803d', 'arc'),
    featured: false,
    openSource: false,
    addedAt: '2026-09-28T15:00:00.000Z',
  },
  {
    slug: 'glasshouse',
    name: 'Glasshouse',
    description: 'A research agent that keeps the citation next to the claim, so a reader can check the source.',
    category: 'ai-agents',
    logo: logo('#0369a1', 'ring'),
    featured: false,
    openSource: false,
    addedAt: '2026-09-22T15:00:00.000Z',
  },
  {
    slug: 'bench-local',
    name: 'Bench Local',
    description: 'A local scratchpad for API requests you do not want sitting in someone else\'s cloud history. Collections stay on disk, responses stay readable, and nothing in this build phones home.',
    category: 'developer-tools',
    logo: null,
    featured: false,
    openSource: true,
    addedAt: '2026-09-18T15:00:00.000Z',
  },
  {
    slug: 'sidecar-clip',
    name: 'Sidecar Clip',
    description: 'Saves a snippet from any page into a plain markdown file on your machine.',
    category: 'browser-extensions',
    logo: logo('#c2410c', 'bars'),
    featured: false,
    openSource: true,
    addedAt: '2026-09-12T15:00:00.000Z',
  },
  {
    slug: 'sunday-camp',
    name: 'Sunday Camp',
    description: 'A small co-op camping game you can finish on a Sunday and then put down.',
    category: 'games',
    logo: logo('#ea580c', 'bolt'),
    featured: false,
    openSource: false,
    addedAt: '2026-09-06T15:00:00.000Z',
  },
  {
    slug: 'folio-kit',
    name: 'Folio Kit',
    description: 'Markdown publishing for personal sites, with no account and no hosted lock-in.',
    category: 'open-source',
    logo: logo('#334155', 'book'),
    featured: false,
    openSource: true,
    addedAt: '2026-08-30T15:00:00.000Z',
  },
  {
    slug: 'waypoint',
    name: 'Waypoint',
    description: 'Map the launches you planned against the ones that actually shipped.',
    category: 'web-apps',
    logo: logo('#1e3a8a', 'diamond'),
    featured: false,
    openSource: false,
    addedAt: '2026-08-21T15:00:00.000Z',
  },
  {
    slug: 'kin-list',
    name: 'Kin List',
    description: 'A shared checklist for the small team you ship with, without a project-management suite.',
    category: 'mobile-apps',
    logo: logo('#9d174d', 'plus'),
    featured: false,
    openSource: false,
    addedAt: '2026-08-14T15:00:00.000Z',
  },
  {
    slug: 'env-ferry',
    name: 'Env Ferry',
    description: 'Move environment variables between local, preview, and production without a spreadsheet.',
    category: 'developer-tools',
    logo: logo('#0e7490', 'arc'),
    featured: false,
    openSource: false,
    addedAt: '2026-08-02T15:00:00.000Z',
  },
  {
    slug: 'signal-room',
    name: 'Signal Room',
    description: 'Summarizes the issues and threads you have not had time to read, and links back to each one.',
    category: 'ai-agents',
    logo: logo('#6d28d9', 'grid'),
    featured: true,
    openSource: false,
    addedAt: '2026-07-20T15:00:00.000Z',
  },
  {
    slug: 'draftline',
    name: 'Draftline',
    description: 'Turn a changelog into a public building log your readers can follow.',
    category: 'web-apps',
    logo: logo('#44403c', 'bars'),
    featured: false,
    openSource: false,
    addedAt: '2026-07-11T15:00:00.000Z',
  },
  {
    slug: 'prototype-19',
    name: 'Prototype 19',
    description: 'A personal experiment in keyboard-first task lists. One window, no accounts, and a description long enough to overflow a product card on purpose so the two-line clamp stays honest.',
    category: 'other',
    logo: null,
    featured: false,
    openSource: false,
    addedAt: '2026-06-18T15:00:00.000Z',
  },
  {
    slug: 'lantern-week',
    name: 'Lantern Week',
    description: 'A single-purpose page for showing the thing you are building this week.',
    category: 'other',
    logo: logo('#a16207', 'circle'),
    featured: false,
    openSource: false,
    addedAt: '2026-05-30T15:00:00.000Z',
  },
]

export const categoryPresentations: Record<string, { icon: string, description: string }> = {
  'web-apps': { icon: 'i-lucide-globe', description: 'Useful tools and products built for the web.' },
  'mobile-apps': { icon: 'i-lucide-smartphone', description: 'iOS and Android apps created by independent builders.' },
  'developer-tools': { icon: 'i-lucide-code-xml', description: 'Tools for coding, deployment and developer workflows.' },
  'ai-agents': { icon: 'i-lucide-sparkles', description: 'AI products, assistants and agent-based experiments.' },
  'browser-extensions': { icon: 'i-lucide-puzzle', description: 'Small tools that live in the browser.' },
  'open-source': { icon: 'i-lucide-github', description: 'Projects with publicly available source code.' },
  'games': { icon: 'i-lucide-gamepad-2', description: 'Indie games, playful experiments and interactive ideas.' },
  other: { icon: 'i-lucide-settings', description: 'Experiments and other work that does not fit a single type.' },
}

export interface DirectoryCategoryCard {
  slug: string
  label: string
  icon: string
  description: string
  count: number
}

export function categoryLabel(slug: string) {
  return directoryCategories.find(category => category.slug === slug)?.label ?? slug
}

export function directoryCategoryCards(products: readonly DirectoryProduct[]): DirectoryCategoryCard[] {
  const counts = new Map<string, number>()
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  }

  const knownSlugs = new Set<string>(directoryCategories.map(category => category.slug))
  const cards = directoryCategories.map((category) => {
    const presentation = categoryPresentations[category.slug]
    return {
      slug: category.slug,
      label: category.label,
      icon: presentation?.icon ?? 'i-lucide-shapes',
      description: presentation?.description ?? 'Independent projects in this category.',
      count: counts.get(category.slug) ?? 0,
    }
  })

  const extras = [...counts.keys()]
    .filter(slug => !knownSlugs.has(slug))
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map((slug) => {
      const presentation = categoryPresentations[slug]
      return {
        slug,
        label: categoryLabel(slug),
        icon: presentation?.icon ?? 'i-lucide-shapes',
        description: presentation?.description ?? 'Independent projects in this category.',
        count: counts.get(slug) ?? 0,
      }
    })

  return [...cards, ...extras]
}

export function categoriesFromProducts(products: readonly DirectoryProduct[]): DirectoryCategory[] {
  const present = new Set(products.map(product => product.category))
  const known = new Set<string>(directoryCategories.map(category => category.slug))
  const ordered = directoryCategories.filter(category => present.has(category.slug))
  const extras = [...present]
    .filter(slug => !known.has(slug))
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map(slug => ({ slug, label: slug }))
  return [...ordered, ...extras]
}

export function buildDirectoryCatalog(): DirectoryCatalog {
  const products = directoryProducts.map(product => ({ ...product }))
  return {
    products,
    categories: categoriesFromProducts(products),
    supportsFeaturedSort: products.some(product => product.featured),
  }
}

export function filterDirectoryProducts(products: readonly DirectoryProduct[], category: string) {
  if (!category || category === 'all') return [...products]
  return products.filter(product => product.category === category)
}

export function sortDirectoryProducts(products: readonly DirectoryProduct[], sort: ProductSort) {
  const copy = [...products]
  copy.sort((a, b) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'en')
    if (sort === 'name-desc') return b.name.localeCompare(a.name, 'en')
    if (sort === 'featured') {
      const featureDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      if (featureDelta !== 0) return featureDelta
    }
    const dateDelta = b.addedAt.localeCompare(a.addedAt)
    if (dateDelta !== 0) return dateDelta
    return a.name.localeCompare(b.name, 'en')
  })
  return copy
}

export function readQueryValue(value: unknown) {
  const raw = Array.isArray(value) ? value[0] : value
  return typeof raw === 'string' ? raw : undefined
}

export function parseProductCategory(value: unknown) {
  const raw = readQueryValue(value)?.trim().toLowerCase()
  if (!raw || raw === 'all') return 'all'
  return raw
}

export function parseProductSort(value: unknown, featuredAvailable: boolean): ProductSort {
  const raw = readQueryValue(value)?.trim().toLowerCase()
  if (raw === 'name-asc' || raw === 'name-desc') return raw
  if (raw === 'featured' && featuredAvailable) return 'featured'
  return 'recently-added'
}

export function productListingQuery(category: string, sort: ProductSort) {
  const query: Record<string, string> = {}
  if (category && category !== 'all') query.category = category
  if (sort !== 'recently-added') query.sort = sort
  return query
}
