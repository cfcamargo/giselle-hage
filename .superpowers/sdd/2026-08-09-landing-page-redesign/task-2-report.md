# Task 2 — Editorial Design System and Reduced Motion Foundation

## Status

Implemented the editorial token foundation and motion-safety composables described in `task-2-brief.md`.

## TDD evidence

### RED

1. Added `tests/unit/useReducedMotion.spec.ts` for the initial media-query value. `npm test -- tests/unit/useReducedMotion.spec.ts` failed because `composables/useReducedMotion.ts` did not exist.
2. Reworked the reduced-motion tests to independently cover a later media-query change, removed the initial implementation, and reran the focused test. It again failed for the expected missing-module reason.
3. Added `tests/unit/useGsapContext.spec.ts` for cleanup on Vue unmount. `npm test -- tests/unit/useGsapContext.spec.ts` failed because `composables/useGsapContext.ts` did not exist.
4. Added the reduced-motion animation-skip test, removed the initial GSAP composable, and reran its focused test. It failed for the expected missing-module reason.

### GREEN

1. Implemented the minimal shared `matchMedia` ref and listener; the reduced-motion focused suite passed with 2 tests.
2. Implemented the mounted-only GSAP import/context and synchronously registered unmount cleanup; the GSAP focused suite passed with 2 tests.
3. Independent review identified an async import/unmount race. Added a regression test that unmounts before the mocked import resolves; it failed because an animation context was created after unmount. Added an unmount guard after the import; the GSAP focused suite then passed with 3 tests.

## Changed files

- `assets/css/main.css` — editorial palette/font variables, global body/focus treatment, smooth-scroll defaults, and CSS reduced-motion fallback.
- `tailwind.config.js` — semantic editorial colors, display/sans font families, responsive display/headline/eyebrow scales, and legacy aliases mapped to the new palette.
- `composables/useReducedMotion.ts` — shared readonly preference ref updated through `matchMedia`.
- `composables/useGsapContext.ts` — lazy client-side GSAP context setup, reduced-motion skip, race-safe unmount handling, and automatic `revert()` on component unmount.
- `tests/unit/useReducedMotion.spec.ts` — initial and change-event behavior.
- `tests/unit/useGsapContext.spec.ts` — lifecycle cleanup, reduced-motion animation suppression, and unmount-before-import race protection.

## Verification

- `npm test -- tests/unit/useReducedMotion.spec.ts` — passed, 2 tests.
- `npm test -- tests/unit/useGsapContext.spec.ts` — passed, 3 tests after the async-unmount regression fix.
- `npm test` — passed, 4 files and 8 tests.
- `npm test -- tests/unit/useReducedMotion.spec.ts && npm run build` — passed; Nuxt client, server, and Nitro builds completed with exit code 0.
- `git diff --check` — passed before final commit.

Known pre-existing tooling warnings during Vitest/build: unsupported native Vite config-loader notice, outdated Browserslist data, npm `.npmrc` keys, and Node `fs.Stats` deprecation. None are introduced by this task and none fail the commands.

## Author self-review

- All required CSS variables are present: ivory, plum, champagne, ink, display font, and sans font.
- `useReducedMotion()` returns Vue's readonly wrapper around one module-scoped ref and reacts to browser preference changes.
- `useGsapContext()` declares `context` outside `onMounted` and registers `onBeforeUnmount(() => context?.revert())` synchronously in setup, preventing the lifecycle-registration error.
- A post-import unmount guard prevents a late GSAP context from escaping cleanup if the component is removed during the lazy import.
- The tests catch realistic regressions: inverted preference reads, absent change-state updates, removed unmount cleanup, ignored reduced-motion preference, and the async import/unmount race.
- The custom font variables use fallbacks; loading a specific hosted font remains intentionally outside Task 2.

## Fix Round 1 — reduced-motion listener teardown

### Root cause

`useReducedMotion()` held a module-scoped `MediaQueryList` and registered its `change` listener once, but did not associate that listener with the lifecycle of Vue consumers. Therefore, the listener survived after every component using the composable had unmounted.

### RED

Added `removes the media-query listener after the last consumer unmounts` to `tests/unit/useReducedMotion.spec.ts`. It mounts two consumers, verifies unmounting the first keeps the listener, then expects `removeEventListener('change', listener)` after the second unmount. The focused command failed as expected with zero calls to `removeEventListener`.

### GREEN

Added a module-scoped consumer count in `composables/useReducedMotion.ts`. A Vue component consumer increments it and registers `onBeforeUnmount`; the final consumer removes the exact `change` listener and releases the `MediaQueryList`. The same listener remains shared while at least one consumer is mounted.

### Verification

- `npm test -- tests/unit/useReducedMotion.spec.ts` — RED: 1 failed / 2 passed; failure was the missing `removeEventListener` call.
- `npm test -- tests/unit/useReducedMotion.spec.ts tests/unit/useGsapContext.spec.ts` — GREEN: 2 files, 6 tests passed.

## Fix Round 2 — scope-owned reduced-motion subscriptions

### Root cause

The Fix Round 1 counter was based on `getCurrentInstance()`. Calls made outside a component were not represented in the counter, so a subsequent component teardown could remove their shared listener. During render, `getCurrentInstance()` can expose a rendering instance while lifecycle registration has no active component setup context, producing a Vue warning and an unreleased count.

### RED

1. Extended the non-component preference test to assert that an unscoped call reads the current preference without calling `addEventListener`; it failed because the module installed a listener.
2. Added a caller-outside-scope → component mount/unmount scenario. It failed because the unscoped call retained the shared listener before the component lifecycle began.
3. Added a render-time invocation scenario. It failed with Vue's `onBeforeUnmount is called when there is no active component instance` warning.

### GREEN

`useReducedMotion()` now checks `getCurrentScope()`. Unscoped callers receive a readonly snapshot ref with the current media-query value and do not retain a listener. Active Vue scopes share the reactive module ref, acquire the listener, and release it through `onScopeDispose` when the final scope ends. `useGsapContext()` remains a scoped setup consumer and therefore retains its reactive behavior.

### Verification

- `npm test -- tests/unit/useReducedMotion.spec.ts` — RED: 3 failures, including listener installation for an unscoped call and the invalid render-time lifecycle warning.
- `npm test -- tests/unit/useReducedMotion.spec.ts tests/unit/useGsapContext.spec.ts` — GREEN: 2 files, 8 tests passed.
