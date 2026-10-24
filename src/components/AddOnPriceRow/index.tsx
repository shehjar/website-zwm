import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface AddOnPriceRowProps {
  /** Add-on name, e.g. "Extra Gläser" */
  name: React.ReactNode;
  /** Price value. Numbers are formatted as EUR (de-DE); strings render as-is. */
  price: number | string;
  /** Optional secondary line under the name (e.g. "pro Gast") */
  description?: React.ReactNode;
  /** Optional suffix after the price, e.g. "/ Stunde" */
  unit?: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Visually emphasize the row (e.g. selected / total) */
  highlighted?: boolean;
  /** Show a bottom divider */
  divider?: boolean;
  className?: string;
}

export function formatPrice(price: number | string): string {
  if (typeof price === 'string') return price;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

export function AddOnPriceRow({
  name,
  price,
  description,
  unit,
  icon,
  highlighted = false,
  divider = true,
  className
}: AddOnPriceRowProps) {
  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between gap-4 py-3',
        divider && 'border-b border-neutral-200 last:border-b-0',
        className
      )}>
      
      <div className="flex min-w-0 items-center gap-3">
        {icon &&
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700"
          aria-hidden="true">
          
            {icon}
          </span>
        }
        <div className="min-w-0">
          <p
            className={twMerge(
              'truncate text-sm text-neutral-800 sm:text-base',
              highlighted && 'font-semibold text-neutral-900'
            )}>
            
            {name}
          </p>
          {description &&
          <p className="truncate text-xs text-neutral-500 sm:text-sm">
              {description}
            </p>
          }
        </div>
      </div>
      <p
        className={twMerge(
          'shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-neutral-900 sm:text-base',
          highlighted && 'font-semibold'
        )}>
        
        {formatPrice(price)}
        {unit &&
        <span className="ml-1 text-xs font-normal text-neutral-500">
            {unit}
          </span>
        }
      </p>
    </div>);

}