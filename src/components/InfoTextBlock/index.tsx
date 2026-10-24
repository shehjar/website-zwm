import React from 'react';

export type InfoItem = {
  /** Optional lucide icon, e.g. <GlassWaterIcon /> */
  icon?: React.ReactNode;
  /** Short bold lead-in */
  title?: string;
  text: React.ReactNode;
};

export interface InfoTextBlockProps {
  /** Uppercase Jost section title */
  title: string;
  /** Optional intro paragraph */
  intro?: React.ReactNode;
  items?: InfoItem[];
  /** Free content (e.g. story paragraphs) rendered after items */
  children?: React.ReactNode;
  /** `card` = pale sage rounded surface, `plain` = no background */
  variant?: 'card' | 'plain';
  as?: 'h2' | 'h3';
  className?: string;
}

export function InfoTextBlock({
  title,
  intro,
  items,
  children,
  variant = 'card',
  as: Heading = 'h2',
  className = ''
}: InfoTextBlockProps) {
  return (
    <section
      className={`w-full ${variant === 'card' ? 'rounded-[32px] bg-card p-8 md:p-12' : ''} ${className}`}>
      
      <Heading className="text-lg font-medium uppercase tracking-[0.18em] text-text md:text-xl">{title}</Heading>
      {intro && <p className="mt-4 max-w-3xl text-base leading-relaxed text-text">{intro}</p>}

      {items && items.length > 0 &&
      <ul className="mt-8 flex flex-col gap-6">
          {items.map((item, i) =>
        <li key={i} className="flex items-start gap-4">
              {item.icon &&
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text ${
            variant === 'card' ? 'bg-surface' : 'bg-wash'} [&_svg]:h-5 [&_svg]:w-5`
            }>
            
                  {item.icon}
                </span>
          }
              <div className="max-w-3xl text-base leading-relaxed text-text">
                {item.title && <p className="font-medium">{item.title}</p>}
                <div>{item.text}</div>
              </div>
            </li>
        )}
        </ul>
      }

      {children && <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-text">{children}</div>}
    </section>);

}