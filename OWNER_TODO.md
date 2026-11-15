# OWNER_TODO — Asynchrone Kommunikation zwischen Claire & Agent

Hier stehen die Aufgaben, die **nur die Ownerin** erledigen kann (Konten,
Verifizierungen, Entscheidungen), plus Status-Updates vom Agenten.
Konvention:

- `[ ]` offen · `[x]` erledigt (mit Datum in Klammern)
- Neue Aufgaben werden unter der passenden Rubrik ergänzt, nicht gelöscht;
  erledigte bleiben mit Datum stehen (Verlauf).
- Agenten: Aktualisiert diese Datei, wenn Owner-Aufgaben anfallen oder
  Antworten auf unten stehende Fragen vorliegen.

---

## 🔴 Priorität 1 — Google Business Profile (größter lokaler Lead-Hebel)

Ohne Profil erscheint Zum Wohl Mobil nicht bei Google Maps und im
Local-Pack („mobile Bar Nürnberg") — dort entscheiden sich die meisten
lokalen Buchungen. **Die Verifizierung per Postkarte dauert mehrere Tage —
je früher, desto besser.**

- [ ] Profil anlegen auf https://business.google.com mit:
  - Name: **Zum Wohl Mobil** (exakt so, keine Keyword-Zusätze — sonst
    Risiko einer Sperrung)
  - Kategorie primär: **Eventagentur** (Alternativen: Bar, Cateringservice)
  - Art: **Servicegebiet-Geschäft** (kein Ladenlokal für Kundenverkehr)
  - Adresse: **Helenenstraße 38, 90419 Nürnberg** — MUSS exakt mit dem
    Impressum übereinstimmen (NAP-Konsistenz)
  - Telefon: **01774471833** (wie Impressum)
  - Website: **https://zumwohlmobil.de**
  - Servicegebiet: Nürnberg, Fürth, Erlangen, Schwabach + Umkreis (~50 km);
    Hinweis „deutschlandweit auf Anfrage" in die Beschreibung
- [ ] Verifizierung abschließen (Postkarte/PIN — dauert oft 5–14 Tage)
- [ ] Danach: Fotos hochladen (Wagen, Drinks, Events — dieselben Motive wie
    auf der Website stärken den Wiedererkennungseffekt)
- [ ] Beschreibungstext einfügen (kann vom Agenten geliefert werden —
    einfach hier anfragen)
- [ ] **Agent informieren, sobald Profil live ist** → Link wird dann in
    Footer + `src/seo.ts` (`sameAs`) ergänzt

## 🟡 Priorität 2 — Google Search Console (Sichtbarkeit messen)

- [ ] https://search.google.com/search-console — Property
    **https://zumwohlmobil.de** hinzufügen
- [ ] Verifizierung: empfohlen ist der DNS-Eintrag (Netlify) oder HTML-Tag —
    bei Fragen Agenten fragen; der HTML-Tag-Meta-Ansatz erfordert eine
    Code-Änderung, die der Agent übernimmt
- [ ] Sitemap einreichen: `https://zumwohlmobil.de/sitemap.xml`
- [ ] Nach ~2–4 Wochen: Agent die „Leistung"-Daten zeigen (welche
    Suchbegriffe liefern Impressionen?) → daraus folgen Content-Entscheidungen

## 🟢 Priorität 3 — Später (nach GBP + Search Console)

- [ ] 2–3 Event-Portale/Verzeichnisse eintragen (z. B. eventpeppers,
    Gelbe Seiten, 11880) — immer mit identischen NAP-Daten
- [ ] Erstes echtes Share-Bild 1200×630 px liefern (für WhatsApp/Instagram-
    Linkvorschauen; aktuell wird das Hochformat-Hero-Bild verwendet —
    siehe Backlog in AGENTS.md)
- [ ] Echte Gäste-Testimonials sammeln → `SHOW_TESTIMONIALS` in
    `src/App.tsx` auf `true` (erst dann! erfundene Bewertungen = UWG-Risiko)
- [ ] Finale eRecht24-Texte für Impressum (USt-IdNr. prüfen) + AGB liefern

---

## ❓ Offene Fragen an die Ownerin

*(Agenten tragen hier Fragen ein, die sie nicht selbst entscheiden können.)*

- _(aktuell keine)_

## ✅ Erledigt

- [x] 2026-11-15 — SEO-/AEO-Basis **live auf zumwohlmobil.de** (PR #6,
      squash-merged als 61cefd2, Netlify-Produktivdeploy verifiziert):
      alle Routen servieren prerendered HTML (200, route-spezifische
      Titles), JSON-LD (LocalBusiness/WebSite/FAQPage) parse-fähig,
      robots.txt + sitemap.xml erreichbar, kanonische URLs ohne
      Redirect-Ketten. Konfiguration liegt in `src/seo.ts` und
      `src/content/faq.ts` — Änderungen dort genügen (siehe AGENTS.md →
      „SEO & AEO").
- [x] 2026-11-15 — Entscheidung Region: „Nürnberg first, Deutschland
      möglich" (primär Metropolregion, sekundär deutschlandweit 3,00 €/km).
