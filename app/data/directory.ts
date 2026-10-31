import {
  categoryLabel,
  directoryCategories,
  directoryProducts,
  sortDirectoryProducts,
  type DirectoryProduct,
} from '~~/shared/directory-products'
import { siteBrand } from '~~/shared/site'

export interface DirectoryTool {
  slug: string
  name: string
  description: string
  category: string
  categorySlug: string
  logo: string | null
  featured?: boolean
  openSource?: boolean
}

export interface DirectorySection {
  id: string
  title: string
  subtitle: string
  names: string[]
  categorySlug?: string
}

export const brandName = siteBrand.name
export const brandLogo = siteBrand.logoPath

export function toDirectoryTool(product: DirectoryProduct): DirectoryTool {
  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    category: categoryLabel(product.category),
    categorySlug: product.category,
    logo: product.logo,
    featured: product.featured,
    openSource: product.openSource,
  }
}

export const directoryTools: DirectoryTool[] = directoryProducts.map(toDirectoryTool)

const toolsByName = new Map(directoryTools.map(tool => [tool.name, tool]))

export function directoryTool(name: string) {
  const tool = toolsByName.get(name)
  if (!tool) throw new Error(`Unknown directory product: ${name}`)
  return tool
}

export function directoryToolsByName(names: string[]) {
  return names.map(directoryTool)
}

export const categoryFilters = ['All', ...directoryCategories.map(category => category.label)] as const

export const categoryShortcuts = [
  { title: 'Web Apps', slug: 'web-apps', description: 'Independent apps on the open web.', icon: 'i-lucide-layout-grid' },
  { title: 'Developer Tools', slug: 'developer-tools', description: 'CLIs, APIs, and tools for people who ship.', icon: 'i-lucide-code' },
  { title: 'AI & Agents', slug: 'ai-agents', description: 'Agents and assistants built by independent makers.', icon: 'i-lucide-sparkles' },
]

const featuredNames = sortDirectoryProducts(directoryProducts.filter(product => product.featured), 'featured').map(product => product.name)
const recentNames = sortDirectoryProducts(directoryProducts, 'recently-added').slice(0, 6).map(product => product.name)

function namesInCategory(slug: string) {
  return directoryProducts.filter(product => product.category === slug).map(product => product.name)
}

export const homeSections: DirectorySection[] = [
  {
    id: 'featured-builds',
    title: 'Featured Builds',
    subtitle: 'Projects we are highlighting right now',
    names: featuredNames,
  },
  {
    id: 'fresh-discoveries',
    title: 'Fresh Discoveries',
    subtitle: 'Recently added independent projects.',
    names: recentNames,
  },
  {
    id: 'web-apps',
    title: 'Web Apps',
    subtitle: 'Independent apps you can open in a browser.',
    names: namesInCategory('web-apps'),
    categorySlug: 'web-apps',
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    subtitle: 'CLIs, APIs, and tools for people who ship.',
    names: namesInCategory('developer-tools'),
    categorySlug: 'developer-tools',
  },
]

export const topPicks = featuredNames.slice(0, 5)

export const popularCategories = directoryCategories.map(category => ({
  slug: category.slug,
  label: category.label,
}))

export const faqs = [
  {
    question: 'What is listed here?',
    answer: 'Independent projects and experiments: web apps, mobile apps, developer tools, agents, games, and open-source work. building.pub is a place to discover what people are building, not a ranking of AI tools.',
  },
  {
    question: 'How are projects ordered?',
    answer: 'The products page defaults to recently added. Featured marks projects we are highlighting; it is not a popularity score, rating, or paid ranking.',
  },
  {
    question: 'Can I submit a project?',
    answer: 'Not yet. This early version is curated. Public submissions, accounts, and voting are not available.',
  },
  {
    question: 'What is building.pub?',
    answer: 'A discovery platform for people who build. Discovery is the entry point, projects are the medium, and builders are the protagonists.',
  },
]

export function searchDirectory(query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return directoryTools
  return directoryTools.filter(tool =>
    tool.name.toLowerCase().includes(needle)
    || tool.category.toLowerCase().includes(needle)
    || tool.description.toLowerCase().includes(needle),
  )
}

export const featuredHero = directoryTool(featuredNames[0] ?? directoryTools[0]!.name)
