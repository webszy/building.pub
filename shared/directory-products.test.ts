import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildDirectoryCatalog,
  directoryCategories,
  directoryCategoryCards,
  filterDirectoryProducts,
  parseProductCategory,
  parseProductSort,
  productListingQuery,
  sortDirectoryProducts,
  type DirectoryProduct,
} from './directory-products.ts'

function product(overrides: Partial<DirectoryProduct> & Pick<DirectoryProduct, 'slug' | 'name' | 'category' | 'addedAt'>): DirectoryProduct {
  return {
    description: 'Test product',
    logo: null,
    featured: false,
    openSource: false,
    ...overrides,
  }
}

describe('directory catalog', () => {
  const catalog = buildDirectoryCatalog()

  it('covers every category and the card edge cases', () => {
    const slugs = catalog.products.map(item => item.slug)
    assert.equal(new Set(slugs).size, slugs.length)
    for (const category of directoryCategories) {
      assert.equal(catalog.categories.some(item => item.slug === category.slug), true)
      assert.equal(catalog.products.some(item => item.category === category.slug), true)
    }
    assert.equal(catalog.supportsFeaturedSort, true)
    assert.equal(catalog.products.some(item => item.logo === null), true)
    assert.equal(catalog.products.some(item => item.name.length > 60), true)
    assert.equal(catalog.products.some(item => item.description.length > 180), true)
    assert.equal(catalog.products.some(item => item.featured), true)
    assert.equal(catalog.products.some(item => item.openSource && item.category !== 'open-source'), true)
  })

  it('filters by category and keeps unknown categories empty', () => {
    const webApps = filterDirectoryProducts(catalog.products, 'web-apps')
    assert.ok(webApps.length > 0)
    assert.ok(webApps.every(item => item.category === 'web-apps'))
    assert.equal(filterDirectoryProducts(catalog.products, 'all').length, catalog.products.length)
    assert.deepEqual(filterDirectoryProducts(catalog.products, 'missing'), [])
  })

  it('sorts by date, name, and featured without inventing rank', () => {
    const items = [
      product({ slug: 'old-feature', name: 'Old Feature', category: 'games', addedAt: '2026-01-01T00:00:00.000Z', featured: true }),
      product({ slug: 'new-plain', name: 'New Plain', category: 'games', addedAt: '2026-06-01T00:00:00.000Z' }),
      product({ slug: 'new-feature', name: 'New Feature', category: 'games', addedAt: '2026-08-01T00:00:00.000Z', featured: true }),
      product({ slug: 'mid-plain', name: 'Mid Plain', category: 'games', addedAt: '2026-03-01T00:00:00.000Z' }),
    ]

    assert.deepEqual(sortDirectoryProducts(items, 'recently-added').map(item => item.slug), [
      'new-feature',
      'new-plain',
      'mid-plain',
      'old-feature',
    ])
    assert.deepEqual(sortDirectoryProducts(items, 'name-asc').map(item => item.slug), [
      'mid-plain',
      'new-feature',
      'new-plain',
      'old-feature',
    ])
    assert.deepEqual(sortDirectoryProducts(items, 'name-desc').map(item => item.slug), [
      'old-feature',
      'new-plain',
      'new-feature',
      'mid-plain',
    ])
    assert.deepEqual(sortDirectoryProducts(items, 'featured').map(item => item.slug), [
      'new-feature',
      'old-feature',
      'new-plain',
      'mid-plain',
    ])
  })

  it('counts published products per existing category slug', () => {
    const items = [
      product({ slug: 'a', name: 'A', category: 'web-apps', addedAt: '2026-01-01T00:00:00.000Z' }),
      product({ slug: 'b', name: 'B', category: 'web-apps', addedAt: '2026-01-02T00:00:00.000Z' }),
      product({ slug: 'c', name: 'C', category: 'games', addedAt: '2026-01-03T00:00:00.000Z', openSource: true }),
    ]
    const cards = directoryCategoryCards(items)
    const bySlug = Object.fromEntries(cards.map(card => [card.slug, card.count]))
    assert.equal(bySlug['web-apps'], 2)
    assert.equal(bySlug.games, 1)
    assert.equal(bySlug['open-source'], 0)
    assert.equal(cards.map(card => card.slug).join(','), directoryCategories.map(category => category.slug).join(','))
  })

  it('reads listing query values and omits the defaults', () => {
    assert.equal(parseProductCategory(undefined), 'all')
    assert.equal(parseProductCategory(['Web-Apps']), 'web-apps')
    assert.equal(parseProductSort('featured', false), 'recently-added')
    assert.equal(parseProductSort(['featured'], true), 'featured')
    assert.equal(parseProductSort('nope', true), 'recently-added')
    assert.deepEqual(productListingQuery('all', 'recently-added'), {})
    assert.deepEqual(productListingQuery('games', 'name-asc'), { category: 'games', sort: 'name-asc' })
  })
})
