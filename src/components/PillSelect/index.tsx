import React, { forwardRef, useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type PillSelectOption = {
  value: string;
  label: string;
};

export type PillSelectSize = 'sm' | 'md' | 'lg';

export interface PillSelectProps extends
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Visible label above the select */
  label?: string;
  /** Hide the label visually (kept for screen readers) */
  hideLabel?: boolean;
  /** Placeholder shown as first, disabled option */
  placeholder?: string;
  /** Options; defaults to the event types */
  options?: PillSelectOption[];
  /** Size of the field */
  size?: PillSelectSize;
  /** `pill` = fully rounded, `rounded` = 16px corners (Canva form style) */
  shape?: 'pill' | 'rounded';
  /** Helper text below the field */
  helperText?: string;
  /** Error message; puts the field in an error state */
  error?: string;
  /** Class names for the outer wrapper */
  wrapperClassName?: string;
}

export const EVENT_TYPE_OPTIONS: PillSelectOption[] = [
{ value: 'hochzeit', label: 'Hochzeit' },
{ value: 'geburtstag', label: 'Geburtstag' },
{ value: 'firmenfeier', label: 'Firmenfeier' },
{ value: 'jubilaeum', label: 'Jubiläum' },
{ value: 'sonstiges', label: 'Sonstiges' }];


const sizeClasses: Record<PillSelectSize, string> = {
  sm: 'h-9 pr-10 text-sm',
  md: 'h-12 pr-11 text-base',
  lg: 'h-14 pr-12 text-lg'
};

const iconPosition: Record<PillSelectSize, string> = {
  sm: 'right-3 h-4 w-4',
  md: 'right-4 h-5 w-5',
  lg: 'right-5 h-5 w-5'
};

export const PillSelect = forwardRef<HTMLSelectElement, PillSelectProps>(
  function PillSelect(
  {
    label = 'Art der Veranstaltung',
    hideLabel = false,
    placeholder = 'Anlass wählen',
    options = EVENT_TYPE_OPTIONS,
    size = 'md',
    shape = 'pill',
    helperText,
    error,
    disabled,
    required,
    id,
    className,
    wrapperClassName,
    value,
    defaultValue,
    ...rest
  },
  ref)
  {
    const generatedId = useId();
    const selectId = id ?? `pill-select-${generatedId}`;
    const describedById = error || helperText ? `${selectId}-desc` : undefined;
    const isControlled = value !== undefined;
    const isEmpty = isControlled ? value === '' : false;
    const indent = shape === 'pill' ? 'pl-5' : 'pl-1';

    return (
      <div className={twMerge('flex w-full flex-col gap-1.5', wrapperClassName)}>
        {label &&
        <label
          htmlFor={selectId}
          className={twMerge(indent, 'text-sm text-text', hideLabel && 'sr-only')}>
          
            {label}
            {required &&
          <>
                <span aria-hidden="true">*</span>
                <span className="sr-only"> (Pflichtfeld)</span>
              </>
          }
          </label>
        }
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedById}
            value={value}
            defaultValue={
            isControlled ? undefined : defaultValue ?? (placeholder ? '' : undefined)
            }
            className={twMerge(
              'peer w-full cursor-pointer appearance-none border bg-surface transition-colors duration-150',
              shape === 'pill' ? 'rounded-full pl-5' : 'rounded-2xl pl-4',
              'text-text',
              'border-muted-text hover:border-primary',
              'focus:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-wash',
              'disabled:cursor-not-allowed disabled:bg-wash disabled:text-muted-text',
              error && 'border-red-700 hover:border-red-700 focus-visible:border-red-700',
              isEmpty && 'text-muted-text',
              sizeClasses[size],
              className
            )}
            {...rest}>
            
            {placeholder &&
            <option value="" disabled>
                {placeholder}
              </option>
            }
            {options.map((option) =>
            <option key={option.value} value={option.value} className="text-text">
                {option.label}
              </option>
            )}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className={twMerge(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 text-primary peer-disabled:text-muted-text',
              iconPosition[size]
            )} />
          
        </div>
        {(error || helperText) &&
        <p
          id={describedById}
          role={error ? 'alert' : undefined}
          className={twMerge(indent, 'text-sm', error ? 'text-red-700' : 'text-muted-text')}>
          
            {error ?? helperText}
          </p>
        }
      </div>);

  }
);