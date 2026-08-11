# Results Section Rebuild Design

## Goal

Recreate the landing page results section from scratch so it feels cinematic, premium, and stable across desktop and mobile. The section must keep the clinical caution already present in the copy and avoid the current scroll bugs.

## Decision

Rebuild the section as one self-contained `ResultsSection.vue`. Do not reuse `ResultsDesktopGallery.vue` or `ResultsMobileGallery.vue`. The new section owns its markup, state, measurement, scroll listeners, controls, progress indicator, and responsive behavior.

## Core Interaction

Desktop uses a cinematic horizontal gallery driven by normal page scroll:

- Result cards sit side by side in a horizontal track.
- A sticky viewport keeps the gallery visible while the user scrolls through the section.
- Page scroll progress translates the track horizontally.
- The card closest to the viewport focus becomes the protagonist with scale, opacity, shadow, and image contrast.
- Neighboring cards remain visible with smaller scale and lower emphasis.
- No `window.scrollTo` is called from scroll-driven state updates.
- No GSAP `ScrollTrigger` is used in this section.

Mobile uses a native horizontal scroll-snap gallery:

- No sticky/pinned scroll.
- Cards scroll horizontally with snap points.
- The active card is derived from the nearest card on native gallery scroll.
- Buttons and arrow keys move between cards with `scrollIntoView`.
- Controls, captions, and disclaimers never overlap.

Reduced-motion mode uses the mobile-style behavior at all widths:

- No sticky cinematic sequence.
- Native horizontal scroll-snap remains available.
- Transitions are minimized.

## Layout

The section keeps the semantic content order:

1. Eyebrow.
2. Heading.
3. Clinical context copy.
4. Results gallery.
5. Navigation and result counter.
6. Disclaimer.
7. WhatsApp CTA.

Desktop visual style:

- Dark editorial background matching the premium landing direction.
- Header compact enough that the images carry the section.
- Gallery viewport clips only within the results section.
- Cards use stable aspect ratio and fixed responsive widths.
- Progress line reflects the section scroll progress.

Mobile visual style:

- Single visible card with a hint of the next card.
- Horizontal snap.
- Clear controls below the gallery.
- CTA and disclaimer remain below the cards.

## Data

Use `landingContent.results` without changing image paths, category values, or alt text. Category labels remain:

- `botox`: `Toxina botulínica`
- `preenchimento`: `Preenchimento facial`

## Accessibility

- The section keeps `id="resultados"` and `aria-labelledby="results-title"`.
- The gallery remains a focusable list with list items.
- Each card exposes `aria-label` and `aria-current` for the active result.
- Left and right arrow keys work when the gallery is focused.
- Buttons remain real buttons with `aria-disabled`, not disabled, so focus is preserved.
- The counter is a live status region.
- The disclaimer keeps `id="results-disclaimer"`.
- Motion is not the only state: active card, counter, and progress all represent state.

## Failure Modes To Avoid

- Do not call `window.scrollTo` while reacting to page scroll.
- Do not use GSAP `ScrollTrigger` in this section.
- Do not create separate desktop/mobile components for this rebuild.
- Do not allow result cards to use `position: fixed`.
- Do not set positive `z-index` on the whole section unless a contained stacking context is required.
- Do not let the gallery overflow on top of treatment, philosophy, or footer sections.
- Do not create vertical dead space on mobile.

## Testing

Update focused tests around `ResultsSection.vue`.

Required automated checks:

- The rendered section contains one results component implementation, not `ResultsDesktopGallery` or `ResultsMobileGallery`.
- The gallery exposes stable hooks: `data-results-stage`, `data-results-pin`, `data-results-track`, `data-result-card`, and `data-results-progress`.
- The component source does not contain `ScrollTrigger`.
- The component source does not contain `window.scrollTo`.
- Desktop source contains `position: sticky`.
- Mobile source contains `scroll-snap-type`.
- Buttons update active result and preserve edge focus behavior.
- Keyboard arrow navigation updates active result.
- WhatsApp CTA still emits the `results` source.
- Server-rendered HTML still contains the disclaimer, result image paths, and WhatsApp href.

Manual checks after implementation:

- Desktop cards move horizontally as the page scrolls.
- The active card zooms/emphasizes without page jumps.
- The section does not appear over adjacent sections.
- The page scroll does not jump back to the top.
- Mobile uses native horizontal scrolling and remains compact.
- Reduced-motion disables the sticky cinematic behavior.
