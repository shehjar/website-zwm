import React from 'react';
import { BOTANICAL_SOURCES, type BotanicalVariant } from '../BotanicalDecoration';
import { WATERCOLOR_BLOT_SOURCES, type WatercolorBlotVariant } from '../WatercolorBlot';

/**
 * One continuous decoration layer spanning the entire page. Pieces are placed
 * by percentage of total page height, so blots and sprigs flow seamlessly
 * across section boundaries instead of being clipped per section.
 */

type Piece = {
  kind: 'blot' | 'botanical';
  variant: WatercolorBlotVariant | BotanicalVariant;
  size: number;
  top: string;
  side: 'left' | 'right';
  offset: string;
  rotate?: number;
  flip?: boolean;
  opacity?: number;
  desktopOnly?: boolean;
};

/*
 * Placement rule by artifact shape:
 *  - Corner/edge-only (strong contour): 'splash'/'drift' washes, 'corner' swag,
 *    'garland' wreath, 'branch', 'eucalyptus' — always bleed off a screen edge,
 *    ideally at the page's top/bottom corners.
 *  - Safe anywhere (feathered, no readable contour): diffuse 'wash' blot,
 *    open 'sprig' and 'twin' botanicals.
 */
const PIECES: Piece[] = [
  // Hero — pooling wash + sprigs at the top-left corner, clear of logo/nav
  { kind: 'blot', variant: 'splash', size: 620, top: '1%', side: 'left', offset: '-12%', opacity: 0.5 },
  { kind: 'botanical', variant: 'twin', size: 300, top: '3%', side: 'left', offset: '-4%', opacity: 0.9, desktopOnly: true },
  // Top-right edge — branch runs along the edge, eucalyptus trails off it
  { kind: 'botanical', variant: 'eucalyptus', size: 280, top: '3%', side: 'right', offset: '-4%', rotate: 20, opacity: 0.85, desktopOnly: true },
  { kind: 'botanical', variant: 'branch', size: 320, top: '13%', side: 'right', offset: '-5%', flip: true, opacity: 0.98 },
  // Mid-page — only diffuse washes and open sprigs, so no contour edges sit next to content
  { kind: 'blot', variant: 'wash', size: 495, top: '24%', side: 'left', offset: '-10%', opacity: 1 },
  { kind: 'blot', variant: 'wash', size: 515, top: '37%', side: 'right', offset: '-8%', flip: true, opacity: 0.98 },
  { kind: 'botanical', variant: 'sprig', size: 200, top: '39%', side: 'right', offset: '-4%', rotate: 20, opacity: 0.9 },
  { kind: 'blot', variant: 'wash', size: 470, top: '52%', side: 'left', offset: '-10%', opacity: 1 },
  { kind: 'botanical', variant: 'sprig', size: 200, top: '54%', side: 'left', offset: '-3%', rotate: 170, opacity: 0.63 },
  { kind: 'blot', variant: 'wash', size: 495, top: '68%', side: 'right', offset: '-10%', flip: true, opacity: 1 },
  // Page-bottom left corner — strong diagonal washes frame the page end; the
  // right-side garland is anchored to the footer itself so it touches its top edge
  { kind: 'botanical', variant: 'twin', size: 260, top: '82%', side: 'left', offset: '-4%', opacity: 0.65, desktopOnly: true },
  { kind: 'blot', variant: 'splash', size: 560, top: '86%', side: 'left', offset: '-12%', opacity: 0.7 }
];

export interface PageBackdropProps {
  className?: string;
}

function decorationStrength(): number {
  if (typeof window === 'undefined') return 1;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--decoration-strength').trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 1;
}

export function PageBackdrop({ className = '' }: PageBackdropProps) {
  const strength = React.useMemo(decorationStrength, []);
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden ${className}`}
    >
      {PIECES.map((p, i) => {
        const src =
          p.kind === 'blot'
            ? WATERCOLOR_BLOT_SOURCES[p.variant as WatercolorBlotVariant]
            : BOTANICAL_SOURCES[p.variant as BotanicalVariant];
        const style: React.CSSProperties = {
          top: p.top,
          width: `clamp(${Math.round(p.size * 0.5)}px, ${(p.size / 11).toFixed(2)}vw, ${p.size}px)`,
          opacity: Math.min(1, Math.max(0, (p.opacity ?? 1) * strength)),
          transform: `rotate(${p.rotate ?? 0}deg) scale(${p.flip ? -1 : 1}, 1)`,
          mixBlendMode: p.kind === 'blot' ? 'multiply' : undefined
        };
        if (p.side === 'left') {
          style.left = p.offset;
        } else {
          style.right = p.offset;
        }
        return (
          <div
            key={i}
            className={`absolute ${p.desktopOnly ? 'hidden md:block' : ''}`}
            style={style}
          >
            <img src={src} alt="" draggable={false} loading="lazy" className="block h-auto w-full" />
          </div>
        );
      })}
    </div>
  );
}
