import React, { useId, useState } from 'react';
import { CheckIcon } from 'lucide-react';

export interface ConsentCheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial state when uncontrolled */
  defaultChecked?: boolean;
  /** Called with the new checked state */
  onChange?: (checked: boolean) => void;
  /** URL of the Datenschutz page */
  privacyHref?: string;
  /** Link text for the privacy policy link */
  privacyLinkLabel?: string;
  /** Open the privacy link in a new tab */
  openInNewTab?: boolean;
  /** Text before the link */
  labelBefore?: React.ReactNode;
  /** Text after the link */
  labelAfter?: React.ReactNode;
  /** Marks the field as required (adds asterisk + aria-required) */
  required?: boolean;
  /** Error message shown below the checkbox */
  error?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export function ConsentCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  privacyHref = '/datenschutz',
  privacyLinkLabel = 'Datenschutzerklärung',
  openInNewTab = true,
  labelBefore = 'Ich habe die',
  labelAfter = 'gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.',
  required = true,
  error,
  disabled = false,
  name = 'consent',
  id,
  className = ''
}: ConsentCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? `consent-${generatedId}`;
  const errorId = `${inputId}-error`;
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internal;
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e.target.checked);
  };

  const boxClasses = [
  'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors duration-150',
  'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2',
  hasError ?
  'border-red-700 peer-focus-visible:ring-red-700' :
  isChecked ?
  'border-primary bg-primary peer-focus-visible:ring-primary' :
  'border-muted-text bg-surface group-hover:border-primary peer-focus-visible:ring-primary',
  hasError && isChecked ? 'bg-red-700' : '',
  hasError && !isChecked ? 'bg-surface' : ''].
  join(' ');

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={inputId}
        className={`group flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        
        <span className="relative mt-0.5 flex">
          <input
            id={inputId}
            name={name}
            type="checkbox"
            className="peer sr-only"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined} />
          
          <span className={boxClasses} aria-hidden="true">
            {isChecked && <CheckIcon className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
          </span>
        </span>
        <span className="text-sm leading-relaxed text-text">
          {labelBefore}{' '}
          <a
            href={privacyHref}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-primary underline underline-offset-2 hover:text-accent focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary">
            
            {privacyLinkLabel}
          </a>{' '}
          {labelAfter}
          {required && <span aria-hidden="true">*</span>}
        </span>
      </label>
      {hasError &&
      <p id={errorId} role="alert" className="mt-1.5 pl-8 text-sm text-red-700">
          {error}
        </p>
      }
    </div>);

}