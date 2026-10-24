import React from 'react';

export type ProcessStepVariant = 'card' | 'compact' | 'circle';

const SANS_FONT = "var(--font-body, 'Jost'), 'Jost', ui-sans-serif, system-ui, sans-serif";

export interface ProcessStepProps {
  /** Step number displayed in the badge (e.g. 1, 2, 3) */
  step: number;
  /** Short step title, e.g. "Anfrage stellen" */
  title: string;
  /** Supporting description of the step */
  description?: React.ReactNode;
  /** Optional icon rendered next to the title (e.g. a lucide-react icon) */
  icon?: React.ReactNode;
  /** Visual style: bordered card, compact inline row, or soft icon circle */
  variant?: ProcessStepVariant;
  /** Emphasizes the step (e.g. current/active step; Aperol fill in circle variant) */
  highlighted?: boolean;
  /** Shows a connector to the next step (compact: vertical line; circle: dotted path) */
  showConnector?: boolean;
  className?: string;
}

export function ProcessStep({
  step,
  title,
  description,
  icon,
  variant = 'card',
  highlighted = false,
  showConnector = false,
  className = ''
}: ProcessStepProps) {
  const badge =
  <span
    aria-hidden="true"
    className={[
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-semibold tabular-nums',
    highlighted ?
    'bg-stone-900 text-white' :
    'border border-stone-300 bg-white text-stone-900'].
    join(' ')}>
    
      {step}
    </span>;


  if (variant === 'circle') {
    return (
      <li
        className={['group relative flex list-none flex-col items-center text-center', className].join(' ')}
        style={{ fontFamily: SANS_FONT }}>
        
        <div className="relative flex w-full justify-center">
          <span
            aria-hidden="true"
            className={[
            'relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-[1.04] md:h-24 md:w-24',
            '[&>svg]:h-8 [&>svg]:w-8 md:[&>svg]:h-9 md:[&>svg]:w-9',
            highlighted ?
            'bg-accent text-white' :
            'border border-[#5F7363] bg-card text-[#5F7363]'].
            join(' ')}>
            
            {icon}
          </span>
          {showConnector &&
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(50%_+_3.5rem)] top-1/2 hidden w-[calc(100%_-_5.5rem)] -translate-y-1/2 border-t-2 border-dotted border-[#5F7363] opacity-50 md:block" />

          }
        </div>
        <span
          aria-hidden="true"
          className="mt-5 text-xs font-normal uppercase tracking-[0.2em] text-[#8A9A8C]">
          
          Schritt {step}
        </span>
        <h3 className="mt-1.5 text-base font-medium uppercase tracking-[0.14em] text-[#5F7363] md:text-lg">
          <span className="sr-only">Schritt {step}: </span>
          {title}
        </h3>
        {description &&
        <div className="mt-2 max-w-[16rem] text-sm font-light leading-relaxed text-[#5F7363] md:text-base">
            {description}
          </div>
        }
        {showConnector &&
        <span
          aria-hidden="true"
          className="mt-6 h-10 border-l-2 border-dotted border-[#5F7363] opacity-50 md:hidden" />

        }
      </li>);

  }

  if (variant === 'compact') {
    return (
      <li className={['relative flex gap-4 list-none', className].join(' ')}>
        <div className="flex flex-col items-center">
          {badge}
          {showConnector &&
          <span aria-hidden="true" className="mt-2 w-px flex-1 bg-stone-200" />
          }
        </div>
        <div className={showConnector ? 'pb-8' : ''}>
          <h3 className="flex items-center gap-2 pt-2 text-base font-semibold text-stone-900">
            <span className="sr-only">Schritt {step}: </span>
            {icon && <span className="text-stone-500">{icon}</span>}
            {title}
          </h3>
          {description &&
          <div className="mt-1 text-sm leading-relaxed text-stone-600">{description}</div>
          }
        </div>
      </li>);

  }

  return (
    <li
      className={[
      'flex h-full list-none flex-col gap-4 rounded-2xl border p-6 transition-shadow',
      highlighted ?
      'border-stone-900 bg-stone-50 shadow-sm' :
      'border-stone-200 bg-white hover:shadow-sm',
      className].
      join(' ')}>
      
      <div className="flex items-center justify-between">
        {badge}
        {icon && <span className="text-stone-400">{icon}</span>}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-stone-900">
          <span className="sr-only">Schritt {step}: </span>
          {title}
        </h3>
        {description &&
        <div className="mt-2 text-sm leading-relaxed text-stone-600">{description}</div>
        }
      </div>
    </li>);

}