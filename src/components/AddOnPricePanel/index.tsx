import React from 'react';

export type AddOnPriceItem = {
  id?: string;
  label: string;
  description?: string;
  price: string;
  unit?: string;
};

export type AddOnPricePanelProps = {
  heading: string;
  description?: string;
  items?: AddOnPriceItem[];
  footnote?: string;
  children?: React.ReactNode;
  className?: string;
};

export function AddOnPricePanel({
  heading,
  description,
  items,
  footnote,
  children,
  className = ''
}: AddOnPricePanelProps) {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`w-full rounded-2xl border border-[#d9e3d4] bg-[#f1f5ee] p-6 md:p-8 ${className}`}>
      
      <header className="mb-4">
        <h3
          id={headingId}
          className="text-lg font-semibold tracking-tight text-[#2f3d2c] md:text-xl">
          
          {heading}
        </h3>
        {description &&
        <p className="mt-1 text-sm leading-relaxed text-[#5b6b56]">
            {description}
          </p>
        }
      </header>

      {items && items.length > 0 &&
      <ul className="divide-y divide-[#d9e3d4]">
          {items.map((item, i) =>
        <li
          key={item.id ?? `${item.label}-${i}`}
          className="flex items-start justify-between gap-4 py-3">
          
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#2f3d2c] md:text-base">
                  {item.label}
                </p>
                {item.description &&
            <p className="mt-0.5 text-sm text-[#5b6b56]">
                    {item.description}
                  </p>
            }
              </div>
              <p className="shrink-0 text-right text-sm font-semibold text-[#2f3d2c] md:text-base">
                {item.price}
                {item.unit &&
            <span className="ml-1 text-xs font-normal text-[#5b6b56]">
                    {item.unit}
                  </span>
            }
              </p>
            </li>
        )}
        </ul>
      }

      {children && <div className="divide-y divide-[#d9e3d4]">{children}</div>}

      {footnote &&
      <p className="mt-4 border-t border-[#d9e3d4] pt-4 text-xs text-[#6f7d6a]">
          {footnote}
        </p>
      }
    </section>);

}