import React, { forwardRef, useId, useState } from 'react';

export type PillTextareaSize = 'sm' | 'md' | 'lg';

export interface PillTextareaProps extends
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visible label above the field */
  label?: string;
  /** Helper text shown below the field */
  helperText?: string;
  /** Error message — switches the field into error state */
  error?: string;
  /** Size of the field */
  size?: PillTextareaSize;
  /** Show a live character counter (requires maxLength) */
  showCount?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Class names for the outer wrapper */
  wrapperClassName?: string;
}

const sizeClasses: Record<PillTextareaSize, string> = {
  sm: 'px-4 py-2.5 text-sm rounded-2xl min-h-[88px]',
  md: 'px-5 py-3.5 text-base rounded-3xl min-h-[120px]',
  lg: 'px-6 py-4 text-lg rounded-[2rem] min-h-[160px]'
};

export const PillTextarea = forwardRef<HTMLTextAreaElement, PillTextareaProps>(
  function PillTextarea(
  {
    label,
    helperText,
    error,
    size = 'md',
    showCount = false,
    fullWidth = true,
    disabled,
    required,
    maxLength,
    value,
    defaultValue,
    onChange,
    id,
    className = '',
    wrapperClassName = '',
    rows = 4,
    ...rest
  },
  ref)
  {
    const generatedId = useId();
    const fieldId = id ?? `pill-textarea-${generatedId}`;
    const describedById = `${fieldId}-desc`;
    const hasError = Boolean(error);

    const [internalLength, setInternalLength] = useState(
      String(defaultValue ?? '').length
    );
    const length = value !== undefined ? String(value).length : internalLength;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) setInternalLength(e.target.value.length);
      onChange?.(e);
    };

    const stateClasses = hasError ?
    'border-red-700 focus:border-red-700 focus:ring-wash' :
    'border-muted-text hover:border-primary focus:border-primary focus:ring-wash';

    const showFooter = Boolean(error || helperText || showCount && maxLength);

    return (
      <div
        className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : 'w-auto'} ${wrapperClassName}`}>
        
        {label &&
        <label
          htmlFor={fieldId}
          className="px-4 text-sm text-text">
          
            {label}
            {required &&
          <>
                <span aria-hidden="true">*</span>
                <span className="sr-only"> (Pflichtfeld)</span>
              </>
          }
          </label>
        }

        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError || undefined}
          aria-describedby={showFooter ? describedById : undefined}
          className={`block w-full resize-y border bg-surface text-text placeholder:text-muted-text outline-none transition-colors duration-150 focus:ring-4 disabled:cursor-not-allowed disabled:resize-none disabled:bg-wash disabled:text-muted-text ${sizeClasses[size]} ${stateClasses} ${className}`}
          {...rest} />
        

        {showFooter &&
        <div
          id={describedById}
          className="flex items-start justify-between gap-3 px-4 text-xs">
          
            <span
            className={hasError ? 'text-red-700' : 'text-muted-text'}
            role={hasError ? 'alert' : undefined}>
            
              {error ?? helperText}
            </span>
            {showCount && maxLength &&
          <span
            className={`shrink-0 tabular-nums ${
            length >= maxLength ? 'text-red-700' : 'text-muted-text'}`
            }
            aria-live="polite">
            
                {length}/{maxLength}
              </span>
          }
          </div>
        }
      </div>);

  }
);