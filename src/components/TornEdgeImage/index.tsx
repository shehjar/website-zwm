import React, { useId, useMemo, useState } from 'react';

export type TornEdges = 'all' | 'top' | 'bottom' | 'top-bottom' | 'left-right';
export type TornRoughness = 'soft' | 'medium' | 'rough';

export interface TornEdgeImageProps {
  /** Image URL */
  src: string;
  /** Accessible alt text (use "" for decorative images) */
  alt: string;
  /** Which edges receive the torn treatment */
  edges?: TornEdges;
  /** Depth / jaggedness of the tear */
  roughness?: TornRoughness;
  /** Change to get a different (deterministic) tear pattern */
  seed?: number;
  /** Show a cream paper fringe behind the torn edge */
  paper?: boolean;
  /** CSS aspect-ratio, e.g. "4 / 3" */
  aspectRatio?: string;
  /** Tilt in degrees for collage layouts */
  rotate?: number;
  /** Soft drop shadow under the paper */
  shadow?: boolean;
  /** Optional caption shown below the image */
  caption?: React.ReactNode;
  className?: string;
}

const AMPLITUDE: Record<TornRoughness, number> = {
  soft: 0.012,
  medium: 0.022,
  rough: 0.036
};

export function TornEdgeImage({
  src,
  alt,
  edges = 'all',
  roughness = 'medium',
  seed = 7,
  paper = true,
  aspectRatio = '4 / 3',
  rotate = 0,
  shadow = true,
  caption,
  className = ''
}: TornEdgeImageProps) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const { outer, inner } = useMemo(() => {
    const amp = AMPLITUDE[roughness];
    const sides = resolveSides(edges);
    return {
      outer: buildTornPath(sides, amp * 0.55, amp * 0.6, seed),
      inner: buildTornPath(sides, amp * 1.25, amp, seed + 101)
    };
  }, [edges, roughness, seed]);

  return (
    <figure
      className={`m-0 inline-flex w-full flex-col ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${id}-outer`} clipPathUnits="objectBoundingBox">
            <path d={outer} />
          </clipPath>
          <clipPath id={`${id}-inner`} clipPathUnits="objectBoundingBox">
            <path d={inner} />
          </clipPath>
        </defs>
      </svg>

      <div
        className="relative w-full"
        style={{
          aspectRatio,
          filter: shadow ? 'drop-shadow(0 6px 10px rgba(41, 37, 36, 0.18))' : undefined
        }}>
        
        {paper &&
        <div
          className="absolute inset-0 bg-stone-50"
          style={{ clipPath: `url(#${id}-outer)` }}
          aria-hidden="true" />

        }
        <div
          className="absolute inset-0 overflow-hidden bg-stone-200"
          style={{ clipPath: `url(#${id}-${paper ? 'inner' : 'outer'})` }}>
          
          {status === 'loading' &&
          <div className="absolute inset-0 animate-pulse bg-stone-200" aria-hidden="true" />
          }
          {status === 'error' ?
          <div
            role="img"
            aria-label={alt || 'Image unavailable'}
            className="flex h-full w-full items-center justify-center bg-stone-200 text-sm text-stone-500">
            
              Image unavailable
            </div> :

          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'}`
            } />

          }
        </div>
      </div>

      {caption &&
      <figcaption className="mt-3 text-center text-sm italic text-stone-600">{caption}</figcaption>
      }
    </figure>);

}

interface Sides {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export function resolveSides(edges: TornEdges): Sides {
  switch (edges) {
    case 'top':
      return { top: true, right: false, bottom: false, left: false };
    case 'bottom':
      return { top: false, right: false, bottom: true, left: false };
    case 'top-bottom':
      return { top: true, right: false, bottom: true, left: false };
    case 'left-right':
      return { top: false, right: true, bottom: false, left: true };
    default:
      return { top: true, right: true, bottom: true, left: true };
  }
}

/** Builds a closed path in 0..1 space with jittered (torn) edges. */
export function buildTornPath(sides: Sides, inset: number, jitter: number, seed: number): string {
  const rand = mulberry32(seed);
  const steps = 48;
  const pts: Array<[number, number]> = [];
  const off = (torn: boolean) => torn ? inset + (rand() - 0.5) * 2 * jitter : 0;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push([t, clamp(off(sides.top))]);
  }
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    pts.push([clamp(1 - off(sides.right)), t]);
  }
  for (let i = 1; i <= steps; i++) {
    const t = 1 - i / steps;
    pts.push([t, clamp(1 - off(sides.bottom))]);
  }
  for (let i = 1; i < steps; i++) {
    const t = 1 - i / steps;
    pts.push([clamp(off(sides.left)), t]);
  }

  return (
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(4)} ${y.toFixed(4)}`).join(' ') + ' Z');

}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}