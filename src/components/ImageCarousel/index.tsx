import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ImageOffIcon, ImagesIcon } from 'lucide-react';

export type ImageCarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ImageCarouselAspect = 'video' | 'photo' | 'square' | 'portrait';

export type ImageCarouselProps = {
  images: ImageCarouselImage[];
  /** Slide layout: one image at a time, or a peeking multi-image row */
  variant?: 'single' | 'multi';
  aspect?: ImageCarouselAspect;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  /** Autoplay interval in ms. Pauses on hover/focus. */
  autoPlay?: number;
  initialIndex?: number;
  /** Controlled active index; when it changes from outside, the track scrolls to it */
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  label?: string;
  className?: string;
};

const aspectClasses: Record<ImageCarouselAspect, string> = {
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]'
};

export function ImageCarousel({
  images,
  variant = 'single',
  aspect = 'photo',
  showArrows = true,
  showDots = true,
  showCounter = false,
  autoPlay,
  initialIndex = 0,
  activeIndex,
  onIndexChange,
  label = 'Bildergalerie',
  className = ''
}: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, total - 1));
      const slide = track.children[clamped] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({ left: slide.offsetLeft, behavior });
    },
    [total]
  );

  // Wrap instantané pour boucler : un saut rapide qui donne l'impression
  // de continuer en boucle plutôt que de défiler en arrière.
  const goNext = useCallback(() => {
    const next = active + 1;
    scrollToIndex(next >= total ? 0 : next, next >= total ? 'instant' : 'smooth');
  }, [active, total, scrollToIndex]);

  const goPrev = useCallback(() => {
    const prev = active - 1;
    scrollToIndex(prev < 0 ? total - 1 : prev, prev < 0 ? 'instant' : 'smooth');
  }, [active, total, scrollToIndex]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let min = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActive((prev) => {
      if (prev !== closest) onIndexChange?.(closest);
      return closest;
    });
  }, [onIndexChange]);

  useEffect(() => {
    if (initialIndex > 0) scrollToIndex(initialIndex, 'auto');
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeIndex !== undefined) scrollToIndex(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const id = window.setInterval(() => {
      scrollToIndex((active + 1) % total);
    }, autoPlay);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, active, total, scrollToIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  if (total === 0) {
    return (
      <div
        className={`flex ${aspectClasses[aspect]} w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-stone-50 text-stone-500 ${className}`}>
        
        <ImagesIcon className="h-8 w-8" aria-hidden="true" />
        <p className="text-sm">Noch keine Bilder vorhanden</p>
      </div>);

  }

  const slideWidth =
  variant === 'single' ? 'w-full' : 'w-[85%] sm:w-[48%] lg:w-[32%]';

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={`group relative w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-live={autoPlay && !paused ? 'off' : 'polite'}
          className={`relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          variant === 'multi' ? 'gap-4' : ''}`
          }>
          
          {images.map((img, i) =>
          <div
            key={`${img.src}-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} von ${total}`}
            className={`${slideWidth} shrink-0 snap-start`}>
            
              <Slide image={img} aspect={aspect} rounded={variant === 'multi'} />
            </div>
          )}
        </div>

        {showArrows && total > 1 &&
        <>
            <ArrowButton
            direction="prev"
            onClick={goPrev} />
          
            <ArrowButton
            direction="next"
            onClick={goNext} />
          
          </>
        }

        {showCounter &&
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-stone-900/70 px-2.5 py-1 text-xs font-medium tabular-nums text-white">
            {active + 1} / {total}
          </span>
        }
      </div>

      {showDots && total > 1 &&
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Bild auswählen">
          {images.map((img, i) =>
        <button
          key={`dot-${i}`}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Bild ${i + 1}: ${img.alt}`}
          onClick={() => scrollToIndex(i)}
          className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 ${
          i === active ? 'w-6 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-400'}`
          } />

        )}
        </div>
      }
    </section>);

}

type SlideProps = {
  image: ImageCarouselImage;
  aspect: ImageCarouselAspect;
  rounded: boolean;
};

function Slide({ image, aspect, rounded }: SlideProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <figure
      className={`relative ${aspectClasses[aspect]} w-full overflow-hidden bg-stone-100 ${
      rounded ? 'rounded-2xl' : ''}`
      }>
      
      {status === 'loading' &&
      <div className="absolute inset-0 animate-pulse bg-stone-200" aria-hidden="true" />
      }
      {status === 'error' ?
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-500">
          <ImageOffIcon className="h-7 w-7" aria-hidden="true" />
          <span className="text-sm">Bild konnte nicht geladen werden</span>
        </div> :

      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        draggable={false}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`h-full w-full select-none object-cover transition-opacity duration-500 ${
        status === 'loaded' ? 'opacity-100' : 'opacity-0'}`
        } />

      }
      {image.caption && status !== 'error' &&
      <figcaption className="absolute inset-x-0 bottom-0 bg-stone-900/60 px-4 py-3 text-sm font-medium text-white">
          {image.caption}
        </figcaption>
      }
    </figure>);

}

type ArrowButtonProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
};

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Vorheriges Bild' : 'Nächstes Bild'}
      className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-md transition-all hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 sm:flex sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 ${
      direction === 'prev' ? 'left-3' : 'right-3'}`
      }>
      
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>);

}