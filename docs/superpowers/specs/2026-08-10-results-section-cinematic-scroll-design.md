# Results Section Cinematic Scroll Design

## Goal

Improve the landing page results section so it feels more cinematic, premium, and intentional while preserving the clinical caution already present in the copy.

## Approved Direction

Use a mixed gallery pattern:

- Desktop: a pinned scroll section where result images move horizontally as the user scrolls.
- The active result is the visual protagonist.
- Upcoming results remain partially visible with small offsets, lower emphasis, and a subtle stacked-gallery feeling.
- The experience should feel editorial and calm, not flashy.
- Mobile and reduced-motion modes use a simpler scroll-snap gallery without heavy pinning.

## Layout

The section keeps the existing semantic structure: heading, introduction, gallery, navigation, disclaimer, and WhatsApp CTA.

Desktop layout:

- Use a darker, sophisticated background to contrast with the light montage images.
- Keep the header compact enough that images become the main focus.
- Place the gallery in a wide horizontal track.
- Use a thin progress indicator tied to scroll progress.
- Keep the result counter visible and useful.

Mobile layout:

- Avoid pinned scroll.
- Keep native horizontal scroll with snap points.
- Preserve buttons and keyboard navigation.
- Avoid overlap between captions, controls, and clinical disclaimers.

## Motion

Use GSAP ScrollTrigger only on desktop and only when `prefers-reduced-motion` allows it.

Desktop motion:

- Pin the gallery stage during the result sequence.
- Translate the gallery track horizontally based on scroll progress.
- Scale and brighten the active card.
- Keep neighboring cards slightly smaller and offset to create depth.
- Apply subtle image parallax inside each card.
- Update the progress line and current result as scroll moves.

Fallback motion:

- Existing button navigation continues to work.
- Native scroll synchronization remains available.
- Reduced-motion users see a static scroll-snap gallery.

## Accessibility

- Preserve list semantics and current ARIA labels.
- Keep the gallery keyboard-focusable.
- Left and right arrow keys continue moving between results.
- Navigation buttons remain usable with clear disabled states.
- Avoid motion-only state; the counter and `aria-current` still represent the active item.

## Testing

Run focused unit tests for landing content and any component tests that cover the results gallery.

Manual verification:

- Desktop section pins and releases cleanly.
- Cards do not overlap incoherently.
- Progress indicator and counter match the visible active card.
- Mobile remains usable without pinning.
- Reduced-motion disables cinematic animation.
