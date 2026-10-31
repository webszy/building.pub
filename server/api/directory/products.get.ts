import { listDirectoryProducts } from '../../services/directory-products'
import type { DirectoryCatalog } from '../../../shared/directory-products'

export default defineEventHandler(async (): Promise<DirectoryCatalog> => {
  return listDirectoryProducts()
})
