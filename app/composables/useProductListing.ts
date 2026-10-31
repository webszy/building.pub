import {
  filterDirectoryProducts,
  parseProductCategory,
  parseProductSort,
  productListingQuery,
  sortDirectoryProducts,
  type DirectoryCatalog,
  type ProductSort,
} from '~~/shared/directory-products'

export function useProductListing(catalog: MaybeRefOrGetter<DirectoryCatalog | null | undefined>) {
  const route = useRoute()
  const router = useRouter()

  const categories = computed(() => toValue(catalog)?.categories ?? [])
  const featuredAvailable = computed(() => toValue(catalog)?.supportsFeaturedSort ?? false)
  const category = computed(() => parseProductCategory(route.query.category))
  const sort = computed(() => parseProductSort(route.query.sort, featuredAvailable.value))
  const visible = computed(() => {
    const products = toValue(catalog)?.products ?? []
    return sortDirectoryProducts(filterDirectoryProducts(products, category.value), sort.value)
  })

  function push(nextCategory: string, nextSort: ProductSort) {
    const query = { ...route.query }
    delete query.category
    delete query.sort
    return router.push({
      path: '/products',
      query: { ...query, ...productListingQuery(nextCategory, nextSort) },
    })
  }

  function setCategory(slug: string) {
    if (slug === category.value) return
    return push(slug, sort.value)
  }

  function setSort(next: ProductSort) {
    if (next === sort.value) return
    return push(category.value, next)
  }

  return { categories, featuredAvailable, category, sort, visible, setCategory, setSort }
}
