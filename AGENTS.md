# AGENTS.md — Zum Wohl Mobil (zumwohlmobil.de)

Persistent guidance for every agent session working in this repository.
German-language single-page marketing site for a mobile Aperol Spritz bar
rental business ("Zum Wohl Mobil", Claire & Haider).

- Live: https://zumwohlmobil.de — Netlify, auto-deploy from `main` of
  `github.com/shehjar/website-zwm`. Branches/PRs get Netlify preview deploys.
- Stack: Vite 5 + React 18 + TypeScript, Tailwind CSS 3 (CSS-variable theme in
  `src/index.css`), framer-motion, lucide-react, react-router-dom.
- Form backend: FormSubmit.co → zumwohlmobil@gmail.com (activated; no server code).

## Structure

- `src/App.tsx` — home page sections + all content constants (`NAV_LINKS`,
  `DRINKS`, `FAQ_ITEMS`, `TESTIMONIALS`, `SHOW_TESTIMONIALS`).
- `src/pages/` — routed pages: home lives in App.tsx; legal pages
  (`ImpressumPage`, `DatenschutzPage`, `AgbPage`) share `LegalPage` layout.
- `src/components/` — design system (Pill*, watercolor/botanical decorations,
  carousel, form fields). `src/components/index.ts` is AUTO-GENERATED — never
  hand-edit; component maps for assets live in `BotanicalDecoration` /
  `WatercolorBlot` (WebP files in `public/`).
- `public/` — static assets, referenced by root-relative URLs (`/images/…`).
- Routing: `src/main.tsx` (BrowserRouter); 404 catch-all via `public/_redirects`
  (`/* → /404.html 404`, branded German page);
  build config in `netlify.toml`, Node pinned by `.nvmrc`.

## Conventions

- Import project modules via the `@/` alias (`@/components/Foo`), not deep
  relative paths.
- Copy is **German**, warm and personal, du-form ("dein Fest"). Keep Umlaute
  and typographic quotes consistent with existing text. See Language policy.
- Design tokens are CSS variables (`src/index.css`); Tailwind theme maps onto
  them (`tailwind.config.js`). Do not hardcode palette colors in components
  except where existing components already do (PillButton). The mobile-menu
  palette uses RGB-channel vars (`--menu-*`) mapped via
  `rgb(var(--menu-*) / <alpha-value>)` so opacity modifiers (`text-menu-text/70`)
  work — follow that pattern for any new token that needs alpha.
- Components: small, single-purpose, JSDoc on props; `twMerge` for class
  merging; lucide-react for icons.
- Responsive rule: interactive elements must wrap or shrink at narrow
  viewports. No `whitespace-nowrap` on user-facing long copy; fixed heights
  only as `min-h-*` plus vertical padding; spot-check new UI at ~360px width.
  The global `overflow-x: clip` guard clips overflow instead of scrolling —
  over-wide elements are silently cut off, so width-safety must be designed in.
- Commits: imperative subject in **English**, conventional prefix (`feat:`,
  `fix:`, `chore:`, `perf:`, `docs:`), body explains why. One logical change
  per commit.

## Language policy — one rule, no exceptions

> **Anything a website visitor sees → German. Everything else → English.**

Litmus test: would Claire see it on zumwohlmobil.de (page, Google result,
AI answer, share preview)? Yes → German. No → English.

| Artifact | Language |
|---|---|
| Website copy: components, `App.tsx` content, hero, FAQ answers, legal pages | 🇩🇪 German |
| `src/seo.ts` values: titles/descriptions, JSON-LD text (`knowsAbout`, offer descriptions), `src/content/faq.ts` answers | 🇩🇪 German (they render in search results / AI answers — they ARE website content) |
| Conversation with the owner | 🇬🇧 English |
| `AGENTS.md`, `OWNER_TODO.md` | 🇬🇧 English (German proper nouns/data kept where the owner must type them into German services, e.g. addresses, „Eventagentur") |
| Commit messages, PR titles/bodies, branch names | 🇬🇧 English |
| Code comments, JSDoc, console/error messages in scripts | 🇬🇧 English |
| Variable/file names | 🇬🇧 English (content *values* like route names unchanged) |

Never mix: a comment describing German copy is written in English; a string
that renders on the site is never translated to English.

## Release rules — do not violate

- `SHOW_TESTIMONIALS` in `src/App.tsx` stays `false` until the owner supplies
  real guest quotes. Invented reviews are a legal risk (UWG).
- Legal pages status (since 2026-10-25): **Datenschutzerklärung is LIVE**
  (final eRecht24 text, owner-provided, published with corrections: Netlify
  clause instead of Webflow, Kontaktformular/FormSubmit section added,
  analytics teaser removed, Google-Fonts section added). **Impressum is
  LIVE** (final eRecht24 text, owner-provided, published 2026-11-21 with
  owner-approved corrections: § 19 UStG note kept instead of the generator's
  placeholder USt-IdNr — Claire has no VAT ID; phone confirmed as
  0177 4471833, displayed +49 (0) 177 4471833; Telefax line dropped; e-mail
  double-dot typo fixed). **AGB is LIVE** (owner-provided PDF text,
  published 2026-11-21 with owner-approved corrections: §10 liability
  wording fixed — the draft made the customer liable for the provider's
  own damages; §3 typo fixed. HTML-only, no PDF download: the source PDF
  contains an outdated phone number). All legal pages are final;
  `PlaceholderNotice` was removed from `LegalPage.tsx`.
- When self-hosting the fonts (backlog), DELETE the Google-Fonts section
  (section 5) in `src/pages/DatenschutzPage.tsx` in the same change.
- No new third-party CDNs/scripts (fonts, analytics, embeds, hotlinked images)
  without also updating `src/pages/DatenschutzPage.tsx`. Self-host instead
  where possible.
- `index.html` meta tags must never reference third-party placeholders
  (e.g. bolt.new) again.
- Pricing copy rule: Zum Wohl Mobil is a **Kleinunternehmerin (§ 19 UStG)**.
  Never state or re-add "inkl. MwSt." or any VAT-inclusive claim anywhere
  (site copy, price PDFs, future pages). Prices are Pauschalpreise; the
  § 19 UStG note lives in the Impressum only (section "Umsatzsteuer").
- `.env` is gitignored and currently unused — never commit secrets or keys.

## Verification checklist — run before every commit/merge

1. `npm run typecheck`
2. `npm run lint` — 0 errors required (warnings tolerated)
3. `npm run build`
4. Asset audit: every root-relative asset URL referenced in `dist/`
   (js/css/html) must exist in `dist/` (build only catches code errors, NOT
   missing `public/` files).
5. Prerender check: `dist/index.html` contains real content (e.g.
   `grep -c Nürnberg dist/index.html` > 0), `dist/{impressum,datenschutz,agb}.html`
   exist with route-specific `<title>`, and `dist/sitemap.xml` is present.
6. `npm run dev` smoke test: `/`, `/impressum`, `/datenschutz`, `/agb`,
   pricing-tier → form prefill, form submit flow.

## Deploy loop

- Work on a branch → `gh pr create` → review the Netlify preview URL →
  merge (squash) to `main` → Netlify auto-deploys production.
- Never deploy manually to production; never edit Netlify UI settings that
  contradict `netlify.toml` (build `npm run build`, publish `dist`, Node 20).
- Rollback: Netlify UI "restore previous deploy", or `git revert` + push.

## SEO & AEO (live since 2026-11-15)

- **Central config: `src/seo.ts`** — ALL search-relevant strings live there
  (per-route title/description in `ROUTE_SEO`, business/NAP data, `areaServed`
  cities, offers, `priceRange`, JSON-LD builders, sitemap builder). Change SEO
  copy or schema data **only** in this file, never hardcoded in components or
  `index.html`. Keep NAP data in sync with the Impressum.
- **FAQ single source: `src/content/faq.ts`** — plain-text answers with
  `**fett**` markers. `src/content/faqRender.tsx` → JSX (`<strong>`) for the
  UI; `faqPlainText()` → text for the FAQPage JSON-LD. Edit FAQ content only
  here; UI, schema, and prerendered HTML all follow. No React import in
  `faq.ts` (it is loaded from `vite.config.ts` via `seo.ts`).
- **Prerendering (SSG):** `npm run build` = `vite build && node
  scripts/prerender.mjs`. The script SSR-builds `src/entry-server.tsx`
  (react-dom/server + StaticRouter, shared route table `src/routes.tsx`),
  renders `/`, `/impressum`, `/datenschutz`, `/agb` into static HTML in
  `dist/` (incl. JSON-LD injection at `<!--app-head-->` and app HTML at
  `<!--app-html-->`), and writes `dist/sitemap.xml`. Reason: AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot) don't execute JS — without prerendering
  they'd see an empty page.
- **`index.html` uses `__SEO_*__` tokens** (title/description/canonical/
  og:image). Dev replaces them via the `seo-tokens-dev` Vite plugin
  (`vite.config.ts`, home route); build replaces them per route in
  `scripts/prerender.mjs` (shared logic: `scripts/seo-tokens.mjs`). Do not
  hardcode meta values in `index.html`.
- **Hydration:** `src/main.tsx` uses `hydrateRoot` when `#root` contains
  prerendered markup, else `createRoot`. Any new component must render
  deterministically on server and client (no `window`/`document` during
  render, no build-time-frozen dates — see the `today` effect pattern in
  `InquiryForm`).
- **`public/robots.txt`** allows all crawlers incl. AI bots and references
  the sitemap. Keep AI crawlers allowed (AEO strategy).
- **Local strategy:** „Nürnberg first, Deutschland möglich" — primary
  keywords target the metro region (Nürnberg/Fürth/Erlangen/Schwabach,
  Anfahrt ≤50 km), deutschlandweit is the secondary message (3,00 €/km).
- **Flat prerendered files:** legal routes are written as
  `dist/<route>.html` (not directories) so Netlify serves `/impressum`
  directly via Pretty URLs (200, no 301 to `/impressum/`) — served URL and
  canonical stay identical. `_redirects` only catches true misses.
- **Owner to-dos (off-site, biggest local lead lever):** create the Google
  Business Profile (service-area business; categories Bar/Eventagentur/
  Caterer; NAP identical to Impressum; postcard verification takes days),
  register in Google Search Console (+ submit sitemap), then 2–3 event
  directories/citations. **These are tracked in `OWNER_TODO.md`** — the
  async communication file between owner and agents; update it whenever
  owner tasks arise or are completed, and check it for open owner answers.

## Performance guardrails

- `public/` is ~3.7 MB after the 2026-11 perf pass (was ~6 MB). Keep it small.
- Decoration artwork is alpha-WebP at ≤2× display size; never re-introduce
  multi-MB SVGs or unreferenced images. Compress new images and size them to
  their display dimensions (≤2×), prefer WebP.
- Fonts are SELF-HOSTED (`public/fonts/`, latin + latin-ext woff2; Jost is one
  variable file). No Google-Fonts CDN call — the Datenschutz "Plugins und
  Tools" section was removed accordingly. Critical faces are preloaded in
  `index.html`. To add a weight/style, download the woff2 and add an
  `@font-face` block in `src/index.css` (keep the `unicode-range`).
- Photos: hero + carousel are WebP; carousel thumbnails live in
  `public/carousel-images/thumbs/` (referenced via `thumbSrc`). The hero JPEG
  `First_page.jpeg` is kept ONLY for `og:image` (social previews prefer JPEG).
- framer-motion: use `m` (not `motion`) under the `LazyMotion strict` +
  `MotionConfig reducedMotion="user"` wrapper in `src/routes.tsx`. Simple
  entrance fades should be CSS keyframes (see `card-in`), not framer — CSS
  stays visible in prerendered HTML without JS. Honor `prefers-reduced-motion`
  (global CSS guard + MotionConfig already cover this).
- Local Node is 18; some dev deps warn (EBADENGINE) but build fine. Netlify
  builds with Node 20 via `.nvmrc`/`netlify.toml`.

## Owner-approved backlog (unprioritized, pick one at a time)

- Real 1200×630 share image for OG/Twitter (meta tags themselves are live;
  currently the portrait hero `First_page.jpeg` is used as `og:image` —
  crops awkwardly in some share previews).
- Google Search Console einrichten + Sitemap einreichen; Google Business
  Profile anlegen (siehe SEO & AEO, Owner to-dos).
- Cookie-less analytics (Plausible/Umami) + privacy-policy line.
- Content: real testimonials (then flip the flag); all legal texts
  (Datenschutz, Impressum, AGB) are live.

## Done in the 2026-11-21 perf/best-practices pass (for reference)

- Self-hosted fonts (removed Google-Fonts CDN + Datenschutz section 5).
- Hero/carousel → WebP, carousel thumbnails, deleted ~1.15 MB unreferenced PNGs.
- Hero LCP preload (home only) + `fetchpriority`; width/height on hero/carousel.
- framer-motion → `LazyMotion`/`m`; RecipeCard fade → CSS (visible without JS).
- `prefers-reduced-motion` support; Netlify immutable cache + security headers.
- Form honeypot (`_honey`); footer year hydration fix; stable `useActiveSection`
  ids; pure carousel scroll updater; mobile-menu palette → CSS tokens; branded
  `404.html`; sitemap `lastmod` from git; German error copy in TornEdgeImage.
