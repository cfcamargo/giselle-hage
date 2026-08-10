export type WhatsAppSource =
  | 'header' | 'hero' | 'botox' | 'preenchimento' | 'peeling'
  | 'results' | 'faq' | 'location' | 'closing' | 'floating' | 'footer'

export interface Treatment {
  slug: 'botox' | 'preenchimento' | 'peeling'
  eyebrow: string
  title: string
  summary: string
  image: string
  alt: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Credential {
  label: string
  value: string
}
