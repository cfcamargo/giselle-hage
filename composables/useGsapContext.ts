import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

export function useGsapContext(
  scope: Ref<HTMLElement | null>,
  setup: (gsap: typeof import('gsap').gsap) => void | (() => void)
) {
  const reduced = useReducedMotion()
  let context: gsap.Context | undefined
  let cleanup: (() => void) | undefined
  let stopReducedWatcher: (() => void) | undefined
  let buildVersion = 0
  let unmounted = false

  function revertMotion() {
    buildVersion += 1
    context?.revert()
    context = undefined
    cleanup?.()
    cleanup = undefined
  }

  async function buildMotion() {
    if (reduced.value || !scope.value) return
    const version = ++buildVersion

    const { gsap } = await import('gsap')
    if (unmounted || reduced.value || !scope.value || version !== buildVersion) return

    context = gsap.context(() => {
      cleanup = setup(gsap) || undefined
    }, scope.value)
  }

  onMounted(() => {
    stopReducedWatcher = watch(reduced, (isReduced) => {
      if (isReduced) revertMotion()
      else void buildMotion()
    }, { flush: 'sync' })
    void buildMotion()
  })

  onBeforeUnmount(() => {
    unmounted = true
    stopReducedWatcher?.()
    stopReducedWatcher = undefined
    revertMotion()
  })
}
