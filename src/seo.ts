/**
 * src/seo.ts — ZENTRALE SEO-/AEO-KONFIGURATION.
 *
 * ALLE suchmaschinenrelevanten Texte und Daten werden hier gepflegt
 * (Title, Descriptions, Geschäftsdaten, Bedienregion, Angebote). Daraus
 * werden gespeist:
 *  - die Meta-/OG-Tags in `index.html` (Platzhalter `__SEO_*__`, ersetzt durch
 *    das Vite-Plugin in `vite.config.ts` für Dev und `scripts/prerender.mjs`
 *    pro Route beim Build)
 *  - das JSON-LD (LocalBusiness, WebSite, FAQPage) im prerendered HTML
 *  - die `sitemap.xml`
 *
 * FAQ-Inhalte liegen NICHT hier, sondern in `src/content/faq.ts` (eine Quelle
 * für UI + Schema); diese Datei importiert sie nur.
 *
 * ACHTUNG: Nur Relative Imports und kein React in dieser Datei — sie wird aus
 * `vite.config.ts` (Node-Kontext, ohne `@`-Alias) geladen.
 */
import { FAQ_ENTRIES, faqPlainText } from './content/faq';

export const SEO = {
  siteName: 'Zum Wohl Mobil',
  /** Production-Domain ohne Slash am Ende. */
  domain: 'https://zumwohlmobil.de',
  /** Share-Bild (root-relativ); wird für OG/Twitter absolut gemacht. */
  ogImage: '/First_page.jpeg',
  logo: '/Logo.svg',

  /**
   * Geschäftsdaten — MÜSSEN exakt mit dem Impressum übereinstimmen (NAP).
   * Bei Änderungen im Impressum hier synchron mitziehen.
   */
  business: {
    owner: 'Claire Turi',
    streetAddress: 'Helenenstraße 38',
    postalCode: '90419',
    /** Basis/Heimatstadt — Anker der lokalen SEO-Strategie. */
    city: 'Nürnberg',
    country: 'DE',
    /** Internationale Schreibweise (E.164) für schema.org. */
    phone: '+49 177 4471833',
    email: 'zumwohlmobil@gmail.com',
    instagram: 'https://www.instagram.com/zumwohlmobil/',
    priceRange: '€€',
    /**
     * Primäre Bedienregion („Nürnberg first“): Städte der Metropolregion,
     * in denen die Anfahrt bis 50 km inklusive ist.
     */
    areaServedCities: ['Nürnberg', 'Fürth', 'Erlangen', 'Schwabach'],
    /** Sekundär: deutschlandweit buchbar, Anfahrt ab 51 km kostenpflichtig. */
    areaServedCountry: 'Deutschland',
    areaServedNote:
      'Anfahrt bis 50 km inklusive; jeder weitere Kilometer 3,00 €. Deutschlandweit auf Anfrage.'
  },

  /**
   * Pauschalpreise (Kleinunternehmerin § 19 UStG — niemals „inkl. MwSt.“
   * schreiben!). Gleiche Werte wie die PricingTierCards in App.tsx; bei
   * Preisänderungen BEIDE Stellen aktualisieren.
   */
  offers: [
    { guests: 'bis 30 Personen', price: '250.00' },
    { guests: 'bis 60 Personen', price: '400.00' },
    { guests: 'bis 90 Personen', price: '550.00' }
  ]
} as const;

export interface RouteSeo {
  /** Routenpfad, z. B. `/impressum` */
  path: string;
  title: string;
  description: string;
}

/**
 * Meta-Daten pro Route. Strategie „Nürnberg first, Deutschland möglich“:
 * Startseite auf lokale Suchbegriffe optimiert („Mobile Bar mieten Nürnberg“),
 * Anlass-Keywords (Hochzeiten, Geburtstage, Firmenfeiern) in der Description.
 */
export const ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    title: 'Mobile Bar mieten Nürnberg | Zum Wohl Mobil – Aperol Spritz Bar',
    description:
      'Mobile Aperol Spritz Bar aus Nürnberg für Hochzeiten, Geburtstage & Firmenfeiern – ' +
      'in Franken und ganz Deutschland. Wagenmiete, Deko & Getränke als Pauschale – ' +
      'jetzt unverbindlich anfragen.'
  },
  {
    path: '/impressum',
    title: 'Impressum – Zum Wohl Mobil',
    description:
      'Impressum und Anbieterkennzeichnung von Zum Wohl Mobil, der mobilen Aperol Spritz Bar aus Nürnberg.'
  },
  {
    path: '/datenschutz',
    title: 'Datenschutzerklärung – Zum Wohl Mobil',
    description:
      'Datenschutzerklärung der Website zumwohlmobil.de – Informationen zur Verarbeitung personenbezogener Daten.'
  },
  {
    path: '/agb',
    title: 'AGB – Zum Wohl Mobil',
    description:
      'Allgemeine Geschäftsbedingungen von Zum Wohl Mobil, der mobilen Aperol Spritz Bar aus Nürnberg.'
  }
];

export interface ResolvedRouteSeo extends RouteSeo {
  /** Absolute URL für canonical/og:url. */
  canonical: string;
  /** Absolutes OG-Bild. */
  ogImage: string;
}

export function resolveRouteSeo(path: string): ResolvedRouteSeo {
  const route = ROUTE_SEO.find((r) => r.path === path) ?? ROUTE_SEO[0];
  return {
    ...route,
    canonical: `${SEO.domain}${route.path === '/' ? '/' : route.path}`,
    ogImage: `${SEO.domain}${SEO.ogImage}`
  };
}

/** Alle prerendernden Pfade (Reihenfolge = sitemap-Reihenfolge). */
export const ROUTE_PATHS: string[] = ROUTE_SEO.map((r) => r.path);

/* ------------------------------------------------------------------ */
/* JSON-LD (strukturierte Daten für Such- & AI-Antwortmaschinen)        */
/* ------------------------------------------------------------------ */

function buildWebSiteLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.domain}/#website`,
    name: SEO.siteName,
    url: `${SEO.domain}/`,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SEO.domain}/#business` }
  };
}

function buildLocalBusinessLd(): Record<string, unknown> {
  const b = SEO.business;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO.domain}/#business`,
    name: SEO.siteName,
    description: resolveRouteSeo('/').description,
    url: `${SEO.domain}/`,
    image: `${SEO.domain}${SEO.ogImage}`,
    logo: `${SEO.domain}${SEO.logo}`,
    telephone: b.phone,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.streetAddress,
      postalCode: b.postalCode,
      addressLocality: b.city,
      addressCountry: b.country
    },
    priceRange: b.priceRange,
    areaServed: [
      ...b.areaServedCities.map((city) => ({ '@type': 'City', name: city })),
      { '@type': 'Country', name: b.areaServedCountry }
    ],
    sameAs: [b.instagram],
    knowsAbout: [
      'Mobile Bar mieten',
      'Aperol Spritz Bar',
      'Hochzeit',
      'Geburtstagsfeier',
      'Firmenfeier',
      'Sommerfest',
      'Event Getränke'
    ],
    makesOffer: SEO.offers.map((offer) => ({
      '@type': 'Offer',
      name: `Getränkepauschale ${offer.guests}`,
      description:
        'Pauschalpreis für das gesamte Fest: ein Getränk pro Person (Aperol Spritz & ' +
        'Aperol-Kreationen, auch alkoholfrei), Selbstbedienungsbar inkl. Aufbau und Abbau, ' +
        'Wagenmiete & Dekoration. ' +
        SEO.business.areaServedNote,
      price: offer.price,
      priceCurrency: 'EUR',
      url: `${SEO.domain}/#preise`,
      availability: 'https://schema.org/InStock'
    })),
    founder: { '@type': 'Person', name: b.owner }
  };
}

function buildFaqLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SEO.domain}/#faq`,
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqPlainText(entry.answer)
      }
    }))
  };
}

/**
 * JSON-LD-Blöcke pro Route. Nur die Startseite trägt das volle Programm
 * (WebSite + LocalBusiness + FAQPage); Rechtstexte bleiben clean.
 */
export function buildJsonLd(path: string): Record<string, unknown>[] | null {
  if (path !== '/') return null;
  return [buildWebSiteLd(), buildLocalBusinessLd(), buildFaqLd()];
}

/* ------------------------------------------------------------------ */
/* sitemap.xml                                                          */
/* ------------------------------------------------------------------ */

const SITEMAP_PRIORITY: Record<string, string> = {
  '/': '1.0',
  '/impressum': '0.3',
  '/datenschutz': '0.3',
  '/agb': '0.3'
};

export function buildSitemapXml(
  lastmod: string = new Date().toISOString().slice(0, 10)
): string {
  const urls = ROUTE_SEO.map((route) => {
    const loc = `${SEO.domain}${route.path === '/' ? '/' : route.path}`;
    const priority = SITEMAP_PRIORITY[route.path] ?? '0.5';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
