import React from 'react';
import { InstagramIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { BOTANICAL_SOURCES } from '../BotanicalDecoration';

type FooterLink = {label: string;href: string;};

export interface SiteFooterProps {
  tagline?: string;
  legalLinks?: FooterLink[];
  instagramHandle?: string;
  /** Copyright year; defaults to the current year */
  year?: number;
  className?: string;
}

const DEFAULT_LEGAL: FooterLink[] = [
{ label: 'Impressum', href: '/impressum' },
{ label: 'Datenschutz', href: '/datenschutz' },
{ label: 'AGB', href: '/agb' }];

const linkClass =
'rounded-sm text-sm text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card';

export function SiteFooter({
  tagline = 'Mobile Bar für besondere Momente.',
  legalLinks = DEFAULT_LEGAL,
  instagramHandle = 'zumwohlmobil',
  year = new Date().getFullYear(),
  className = ''
}: SiteFooterProps) {
  return (
    <footer className={`relative w-full bg-card text-text ${className}`}>
      <img
        src={BOTANICAL_SOURCES.garland}
        alt=""
        draggable={false}
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full right-[-4%] hidden w-[340px] max-w-[38vw] select-none md:block"
        style={{ opacity: 0.88, transform: 'rotate(180deg)' }}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-5 py-4 text-center sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:px-8 md:text-left">
        <Logo size="md" href="/" className="shrink-0 [&_img]:h-[70px] sm:[&_img]:h-[84px] lg:[&_img]:h-[100px]" />
        <div className="flex flex-col items-center gap-0.5 sm:items-start">
          <p className="text-sm leading-snug">
            <span className="font-medium">Zum Wohl Mobil</span> – {tagline}
          </p>
          {instagramHandle &&
          <a
            href={`https://www.instagram.com/${instagramHandle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${linkClass}`}>
            
              <InstagramIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />@{instagramHandle}
            </a>
          }
        </div>
        <div className="flex flex-col items-center gap-0.5 sm:ml-auto sm:items-end">
          <nav aria-label="Rechtliches">
            <ul className="flex items-center gap-4">
              {legalLinks.map((l) =>
              <li key={l.href}>
                  <a href={l.href} className="rounded-sm text-xs text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card">
                    {l.label}
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <p className="text-xs text-text">
            © {year} Zum Wohl Mobil. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>);

}
