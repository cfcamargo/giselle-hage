export function resolveSiteOrigin(configuredOrigin: unknown): string | undefined {
  if (typeof configuredOrigin !== 'string' || !configuredOrigin.trim()) return undefined

  try {
    const url = new URL(configuredOrigin)
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) return undefined

    return `${url.origin}/`
  } catch {
    return undefined
  }
}
