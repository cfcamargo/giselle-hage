import { computed } from 'vue'
import { landingContent } from '~/data/landing'
import type { WhatsAppSource } from '~/types/landing'

export function useWhatsApp() {
  const { message, phone } = landingContent.contact.whatsapp
  const href = computed(() => `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`)

  function openWhatsApp(source: WhatsAppSource) {
    if (!import.meta.client) return

    window.dispatchEvent(new CustomEvent('whatsapp:click', { detail: { source } }))
    window.open(href.value, '_blank', 'noopener,noreferrer')
  }

  return { message, href, openWhatsApp }
}
