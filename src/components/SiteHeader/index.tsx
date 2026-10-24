import React from 'react';
import { Logo } from '../Logo';
import { NavLink } from '../NavLink';
import { PillButton } from '../PillButton';
import { MobileMenuOverlay, DEFAULT_MOBILE_MENU_LINKS } from '../MobileMenuOverlay';
import type { MobileMenuLink } from '../MobileMenuOverlay';

export interface SiteHeaderProps {
  /** href of the current page — gets the underline-and-dot marker */
  activeHref?: string;
  links?: MobileMenuLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Stick to the top while scrolling */
  sticky?: boolean;
  className?: string;
}

export function SiteHeader({
  activeHref = '/',
  links = DEFAULT_MOBILE_MENU_LINKS,
  ctaLabel = 'Jetzt anfragen',
  ctaHref = '/kontakt',
  sticky = true,
  className = ''
}: SiteHeaderProps) {
  return (
    <header
      className={`${sticky ? 'sticky top-0 z-40' : 'relative'} w-full border-b border-wash bg-background ${className}`}>
      
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-4 px-6 lg:h-[112px] xl:h-[132px] xl:gap-6 xl:px-10">
        <Logo
          href="/"
          size="lg"
          className="shrink-0 [&_img]:h-[70px] lg:[&_img]:h-[100px] xl:[&_img]:h-[120px]" />
        

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center lg:gap-5 xl:gap-8">
            {links.map((link) =>
            <li key={link.href}>
                <NavLink
                href={link.href}
                active={link.href === activeHref}
                size="sm"
                className="whitespace-nowrap xl:gap-2.5 xl:py-2 xl:text-sm xl:tracking-[0.2em]">
                
                  {link.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <PillButton
            href={ctaHref}
            size="sm"
            className="hidden sm:inline-flex xl:h-11 xl:gap-2.5 xl:px-7 xl:text-sm">
            
            {ctaLabel}
          </PillButton>
          <MobileMenuOverlay
            links={links}
            activeHref={activeHref}
            logo={<Logo size="lg" />} />
          
        </div>
      </div>
    </header>);

}