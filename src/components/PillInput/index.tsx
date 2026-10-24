import React, { forwardRef, useId } from 'react';

export type PillInputType = 'text' | 'number' | 'tel' | 'email';
export type FieldShape = 'pill' | 'rounded';

export interface PillInputProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered above the input */
  label: string;
  /** Input type */
  type?: PillInputType;
  /** Shows a required marker (*) and sets the native required attribute */
  required?: boolean;
  /** Error message; when set, the input switches to the error state */
  error?: string;
  /** Optional helper text shown below the input when there is no error */
  hint?: string;
  /** `pill` = fully rounded (website default), `rounded` = 16px corners (Canva form style) */
  shape?: FieldShape;
  /** Additional classes for the outer wrapper */
  className?: string;
}

export const fieldShapeClasses: Record<FieldShape, string> = {
  pill: 'rounded-full px-5',
  rounded: 'rounded-2xl px-4'
};

export const PillInput = forwardRef<HTMLInputElement, PillInputProps>(
  function PillInput(
  {
    label,
    type = 'text',
    required = false,
    error,
    hint,
    shape = 'pill',
    id,
    disabled,
    className = '',
    ...rest
  },
  ref)
  {
    const generatedId = useId();
    const inputId = id ?? `pill-input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const hasError = Boolean(error);
    const describedBy = hasError ? errorId : hint ? hintId : undefined;

    return (
      <div className={`flex w-full flex-col gap-1.5 ${className}`}>
        <label
          htmlFor={inputId}
          className={`${shape === 'pill' ? 'pl-5' : 'pl-1'} text-sm ${
          disabled ? 'text-muted-text' : 'text-text'}`
          }>
          
          {label}
          {required &&
          <>
              <span aria-hidden="true">*</span>
              <span className="sr-only"> (Pflichtfeld)</span>
            </>
          }
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          inputMode={type === 'number' ? 'numeric' : undefined}
          className={[
          'h-12 w-full border bg-surface text-base text-text',
          fieldShapeClasses[shape],
          'placeholder:text-muted-text transition-colors duration-150',
          'focus:outline-none focus:ring-4 focus:ring-wash',
          'disabled:cursor-not-allowed disabled:bg-wash disabled:text-muted-text',
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          hasError ?
          'border-red-700 focus:border-red-700' :
          'border-muted-text hover:border-primary focus:border-primary'].
          join(' ')}
          {...rest} />
        
        {hasError ?
        <p id={errorId} role="alert" className={`${shape === 'pill' ? 'pl-5' : 'pl-1'} text-sm text-red-700`}>
            {error}
          </p> :
        hint ?
        <p id={hintId} className={`${shape === 'pill' ? 'pl-5' : 'pl-1'} text-sm text-muted-text`}>
            {hint}
          </p> :
        null}
      </div>);

  }
);