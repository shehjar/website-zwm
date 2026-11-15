/** Type declarations for scripts/seo-tokens.mjs (plain Node ESM). */
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
