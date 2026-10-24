import React, { useState } from 'react';
import { InstagramIcon } from 'lucide-react';
import { ImageCarousel } from '../ImageCarousel';
import type { ImageCarouselImage } from '../ImageCarousel';
import { PillButton } from '../PillButton';

export interface InstagramSectionProps {
  handle?: string;
  title?: string;
  text?: string;
  /** Optional custom heading; overrides title/text when provided */
  heading?: React.ReactNode;
  /** Event photos for the carousel; the thumbnail strip below jumps to each photo */
  images?: ImageCarouselImage[];
  /** Optional call-to-action rendered below the gallery, e.g. a PillButton to #kontakt */
  cta?: React.ReactNode;
  id?: string;
  className?: string;
}

export function InstagramSection({
  handle = 'zumwohlmobil',
  title = 'Unsere Events',
  text = 'Lass dich von unseren letzten Events inspirieren und wirf einen Blick hinter die Kulissen.',
  heading,
  images = [],
  cta,
  id,
  className = ''
}: InstagramSectionProps) {
  const profile = `https://www.instagram.com/${handle}/`;
  const [active, setActive] = useState(0);

  return (
    <section id={id} className={`w-full px-5 py-16 md:px-8 md:py-24 ${className}`}>
      <div className="mx-auto max-w-4xl">
        {heading ??
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-medium uppercase tracking-[0.18em] text-text md:text-2xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-text">{text}</p>
        </header>
        }

        {images.length > 0 ?
        <>
            <div className="mt-12">
              <ImageCarousel
            images={images}
            activeIndex={active}
            onIndexChange={setActive}
            showCounter
            showDots={false}
            autoPlay={5000}
            label="Eventgalerie"
          />
            </div>

            <ul
          className="mt-6 grid grid-cols-4 gap-3 md:grid-cols-7"
          role="tablist"
          aria-label="Bild auswählen">

              {images.map((img, i) =>
            <li key={`${img.src}-${i}`}>
                  <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Bild ${i + 1}: ${img.alt}`}
              onClick={() => setActive(i)}
              className={`block aspect-square w-full overflow-hidden rounded-xl bg-wash transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              i === active ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100'}`}>

                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                </li>
          )}
            </ul>
          </> :

        <p className="mt-10 rounded-2xl bg-wash px-6 py-10 text-center text-sm text-muted-text">
            Hier erscheinen bald Eindrücke von unseren Events.
          </p>
        }

        {cta && <div className="mt-10 flex justify-center">{cta}</div>}

        <div className="mt-6 flex justify-center">
          <PillButton href={profile} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 normal-case tracking-normal">
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />@{handle} auf Instagram folgen
            </span>
          </PillButton>
        </div>
      </div>
    </section>);

}
