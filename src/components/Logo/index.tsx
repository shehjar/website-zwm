import React from 'react';

export const LOGO_SRC = "/Logo.svg";


export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  /** Visual height of the wordmark. Width scales automatically. */
  size?: LogoSize;
  /** Optional URL — wraps the logo in a link when provided. */
  href?: string;
  /** Accessible label for the link wrapper (defaults to "Zum Wohl Mobil – Startseite"). */
  linkLabel?: string;
  className?: string;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-6',
  md: 'h-10',
  lg: 'h-16'
};

export function Logo({
  size = 'md',
  href,
  linkLabel = 'Zum Wohl Mobil – Startseite',
  className = ''
}: LogoProps) {
  const img =
  <img
    src={LOGO_SRC}
    alt="Zum Wohl Mobil"
    className={`${sizeClasses[size]} w-auto block select-none ${href ? '' : className}`}
    draggable={false} />;



  if (!href) return img;

  return (
    <a
      href={href}
      aria-label={linkLabel}
      className={`inline-flex items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${className}`}>
      
      {img}
    </a>);

}