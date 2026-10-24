import React from 'react';

export type PriceNoteProps = {
  /** Note segments, joined with a middle dot separator. */
  items?: string[];
  /** Alternative to items: custom content. Overrides items when provided. */
  children?: React.ReactNode;
  /** Separator between items. */
  separator?: string;
  /** Text alignment. */
  align?: 'center' | 'left';
  className?: string;
};

export function PriceNote({
  items = [
  'Standort: Nürnberg – Anfahrt inklusive bis 50 km, danach 3,00 € pro km',
  'Alle Preise inkl. MwSt.'],

  children,
  separator = '·',
  align = 'center',
  className = ''
}: PriceNoteProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <p
      className={`mt-8 max-w-3xl px-4 text-sm leading-relaxed text-gray-500 ${alignClass} ${className}`}>
      
      {children ??
      items.map((item, i) =>
      <React.Fragment key={`${item}-${i}`}>
            {i > 0 &&
        <span aria-hidden="true" className="mx-2 text-gray-400">
                {separator}
              </span>
        }
            <span className="inline-block">{item}</span>
          </React.Fragment>
      )}
    </p>);

}