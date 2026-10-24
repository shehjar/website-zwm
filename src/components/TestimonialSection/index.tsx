import React, { useId } from 'react';
import { QuoteIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

export type Testimonial = {
  quote: string;
  name: string;
  occasion: string;
};

export interface TestimonialSectionProps {
  items: Testimonial[];
  className?: string;
}

export function TestimonialSection({ items, className = '' }: TestimonialSectionProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`w-full ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          id={headingId}
          title="Das sagen unsere Gäste"
          size="lg"
          divider
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-[32px] border border-wash bg-surface px-6 py-7 text-center"
            >
              <QuoteIcon aria-hidden="true" className="mx-auto h-6 w-6 text-primary" strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-text">{item.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-text">
                  {item.occasion}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
