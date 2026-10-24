import React from 'react';
import { UserIcon, MessageSquareIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type PricingTier = {
  /** Max guest count for this tier. `null` for the custom/individual tier. */
  guests: number | null;
  /** Display price, e.g. "ab 690 €". Optional for custom tier. */
  price?: string;
};

export type PricingTierCardProps = {
  /** Max guest count. Omit / null for the custom tier. */
  guests?: number | null;
  /** Price string, e.g. "ab 690 €". */
  price?: string;
  /** Renders the "INDIVIDUELLES ANGEBOT" variant. Automatically true when guests is null/undefined. */
  custom?: boolean;
  /** Overrides the top label. Defaults to "BIS {guests} GÄSTE" or "INDIVIDUELLES ANGEBOT". */
  label?: string;
  /** Secondary text for the custom tier shown in place of a price. */
  customHint?: string;
  /** Small line under the price, e.g. "Pauschale für dein Fest". */
  hint?: string;
  /** Visually marks the card as the currently selected tier. */
  selected?: boolean;
  /** Called with the tier when clicked — use to pre-fill the request form. */
  onSelect?: (tier: PricingTier) => void;
  /** If provided, renders as a link (e.g. "#anfrage" or "/anfrage?gaeste=30"). */
  href?: string;
  className?: string;
};

export function PricingTierCard({
  guests = null,
  price,
  custom,
  label,
  customHint = 'Ab 91 Gästen – jetzt anfragen',
  hint,
  selected = false,
  onSelect,
  href,
  className
}: PricingTierCardProps) {
  const isCustom = custom ?? (guests === null || guests === undefined);
  const resolvedLabel = label ?? (isCustom ? 'Individuelles Angebot' : `Bis ${guests} Gäste`);
  const iconChoice = isCustom ?
  'custom' :
  (guests ?? 0) <= 30 ? 'small' :
  (guests ?? 0) <= 60 ? 'medium' : 'large';
  const ariaLabel = isCustom ?
  `${resolvedLabel} – individuelle Anfrage stellen` :
  `${resolvedLabel}${price ? `, ${price}` : ''} – Anfrage für dieses Paket stellen`;

  const handleClick = () => {
    onSelect?.({ guests: isCustom ? null : guests, price });
  };

  const classes = twMerge(
    'group relative flex w-full flex-col items-center rounded-2xl border bg-white px-6 py-8 text-center transition-all duration-200',
    'hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2',
    selected ?
    'border-stone-900 shadow-lg ring-1 ring-stone-900' :
    'border-stone-200 shadow-sm hover:border-stone-400',
    isCustom && !selected && 'bg-stone-50',
    className
  );

  const content =
  <>
      <span
      className={twMerge(
        'flex h-14 w-14 items-center justify-center rounded-full transition-colors',
        selected ?
        'bg-stone-900 text-white' :
        'bg-stone-100 text-stone-700 group-hover:bg-stone-900 group-hover:text-white'
      )}
      aria-hidden="true">
      
        {iconChoice === 'custom' ? (
        <MessageSquareIcon className="h-6 w-6" strokeWidth={1.75} />
        ) : iconChoice === 'small' ? (
        <UserIcon className="h-6 w-6" strokeWidth={1.75} />
        ) : iconChoice === 'medium' ? (
        <span className="relative inline-flex h-6 w-7 items-end justify-center">
          <UserIcon className="absolute left-0 h-5 w-5" strokeWidth={1.75} />
          <UserIcon className="absolute right-0 h-6 w-6" strokeWidth={1.75} />
        </span>
        ) : (
        <span className="relative inline-flex h-6 w-8 items-end justify-center">
          <UserIcon className="absolute left-0 h-4 w-4" strokeWidth={1.75} />
          <UserIcon className="h-5 w-5" strokeWidth={1.75} />
          <UserIcon className="absolute right-0 h-6 w-6" strokeWidth={1.75} />
        </span>
        )}
      </span>
      <span className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
        {resolvedLabel}
      </span>
      <span className="my-5 h-px w-12 bg-stone-300 transition-all group-hover:w-20 group-hover:bg-stone-900" aria-hidden="true" />
      {isCustom ?
    <span className="text-base text-stone-600">{customHint}</span> :

    <>
      <span className="text-3xl font-semibold tracking-tight text-stone-900">{price ?? '—'}</span>
      {hint && <span className="mt-2 text-sm font-light text-stone-600">{hint}</span>}
    </>
    }
      {selected && <span className="sr-only">(ausgewählt)</span>}
    </>;


  if (href) {
    return (
      <a href={href} onClick={handleClick} className={classes} aria-label={ariaLabel} aria-current={selected ? 'true' : undefined}>
        {content}
      </a>);

  }

  return (
    <button type="button" onClick={handleClick} className={classes} aria-label={ariaLabel} aria-pressed={selected}>
      {content}
    </button>);

}