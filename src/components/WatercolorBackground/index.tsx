import React from 'react';
import { BOTANICAL_SOURCES, type BotanicalVariant } from '../BotanicalDecoration';
import { WATERCOLOR_BLOT_SOURCES, type WatercolorBlotVariant } from '../WatercolorBlot';

export type WatercolorLayout =
'hero' |
'corners' |
'left' |
'right' |
'blots-only' |
'none';
export type WatercolorMobile = 'scale' | 'hide';

export interface WatercolorBackgroundProps {
  /** Preset arrangement of watercolor blots + botanical sprigs */
  layout?: WatercolorLayout;
  /** On small screens, shrink decorations or hide them entirely */
  mobile?: WatercolorMobile;
  /** Mirror the whole composition left ↔ right */
  mirror?: boolean;
  /** Mirror the whole composition top ↔ bottom */
  mirrorVertical?: boolean;
  /** Overall transparency multiplier for botanical sprigs (0–1) */
  botanicalOpacity?: number;
  /** Overall transparency multiplier for watercolor blots (0–1) */
  blotOpacity?: number;
  /** Base paper color behind the decorations */
  paperColor?: string;
  /** Element to render as the wrapper */
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

type Piece =
{kind: 'blot';variant: WatercolorBlotVariant;size: number;style: React.CSSProperties;rotate?: number;flip?: boolean;flipVertical?: boolean;opacity?: number;} |
{kind: 'botanical';variant: BotanicalVariant;size: number;style: React.CSSProperties;rotate?: number;flip?: boolean;flipVertical?: boolean;opacity?: number;};

/*
 * Each composition pairs a blot (painted first, underneath) with a sprig
 * that overlaps it, so the leaves read as resting on the wash.
 */
const LAYOUTS: Record<WatercolorLayout, Piece[]> = {
  hero: [
  { kind: 'blot', variant: 'splash', size: 620, style: { top: '-10%', left: '-12%' } },
  { kind: 'botanical', variant: 'garland', size: 420, style: { top: 0, left: 0 }, opacity: 0.85 },
  { kind: 'blot', variant: 'drift', size: 420, style: { bottom: '-14%', right: '-10%' }, flip: true },
  { kind: 'botanical', variant: 'corner', size: 300, style: { bottom: '-4%', right: '-3%' }, flip: true, opacity: 0.9 }],

  corners: [
  { kind: 'blot', variant: 'drift', size: 380, style: { top: '-18%', left: '-10%' } },
  { kind: 'botanical', variant: 'eucalyptus', size: 280, style: { top: '-6%', left: '-4%' }, rotate: 20, opacity: 0.9 },
  { kind: 'blot', variant: 'splash', size: 460, style: { bottom: '-16%', right: '-12%' }, flip: true },
  { kind: 'botanical', variant: 'sprig', size: 200, style: { bottom: '-2%', right: '-2%' }, rotate: 170, opacity: 0.55 }],

  left: [
  { kind: 'blot', variant: 'drift', size: 440, style: { top: '50%', left: '-14%', transform: 'translateY(-50%)' } },
  { kind: 'botanical', variant: 'twin', size: 220, style: { top: '50%', left: '-3%', transform: 'translateY(-55%)' }, opacity: 0.8 }],

  right: [
  { kind: 'blot', variant: 'splash', size: 500, style: { top: '50%', right: '-16%', transform: 'translateY(-50%)' }, flip: true },
  { kind: 'botanical', variant: 'branch', size: 320, style: { top: '50%', right: '-5%', transform: 'translateY(-55%)' }, flip: true, opacity: 0.85 }],

  'blots-only': [
  { kind: 'blot', variant: 'splash', size: 560, style: { top: '-12%', left: '-10%' } },
  { kind: 'blot', variant: 'wash', size: 420, style: { bottom: '-16%', right: '-8%' } }],

  none: []
};

export function WatercolorBackground({
  layout = 'corners',
  mobile = 'scale',
  mirror = false,
  mirrorVertical = false,
  botanicalOpacity = 1,
  blotOpacity = 1,
  paperColor = 'var(--background)',
  as: Component = 'div',
  className = '',
  contentClassName = '',
  children
}: WatercolorBackgroundProps) {
  const pieces = LAYOUTS[layout];

  return (
    <Component
      className={`relative isolate w-full overflow-hidden ${className}`}
      style={{ backgroundColor: paperColor }}>
      
      {pieces.length > 0 &&
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 select-none ${mobile === 'hide' ? 'hidden md:block' : ''}`}
        style={{ transform: `scale(${mirror ? -1 : 1}, ${mirrorVertical ? -1 : 1})` }}>
        
          {pieces.map((p, i) => {
          const src =
          p.kind === 'blot' ?
          WATERCOLOR_BLOT_SOURCES[p.variant] :
          BOTANICAL_SOURCES[p.variant];
          const inner = `rotate(${p.rotate ?? 0}deg) scale(${p.flip ? -1 : 1}, ${p.flipVertical ? -1 : 1})`;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                ...p.style,
                // Scales down on narrow viewports (~55% at 375px), full size from ~1100px.
                width: `clamp(${Math.round(p.size * 0.5)}px, ${(p.size / 11).toFixed(2)}vw, ${p.size}px)`,
                opacity: clamp01(
                  (p.opacity ?? 1) * (p.kind === 'blot' ? blotOpacity : botanicalOpacity)
                )
              }}>
              
                <img
                src={src}
                alt=""
                draggable={false}
                loading="lazy"
                className="block h-auto w-full"
                style={{ transform: inner }} />
              
              </div>);

        })}
        </div>
      }
      <div className={`relative ${contentClassName}`}>{children}</div>
    </Component>);

}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}