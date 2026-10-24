import React, { useId, useRef } from 'react';
import { CalendarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type PillDateInputSize = 'sm' | 'md' | 'lg';

export interface PillDateInputProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value'> {
  /** Visible label above the field */
  label?: string;
  /** Value in ISO format (yyyy-mm-dd) */
  value?: string;
  /** Called with the new ISO date string (or empty string) */
  onChange?: (value: string) => void;
  /** Helper text below the field */
  hint?: string;
  /** Error message — puts the field in an error state */
  error?: string;
  size?: PillDateInputSize;
  /** `pill` = fully rounded, `rounded` = 16px corners (Canva form style) */
  shape?: 'pill' | 'rounded';
  /** Hide the label visually but keep it for screen readers */
  hideLabel?: boolean;
  containerClassName?: string;
}

const sizeClasses: Record<PillDateInputSize, string> = {
  sm: 'h-10 pl-10 pr-4 text-sm',
  md: 'h-12 pl-12 pr-5 text-base',
  lg: 'h-14 pl-14 pr-6 text-lg'
};

const iconPosition: Record<PillDateInputSize, string> = {
  sm: 'left-3.5 h-4 w-4',
  md: 'left-4 h-5 w-5',
  lg: 'left-5 h-5 w-5'
};

export const PillDateInput = React.forwardRef<HTMLInputElement, PillDateInputProps>(
  function PillDateInput(
  {
    label = 'Wunschtermin',
    value,
    onChange,
    hint,
    error,
    size = 'md',
    shape = 'pill',
    hideLabel = false,
    disabled,
    required,
    id,
    className,
    containerClassName,
    min,
    ...rest
  },
  ref)
  {
    const autoId = useId();
    const inputId = id ?? `pill-date-${autoId}`;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const innerRef = useRef<HTMLInputElement | null>(null);
    const isEmpty = !value;
    const indent = shape === 'pill' ? 'pl-5' : 'pl-1';

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);else
      if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const openPicker = () => {
      const el = innerRef.current;
      if (!el || disabled) return;
      try {
        el.showPicker?.();
      } catch {
        el.focus();
      }
    };

    const describedBy = error ? errorId : hint ? hintId : undefined;

    return (
      <div className={twMerge('flex w-full flex-col gap-1.5', containerClassName)}>
        {label &&
        <label
          htmlFor={inputId}
          className={twMerge(
            indent,
            'text-sm text-text',
            hideLabel && 'sr-only',
            disabled && 'text-muted-text'
          )}>
          
            {label}
            {required &&
          <>
                <span aria-hidden="true">*</span>
                <span className="sr-only"> (Pflichtfeld)</span>
              </>
          }
          </label>
        }
        <div className="relative">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={openPicker}
            disabled={disabled}
            className={twMerge(
              'absolute top-1/2 -translate-y-1/2 text-primary transition-colors',
              iconPosition[size],
              error && 'text-red-700',
              disabled && 'cursor-not-allowed text-muted-text'
            )}>
            
            <CalendarIcon className="h-full w-full" />
          </button>
          <input
            ref={setRefs}
            id={inputId}
            type="date"
            value={value ?? ''}
            min={min}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange?.(e.target.value)}
            onClick={openPicker}
            className={twMerge(
              'w-full appearance-none border bg-surface outline-none transition-colors',
              shape === 'pill' ? 'rounded-full' : 'rounded-2xl',
              'border-muted-text text-text',
              'hover:border-primary',
              'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-wash',
              '[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
              isEmpty && 'text-muted-text',
              error && 'border-red-700 hover:border-red-700 focus-visible:border-red-700',
              disabled && 'cursor-not-allowed bg-wash text-muted-text hover:border-muted-text',
              sizeClasses[size],
              className
            )}
            {...rest} />
          
        </div>
        {error ?
        <p id={errorId} role="alert" className={`${indent} text-sm text-red-700`}>
            {error}
          </p> :
        hint ?
        <p id={hintId} className={`${indent} text-sm text-muted-text`}>
            {hint}
          </p> :
        null}
      </div>);

  }
);