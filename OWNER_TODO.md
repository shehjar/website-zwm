# OWNER_TODO — Async communication between the owner and agents

This file tracks the tasks **only the owner can do** (accounts,
verifications, decisions) plus status updates from agents. Conventions:

- `[ ]` open · `[x]` done (with date in parentheses)
- New tasks are added under the matching category, never deleted; completed
  ones stay visible with their date (history).
- Agents: update this file whenever owner tasks arise or are completed, and
  check the open-questions section for pending owner answers.
- Language policy (see AGENTS.md): this file is English; values you must
  type into German services (addresses, category names) stay German.

---

## 🔴 Priority 1 — Google Business Profile (biggest local lead lever)

Without a profile, Zum Wohl Mobil does not appear on Google Maps or in the
Local Pack ("mobile bar Nürnberg") — which is where most local booking
decisions happen. **Postcard verification takes several days — the sooner
you start, the better.**

- [ ] Create the profile at https://business.google.com with:
  - Name: **Zum Wohl Mobil** (exactly this, no keyword additions — risks
    suspension)
  - Primary category: **Eventagentur** (alternatives: Bar, Cateringservice)
  - Type: **service-area business** (no storefront for customer visits)
  - Address: **Helenenstraße 38, 90419 Nürnberg** — MUST match the
    Impressum exactly (NAP consistency)
  - Phone: **01774471833** (as in the Impressum)
  - Website: **https://zumwohlmobil.de**
  - Service area: Nürnberg, Fürth, Erlangen, Schwabach + radius (~50 km);
    mention "deutschlandweit auf Anfrage" in the description
- [ ] Complete verification (postcard/PIN — often takes 5–14 days)
- [ ] Then: upload photos (bar wagon, drinks, events — same motifs as the
    website strengthen recognition)
- [ ] Add a business description (an agent can draft one on request —
    just ask via the questions section below)
- [ ] **Tell the agent once the profile is live** → the link will be added
    to the footer and to `src/seo.ts` (`sameAs`)

## 🟡 Priority 2 — Google Search Console (measure visibility)

- [ ] https://search.google.com/search-console — add the property
    **https://zumwohlmobil.de**
- [ ] Verification: the DNS record (Netlify) or HTML-tag methods are
    recommended — ask the agent if unsure; the HTML-tag approach needs a
    code change which the agent will make
- [ ] Submit the sitemap: `https://zumwohlmobil.de/sitemap.xml`
- [ ] After ~2–4 weeks: show the agent the "Performance" data (which search
    terms produce impressions?) → that drives future content decisions

## 🟢 Priority 3 — Later (after GBP + Search Console)

- [ ] Get listed in 2–3 event directories (e.g. eventpeppers, Gelbe
    Seiten, 11880) — always with identical NAP data
- [ ] Provide a real 1200×630 px share image (for WhatsApp/Instagram link
    previews; the portrait hero image is currently used as `og:image` —
    see the backlog in AGENTS.md)
- [ ] Collect real guest testimonials → flip `SHOW_TESTIMONIALS` in
    `src/App.tsx` to `true` (only then! invented reviews = UWG legal risk)
- [ ] Provide the final eRecht24 texts for Impressum (check USt-IdNr) + AGB
- [ ] Fix two typos in the Canva price list and re-export (replace
    `public/Preisliste.pdf`, keep it compressed — current file is 235 KB):
    „INDUVIDUELLES ANGEBOT" → „INDIVIDUELLES ANGEBOT";
    „Fahrtkosten im den Getränkepauschalen" → „Fahrtkosten in den
    Getränkepauschalen". Tell the agent once the new export is in place.
- [ ] Provide photos of the decor add-ons (Regalleiter, Obstkisten,
    Palette) — WebP, ≤2× display size — so the „Weitere Dekoelemente"
    section can show real images. The price list PDF promises pictures
    on the homepage; until then the section links to the events gallery.

---

## ❓ Open questions to the owner

*(Agents add questions here that they cannot decide on their own.)*

- _(none at the moment)_

## ✅ Done

- [x] 2026-11-21 — New price list **live on zumwohlmobil.de** (PR #10,
      squash-merged as 86e22d6, Netlify production deploy verified):
      download serves the new 2-page `Preisliste.pdf` (235 KB,
      Ghostscript-compressed Canva export); old PDF URL 301-redirects
      to it. Pricing section now shows „Weitere Dekoelemente"
      (Regalleiter 20 €, Obstkisten 15 € im 3er-Set, Palette 10 € mit
      Beschriftung) and the wagon-only note (120 €, Deko +30 €); new
      FAQ entry in UI + FAQPage JSON-LD. All prices unchanged. Open
      owner tasks above: fix the two Canva typos + provide decor photos.
- [x] 2026-11-15 — Language policy live (PR #8, merged as 7757068):
      visitor-facing content stays German, all dev artifacts (docs,
      comments, commits, OWNER_TODO) are English. Rule is permanent in
      AGENTS.md → "Language policy". Production verified unchanged
      (bundle byte-identical, all German content intact).
- [x] 2026-11-15 — SEO/AEO foundation **live on zumwohlmobil.de** (PR #6,
      squash-merged as 61cefd2, Netlify production deploy verified):
      all routes serve prerendered HTML (200, route-specific titles),
      JSON-LD (LocalBusiness/WebSite/FAQPage) parses cleanly, robots.txt +
      sitemap.xml reachable, canonical URLs without redirect chains.
      Configuration lives in `src/seo.ts` and `src/content/faq.ts` —
      editing there is enough (see AGENTS.md → "SEO & AEO").
- [x] 2026-11-15 — Region decision: "Nürnberg first, Deutschland möglich"
      (primary: metro region; secondary: Germany-wide at 3,00 €/km).
