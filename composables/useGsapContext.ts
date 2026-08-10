import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

export function useGsapContext(
  scope: Ref<HTMLElement | null>,
  setup: (gsap: typeof import('gsap').gsap) => void
) {
  const reduced = useReducedMotion()
  let context: gsap.Context | undefined
  let unmounted = false

  onMounted(async () => {
    if (reduced.value || !scope.value) return

    const { gsap } = await import('gsap')
    if (unmounted || !scope.value) return

    context = gsap.context(() => setup(gsap), scope.value)
  })

  onBeforeUnmount(() => {
    unmounted = true
    context?.revert()
  })
}
