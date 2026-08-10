import { defineEventHandler, setResponseHeader } from 'h3'
import { resolveSiteOrigin } from '~/utils/siteOrigin'

export default defineEventHandler((event) => {
  const siteOrigin = resolveSiteOrigin(useRuntimeConfig().public.siteUrl)
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return siteOrigin
    ? `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
})
