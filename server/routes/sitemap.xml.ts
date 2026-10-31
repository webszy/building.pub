import { siteBrand, sitePages } from '../../shared/site'

export default defineEventHandler((event) => {
  const origin = siteBrand.canonicalOrigin
  const urls = [sitePages.home.path, sitePages.products.path, sitePages.categories.path, sitePages.about.path]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url>
    <loc>${origin}${path === '/' ? '/' : path}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>
`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
