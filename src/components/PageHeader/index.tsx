import React from 'react';
import { PillButton } from '../PillButton';

export interface PageHeaderProps {
  /** H1 content — mix display font with script spans for emphasis */
  title: React.ReactNode;
  /** Supporting line under the title */
  subline?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional photo — switches to the hero layout (homepage): photo bleeds to the right edge with a wavy, fading left contour */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

function HeroFadeImage({
  src,
  alt,
  aspectRatio
}: {
  src: string;
  alt: string;
  aspectRatio: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio }}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 55%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 55%)'
        }} />
    </div>
  );
}

export function PageHeader({
  title,
  subline,
  ctaLabel,
  ctaHref = '/kontakt',
  imageSrc,
  imageAlt = '',
  className = ''
}: PageHeaderProps) {
  const isHero = Boolean(imageSrc);

  return (
    <section className={`relative w-full ${className}`}>

      {/* Desktop hero photo — starts right below the menu, flush with the right viewport edge, long fade on the left */}
      {isHero && imageSrc &&
      <div className="absolute right-0 top-0 hidden w-[56%] max-w-[760px] lg:block">
          <HeroFadeImage src={imageSrc} alt={imageAlt} aspectRatio="7 / 5" />
        </div>
      }

      <div
        className={`relative mx-auto w-full max-w-7xl px-5 md:px-8 ${
        isHero ?
        'grid items-center gap-10 py-10 sm:py-16 lg:min-h-[640px] lg:grid-cols-2 lg:py-20' :
        'py-16 text-center md:py-24'}`
        }>
        
        <div className={isHero ? 'text-center lg:pl-12 xl:pl-20' : 'mx-auto max-w-3xl'}>
          <h1 className="text-5xl leading-[1.05] text-text md:text-7xl lg:text-8xl">{title}</h1>
          {subline &&
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-text md:text-xl">
              {subline}
            </p>
          }
          {ctaLabel &&
          <div className="mt-8">
              <PillButton href={ctaHref} size="lg">
                {ctaLabel}
              </PillButton>
            </div>
          }
        </div>

        {/* Mobile / tablet hero photo — stacked below the lettering */}
        {isHero && imageSrc &&
        <div className="relative mx-auto w-full max-w-xl lg:hidden">
            <HeroFadeImage src={imageSrc} alt={imageAlt} aspectRatio="4 / 3" />
          </div>
        }
      </div>
    </section>);
}
