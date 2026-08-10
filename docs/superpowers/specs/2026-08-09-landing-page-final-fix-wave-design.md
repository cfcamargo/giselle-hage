# Landing Page Final Fix Wave Design

## Goal

Close the important whole-branch review findings without changing clinical claims or making a broad framework migration.

## Architecture

The page keeps its current Nuxt 3 component structure. Two shared boundaries remove drift: `utils/siteOrigin.ts` is the sole validator for an externally configured HTTPS origin, while `data/landing.ts` is the sole source for address and contact facts. Page SEO and Nitro SEO routes consume the validated origin; visible components, JSON-LD and contact links consume the centralized facts.

Motion remains component-owned. `useGsapContext` observes the shared reduced-motion ref, reverts the current GSAP context immediately when reduced motion starts, and rebuilds it when no-preference returns. About applies the same lifecycle to its ScrollTrigger context. BrandIntro treats a transition to reduced motion as completion, releases its lock/timer/timeline, records the session, and never restarts.

## Dependency policy

`nuxt-swiper` is removed because repository search proves there is no consumer. npm audit fixes are accepted only when they stay within compatible package ranges and the full test/build/generate matrix proves the result. No forced or major framework migration is part of this wave. Every residual advisory is reported with its dependency path and practical exposure; a non-zero audit is not represented as clean.

## SEO behavior

A valid origin is HTTPS, has a hostname, contains no credentials, and is normalized to `/`. With it, the page emits canonical, absolute Open Graph image and absolute structured-data URLs; `/robots.txt` allows crawling and names the absolute sitemap; `/sitemap.xml` lists the homepage. Without it, the page emits `noindex, nofollow`, omits canonical/origin-dependent Open Graph and JSON-LD URL fields, robots disallows crawling, and no production sitemap is prerendered; the server route responds 404.

## Content and conversion behavior

Structured address parts, formatted address, Instagram URL, WhatsApp phone and exact message live in `landingContent`. Footer WhatsApp uses the shared opener with source `footer`, dispatching `whatsapp:click` before opening. The hero primary CTA is exactly `Agende sua avaliação`. Regional copy may mention the Brazil–Paraguay border naturally but must not claim a clinic or attendance in Paraguay.

## Toolchain and typography

The canonical workflow is npm with `package-lock.json`; the stale Yarn v1 lock is removed. Package metadata declares Node 20 or newer and the npm version used by the lock workflow. Because no approved font binaries exist in the repository and runtime network fonts are prohibited, CSS uses system-safe font stacks rather than naming unloaded web fonts.

## Verification

Each behavioral change gets a failing unit, Nuxt SSR/route, or Playwright test before implementation. Final evidence is a fresh full unit suite, typecheck, build, full desktop/mobile E2E, controlled-origin generate with generated-file checks, production audit, and diff check. Public release remains gated by client facts/permissions, the confirmed production origin, and host-native legacy 301 rules.
