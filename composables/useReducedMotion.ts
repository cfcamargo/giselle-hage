import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'

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

function currentPreference() {
  if (import.meta.client && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  return false
}

function startMediaQueryListener() {
  if (import.meta.client && !mediaQuery && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updatePreference)
  }
}

export function useReducedMotion() {
  if (!getCurrentScope()) {
    return readonly(ref(currentPreference()))
  }

  startMediaQueryListener()
  consumerCount += 1
  onScopeDispose(() => {
    consumerCount -= 1
    removeMediaQueryListener()
  })

  return readonly(reducedMotion)
}
