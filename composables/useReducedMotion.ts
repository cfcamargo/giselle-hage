import { getCurrentInstance, onBeforeUnmount, readonly, ref } from 'vue'

const reducedMotion = ref(false)
let mediaQuery: MediaQueryList | undefined
let consumerCount = 0

function updatePreference(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches
}

function removeMediaQueryListener() {
  if (consumerCount || !mediaQuery) return

  mediaQuery.removeEventListener('change', updatePreference)
  mediaQuery = undefined
}

export function useReducedMotion() {
  if (import.meta.client && !mediaQuery && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updatePreference)
  }

  if (getCurrentInstance()) {
    consumerCount += 1
    onBeforeUnmount(() => {
      consumerCount -= 1
      removeMediaQueryListener()
    })
  }

  return readonly(reducedMotion)
}
