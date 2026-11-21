/**
 * src/seo.ts — CENTRAL SEO/AEO CONFIGURATION.
 *
 * ALL search-relevant strings and data are maintained here (titles,
 * descriptions, business data, service area, offers). They feed:
 *  - the meta/OG tags in `index.html` (`__SEO_*__` placeholders, replaced
 *    by the Vite plugin in `vite.config.ts` for dev and by
 *    `scripts/prerender.mjs` per route at build time)
 *  - the JSON-LD (LocalBusiness, WebSite, FAQPage) in the prerendered HTML
 *  - the `sitemap.xml`
 *
 * FAQ content does NOT live here but in `src/content/faq.ts` (one source
 * for UI + schema); this file only imports it.
 *
 * NOTE: relative imports only and no React in this file — it is loaded
 * from `vite.config.ts` (Node context, without the `@` alias).
 * NOTE: the *values* (titles, descriptions, schema text) are website
 * content and stay German per the language policy (see AGENTS.md); only
 * comments/docs are English.
 */
import { FAQ_ENTRIES, faqPlainText } from './content/faq';

export const SEO = {
  siteName: 'Zum Wohl Mobil',
  /** Production domain without a trailing slash. */
  domain: 'https://zumwohlmobil.de',
  /** Share image (root-relative); made absolute for OG/Twitter. */
  ogImage: '/First_page.jpeg',
  /** Hero photo (root-relative) — preloaded on the home route for LCP.
      WebP for display; the JPEG above stays for social share previews. */
  heroImage: '/First_page.webp',
  logo: '/Logo.svg',

  /**
   * Business data — MUST match the Impressum exactly (NAP consistency).
   * When the Impressum changes, update here in the same commit.
   */
  business: {
    owner: 'Claire Turi',
    streetAddress: 'Helenenstraße 38',
    postalCode: '90419',
    /** Base/home city — anchor of the local SEO strategy. */
    city: 'Nürnberg',
    country: 'DE',
    /** International format (E.164) for schema.org. */
    phone: '+49 177 4471833',
    email: 'zumwohlmobil@gmail.com',
    instagram: 'https://www.instagram.com/zumwohlmobil/',
    priceRange: '€€',
    /**
     * Primary service area („Nürnberg first“): metro-region cities where
     * travel up to 50 km is included.
     */
    areaServedCities: ['Nürnberg', 'Fürth', 'Erlangen', 'Schwabach'],
    /** Secondary: bookable Germany-wide, travel beyond 51 km charged. */
    areaServedCountry: 'Deutschland',
    areaServedNote:
      'Anfahrt bis 50 km inklusive; jeder weitere Kilometer 3,00 €. Deutschlandweit auf Anfrage.'
  },

  /**
   * Flat-rate prices (small business under § 19 UStG — never write
   * „inkl. MwSt.“!). Same values as the PricingTierCards in App.tsx; when
   * prices change, update BOTH places.
   */
  offers: [
    { guests: 'bis 30 Personen', price: '250.00' },
    { guests: 'bis 60 Personen', price: '400.00' },
    { guests: 'bis 90 Personen', price: '550.00' }
  ]
} as const;

export interface RouteSeo {
  /** Route path, e.g. `/impressum` */
  path: string;
  title: string;
  description: string;
}

/**
 * Meta data per route. Strategy „Nürnberg first, Deutschland möglich“:
 * home page optimized for local search terms („Mobile Bar mieten Nürnberg“),
 * occasion keywords (Hochzeiten, Geburtstage, Firmenfeiern) in the
 * description. Values are German website content — do not translate.
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
  /** Absolute URL for canonical/og:url. */
  canonical: string;
  /** Absolute OG image URL. */
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

/** All paths to prerender (order = sitemap order). */
export const ROUTE_PATHS: string[] = ROUTE_SEO.map((r) => r.path);

/* ------------------------------------------------------------------ */
/* JSON-LD (structured data for search & AI answer engines)               */
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
 * JSON-LD blocks per route. Only the home page carries the full set
 * (WebSite + LocalBusiness + FAQPage); legal pages stay clean.
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
