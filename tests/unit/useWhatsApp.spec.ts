import { describe, expect, it, vi } from 'vitest'
import { useWhatsApp } from '../../composables/useWhatsApp'

describe('useWhatsApp', () => {
  it('builds the canonical prefilled WhatsApp URL', () => {
    const { href } = useWhatsApp()

    expect(decodeURIComponent(href.value)).toContain('phone=5567981269482')
    expect(decodeURIComponent(href.value)).toContain('Olá, Dra. Giselle! Conheci seu site')
  })

  it('dispatches a source-aware analytics event before opening', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent')
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    useWhatsApp().openWhatsApp('hero')

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'whatsapp:click' }))
    expect(open).toHaveBeenCalledOnce()
  })
})
