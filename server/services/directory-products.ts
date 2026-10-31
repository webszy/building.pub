import { buildDirectoryCatalog, type DirectoryCatalog } from '../../shared/directory-products'

// v0 curated catalog. Replace this function with a D1 query when directory
// tables exist. Keep the DirectoryCatalog shape stable for the page.
export async function listDirectoryProducts(): Promise<DirectoryCatalog> {
  return buildDirectoryCatalog()
}
