import { readonly, ref } from 'vue'

const reducedMotion = ref(false)
let mediaQuery: MediaQueryList | undefined

function updatePreference(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches
}

export function useReducedMotion() {
  if (import.meta.client && !mediaQuery && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updatePreference)
  }

  return readonly(reducedMotion)
}
