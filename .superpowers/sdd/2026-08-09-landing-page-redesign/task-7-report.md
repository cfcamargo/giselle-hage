# Task 7 Report — FAQ, Location and Closing Conversion

## Delivered

- Added an SSR-visible FAQ accordion with unique ARIA relationships, independent open states, Motion height/opacity transitions, reduced-motion support, and the `faq` WhatsApp source.
- Added the location section with the verified address before the lazy titled map, Portuguese map parameters, and regional wording for Ponta Porã, nearby cities, and the Pedro Juan Caballero border region without claiming a Paraguay location.
- Added location, closing, and floating conversion CTAs using the canonical `useWhatsApp()` href and exact `location`, `closing`, and `floating` sources.
- Added an IntersectionObserver-powered floating CTA with an accessible no-JS SSR fallback, desktop label, safe-area spacing, and observer cleanup.
- Added the compact site footer with current year, professional name, CRO, Instagram, WhatsApp, and address.
- Composed all five sections after `AboutSection` and before the retained legacy composition; removed the duplicate legacy `contato` ID and removed `OwnerFooter` from the rendered layout.
- Corrected the retained legacy map embed to Portuguese and added its missing title.

## TDD evidence

- RED: `npm test -- tests/unit/FaqSection.spec.ts` failed because `FaqSection.vue` did not exist.
- GREEN: `npm test -- tests/unit/FaqSection.spec.ts tests/unit/LandingConversion.spec.ts` — 8/8 passed.
- Focused contract: `npm test -- tests/unit/FaqSection.spec.ts tests/unit/LandingConversion.spec.ts tests/unit/useWhatsApp.spec.ts` — 10/10 passed.

## Verification

- `npm run build` — exit 0.
- `npm test` — the sandbox run executed 54 passing tests but its two Nuxt suites could not query local interfaces (`uv_interface_addresses`). The required rerun outside that restriction passed: 12 files, 59/59 tests.
- `git diff --check` — clean.

## Notes

- The legacy home remains intentionally composed for Task 8.
- Existing dependency/configuration warnings remain unchanged: npm project config deprecations, Vite native config warning, Node `fs.Stats` deprecation, and outdated Browserslist metadata.

## Fix Round 1

- Removed the floating CTA SSR/hydration flash: the interactive link now starts hidden and unfocusable, while a real accessible `<noscript>` WhatsApp link provides the no-JavaScript fallback.
- Added conservative three-target observation for the hero CTA, final closing section, and site footer. The CTA appears only after all targets report that they are outside the viewport; absent APIs or targets keep it safely hidden, and unmount disconnects the observer.
- Added clear `agendamento-final` and `rodape` boundaries so the floating action does not cover the final conversion or footer content.
- Strengthened FAQ SSR/ARIA, observer transitions, missing-target fallback, floating source, no-pulse/safe-area, footer composition, regional wording, and map privacy coverage.
- Tightened both current and retained legacy map embeds to `strict-origin-when-cross-origin`.
- Verification: focused contract 12/12, full suite 61/61, production build exit 0, and `git diff --check` clean.
