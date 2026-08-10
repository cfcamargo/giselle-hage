import { afterEach, describe, expect, it, vi } from 'vitest'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { landingContent } from '../../data/landing'

const canonicalMessage = 'Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.'
const canonicalHref = 'https://api.whatsapp.com/send?phone=5567981269482&text=Ol%C3%A1%2C%20Dra.%20Giselle!%20Conheci%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20entender%20qual%20tratamento%20%C3%A9%20mais%20indicado%20para%20mim.'

describe('useWhatsApp', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('builds the canonical prefilled WhatsApp URL', () => {
    const { href, message } = useWhatsApp()

    expect(message).toBe(canonicalMessage)
    expect(message).toBe(landingContent.contact.whatsapp.message)
    expect(href.value).toBe(canonicalHref)
    expect(href.value).toContain(`phone=${landingContent.contact.whatsapp.phone}`)
    expect(decodeURIComponent(href.value)).toBe(`https://api.whatsapp.com/send?phone=5567981269482&text=${canonicalMessage}`)
  })

  it('dispatches a source-aware analytics event before opening', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent')
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    useWhatsApp().openWhatsApp('hero')

    const clickEvent = dispatch.mock.calls[0]?.[0] as CustomEvent<{ source: string }>

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'whatsapp:click' }))
    expect(clickEvent.detail).toEqual({ source: 'hero' })
    expect(open).toHaveBeenCalledOnce()
  })

  it('accepts footer as an analytics source', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent')
    vi.spyOn(window, 'open').mockImplementation(() => null)

    useWhatsApp().openWhatsApp('footer')

    const clickEvent = dispatch.mock.calls[0]?.[0] as CustomEvent<{ source: string }>
    expect(clickEvent.detail).toEqual({ source: 'footer' })
  })
})
