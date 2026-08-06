# RUYA Interiors

Marketing site for an interior design & build studio. Next.js 16 (App Router) ·
React 19 · Tailwind CSS v4 · Motion 13 · Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

## Structure

```
app/
  layout.js          fonts (Cormorant Garamond + Jost), metadata, viewport
  globals.css        design tokens, custom utilities, keyframes
  page.js            composes every section
components/
  providers/
    SmoothScroll.jsx inertia scrolling + eased anchor links
  ui/
    Preloader.jsx    counter intro + four-panel curtain wipe
    Cursor.jsx       dot + lagging ring, grows on hover, reads data-cursor
    ScrollProgress.jsx
    AnimatedText.jsx word-by-word mask reveal
    Reveal.jsx       scroll-into-view wrapper (up/left/scale/blur/…)
    Magnetic.jsx     pointer-attracted buttons
    Counter.jsx      count-up on first view
  sections/          Navbar, Hero, Marquee, About, Services, Portfolio,
                     Process, Testimonials, CTA, Contact, Footer
hooks/
  useMediaQuery.js   useSyncExternalStore-based, SSR safe
lib/
  data.js            all copy, imagery and lists
```

## Editing content

Everything a non-developer would change lives in [lib/data.js](lib/data.js) —
services, projects, process steps, testimonials, FAQ and contact details. The
`u()` helper builds Unsplash URLs; replace those with your own photography and
the whole site updates.

Images are served through `next/image`. If you host your own, drop them in
`public/` and reference them as `/photo.jpg`. If you keep remote URLs, add the
hostname to `images.remotePatterns` in [next.config.mjs](next.config.mjs).

## Project galleries

Each entry in `PROJECTS` ([lib/data.js](lib/data.js)) carries its own set of
room photos. Clicking a card in the Work section opens a viewer with the main
shot, a thumbnail strip, arrow/swipe navigation and the project's specs.

```js
{
  slug: "amber-court",              // stable key
  title, category, location, year,
  size: "tall" | "wide" | "normal", // shape in the grid
  area, config, duration,           // shown in the viewer's spec row
  scope: [...],                     // pill tags
  summary: "...",                   // paragraph in the viewer
  cover: u("..."),                  // grid thumbnail
  gallery: [{ src: u("..."), room: "Living room" }, ...],
}
```

Add or remove `gallery` entries freely — the counter, thumbnails and the photo
badge on the card all derive from the array length. The stock photos are
placeholders and a few repeat across projects; swap in your own shoot and that
goes away.

## The contact form is not wired up

[components/sections/Contact.jsx](components/sections/Contact.jsx) validates
input and plays the success state, but `onSubmit` currently just waits 1.4s —
it does not send anything. Point it at a route handler, Formspree, Resend or
your CRM before going live.

## Palette — Sage & Bone

Defined once as `@theme` tokens in [app/globals.css](app/globals.css); change
them there and the whole site follows.

| Token | Hex | Role |
|---|---|---|
| `bone` | `#F4F2EC` | page base |
| `sage-pale` | `#E3E2D6` | alternating sections |
| `forest` | `#2C332C` | text, dark bands, footer |
| `sage` | `#7E8C6A` | primary accent |
| `walnut` | `#8A6244` | secondary accent |

Section rhythm alternates bone → sage-pale → forest so the page never reads as
one flat wall of colour.

> **Layering rule:** never give a section both a background colour and a
> `-z-*` child. A negative z-index paints the child *behind* its own parent's
> background, which silently hides full-bleed photos. Use `z-0` for background
> layers and `z-10` for content instead — see [CTA.jsx](components/sections/CTA.jsx).

## Animation notes

- **Scroll-linked** — hero background parallax, the CTA window, the process
  rail fill and the footer wordmark all use `useScroll` + `useTransform`.
- **Scroll-triggered** — `Reveal` and `AnimatedText` use `whileInView` with a
  negative viewport margin so things fire slightly before they hit the edge.
- **Pointer** — `Magnetic`, the hero's floating card and the custom cursor all
  check `pointerType === "mouse"`, so touch devices are unaffected.
- **Reduced motion** — `prefers-reduced-motion` is honoured in three places:
  a global CSS override, `useReducedMotion()` guards in each component, and
  `SmoothScroll` / `Preloader` skipping entirely. Worth testing before launch.

## Checking responsiveness

```bash
npm run audit:responsive          # needs Chrome + the dev server running
CHROME_PATH=/path/to/chrome npm run audit:responsive   # non-macOS
```

Drives your installed Chrome across nine viewports (320 → 1920), and for each
one reports horizontal overflow, whether the page actually scrolls, any console
errors, and whether the project viewer fits. Screenshots land in
`.audit-shots/`. Exits non-zero on failure, so it works in CI.

> **The stopped-Lenis trap:** a *stopped* Lenis still calls `preventDefault()`
> on every wheel and touch event, which freezes scrolling inside modals and any
> other nested scroll container. Lenis is created with `allowNestedScroll: true`
> and every nested scroller is marked `data-lenis-prevent`. Any new scrollable
> element that appears while the page is locked needs that attribute too.

> **The `min-width: auto` trap:** grid and flex children refuse to shrink below
> their content's intrinsic width. A horizontally-scrolling strip inside one
> will force its whole parent wider than the screen instead of scrolling. Any
> grid/flex child holding a scroller or long text needs `min-w-0` — that single
> missing class is what broke the project viewer on phones.

## Responsive

Type scales with `clamp()` via the `text-display`, `text-h2`, `text-h3`,
`text-eyebrow` and `text-body` utilities, so there are no fixed font sizes to
chase across breakpoints. `container-x` handles gutters and `section-y` keeps
vertical rhythm consistent (and tight) across every section. Layouts are single
column below `sm`, two up at `sm`, and settle into their full grid at `lg`.
The hero is a split grid — copy left, photo right — that collapses to a single
column below `lg`, so it stays dense rather than leaving a tall empty band.
