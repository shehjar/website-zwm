import React from 'react';

export interface ScriptBannerProps {
  /** Emotional one-liner in Allura, e.g. "Aperol Spritz – unsere Spezialität" */
  text: string;
  /** Optional small uppercase Jost line above the script text */
  eyebrow?: string;
  /** Append a small heart after the text */
  heart?: boolean;
  /** Render the script text as a heading (for screen readers) */
  as?: 'p' | 'h2' | 'h3';
  className?: string;
}

export function ScriptBanner({
  text,
  eyebrow,
  heart = false,
  as: Tag = 'p',
  className = ''
}: ScriptBannerProps) {
  return (
    <section
      className={`relative w-full bg-card px-5 py-12 text-center md:py-16 ${
      className}`}>
      
      {eyebrow &&
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-text">{eyebrow}</p>
      }
      <Tag
        className="mx-auto max-w-4xl text-5xl leading-tight text-text md:text-6xl"
        style={{ fontFamily: 'Allura, cursive', fontWeight: 400 }}>
        
        {text}
        {heart &&
        <span aria-hidden="true" className="ml-3 inline-block align-middle text-3xl text-accent">
            ♡
          </span>
        }
      </Tag>
    </section>);

}