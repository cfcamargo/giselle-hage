import { createError, defineEventHandler, setResponseHeader } from 'h3'
import { resolveSiteOrigin } from '~/utils/siteOrigin'

export default defineEventHandler((event) => {
  const siteOrigin = resolveSiteOrigin(useRuntimeConfig().public.siteUrl)
  if (!siteOrigin) throw createError({ statusCode: 404, statusMessage: 'Not Found' })

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteOrigin}</loc></url>\n</urlset>\n`
})
