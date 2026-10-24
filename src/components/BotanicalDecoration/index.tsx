import React from 'react';

export type BotanicalVariant =
'eucalyptus' |
'branch' |
'corner' |
'sprig' |
'twin' |
'garland';
export type BotanicalPosition =
'top-left' |
'top-right' |
'bottom-left' |
'bottom-right' |
'inline';

export interface BotanicalDecorationProps {
  /** Which watercolor illustration to show */
  variant?: BotanicalVariant;
  /** Absolute placement within a `relative isolate` parent, or `inline` for normal flow */
  position?: BotanicalPosition;
  /** Width in px (height scales with aspect ratio) */
  size?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Mirror horizontally (left ↔ right) */
  flip?: boolean;
  /** Mirror vertically (top ↔ bottom) */
  flipVertical?: boolean;
  /** Transparency, 0 (invisible) – 1 (fully opaque). Values are clamped. */
  opacity?: number;
  /**
   * Smallest scale on phones (0–1). The width shrinks fluidly from `size` on
   * wide screens down to `size * mobileScale` at ~375px. Set 1 for a fixed size.
   */
  mobileScale?: number;
  className?: string;
}

/** Real transparent watercolor assets — never redraw or substitute. */
export const BOTANICAL_SOURCES: Record<BotanicalVariant, string> = {
  eucalyptus: "/leaves3.webp",

  branch: "/leaves2.webp",

  corner: "/Leaves1.webp",

  sprig: "/leaves6.webp",

  twin: "/leaves5.webp",

  garland: "/leaves4.webp"

};

const positionClasses: Record<BotanicalPosition, string> = {
  'top-left': 'absolute -top-6 -left-6 -z-10',
  'top-right': 'absolute -top-6 -right-6 -z-10',
  'bottom-left': 'absolute -bottom-6 -left-6 -z-10',
  'bottom-right': 'absolute -bottom-6 -right-6 -z-10',
  inline: 'relative inline-block'
};

export function BotanicalDecoration({
  variant = 'eucalyptus',
  position = 'inline',
  size = 220,
  rotate = 0,
  flip = false,
  flipVertical = false,
  opacity = 1,
  mobileScale = 0.55,
  className = ''
}: BotanicalDecorationProps) {
  const transform = buildTransform(rotate, flip, flipVertical);
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${positionClasses[position]} ${className}`}
      style={{ width: responsiveWidth(size, mobileScale), opacity: clampOpacity(opacity), transform }}>
      
      <img
        src={BOTANICAL_SOURCES[variant]}
        alt=""
        draggable={false}
        loading="lazy"
        className="block h-auto w-full" />
      
    </div>);

}

/** Rotation is applied first, then mirroring — so a flipped sprig keeps its rotation angle on screen. */
export function buildTransform(rotate: number, flipX: boolean, flipY: boolean) {
  return `rotate(${rotate}deg) scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`;
}

/**
 * Fluid width: full `size` from ~1100px viewports, shrinking with the viewport
 * down to `size * minScale` on phones — decorations stay visible, just smaller.
 */
export function responsiveWidth(size: number, minScale: number) {
  const scale = Math.min(1, Math.max(0, minScale));
  if (scale >= 1) return `${size}px`;
  return `clamp(${Math.round(size * scale)}px, ${(size / 11).toFixed(2)}vw, ${size}px)`;
}

export function clampOpacity(value: number) {
  return Math.min(1, Math.max(0, value));
}