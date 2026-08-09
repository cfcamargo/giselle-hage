import { computed } from 'vue'
import type { WhatsAppSource } from '~/types/landing'

const phone = '5567981269482'
const message = 'Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.'

export function useWhatsApp() {
  const href = computed(() => `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`)

  function openWhatsApp(source: WhatsAppSource) {
    if (!import.meta.client) return

    window.dispatchEvent(new CustomEvent('whatsapp:click', { detail: { source } }))
    window.open(href.value, '_blank', 'noopener,noreferrer')
  }

  return { message, href, openWhatsApp }
}
