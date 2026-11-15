/** Typ-Deklaration für scripts/seo-tokens.mjs (reines Node-ESM). */
export declare const SEO_TOKENS: {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
};

export declare function applySeoTokens(
  html: string,
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  }
): string;
