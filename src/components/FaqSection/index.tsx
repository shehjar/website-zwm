import React, { useId, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

export interface FaqSectionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqSection({ items, className = '' }: FaqSectionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          title="Häufige Fragen"
          description="Die wichtigsten Antworten auf einen Blick – falls noch etwas offen bleibt, schreib uns einfach."
          size="lg"
          divider
        />
        <div className="mt-12 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border bg-surface transition-colors duration-200 ${
                  isOpen ? 'border-primary' : 'border-wash hover:border-muted-text'
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="text-base font-medium text-text">{item.question}</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm leading-relaxed text-text"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
