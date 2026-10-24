import React from 'react';
import { responsiveWidth } from '../BotanicalDecoration';

export type WatercolorBlotVariant =
'splash' |
'wash' |
'drift';
export type WatercolorBlotPosition =
'top-left' |
'top-right' |
'bottom-left' |
'bottom-right' |
'center' |
'inline';

export interface WatercolorBlotProps {
  /** Which watercolor blot to show */
  variant?: WatercolorBlotVariant;
  /** Absolute placement within a `relative isolate` parent, or `inline` for normal flow */
  position?: WatercolorBlotPosition;
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
   * Stacking order for overlapping blots (0–9). Higher layers sit on top of
   * lower ones, but every layer still stays behind section content.
   */
  layer?: number;
  /** Multiply-blend so overlapping blots deepen like real pigment. Default true. */
  blend?: boolean;
  /**
   * Smallest scale on phones (0–1). The width shrinks fluidly from `size` on
   * wide screens down to `size * mobileScale` at ~375px. Set 1 for a fixed size.
   */
  mobileScale?: number;
  className?: string;
}

/** Real watercolor blot assets — never redraw or substitute. */
export const WATERCOLOR_BLOT_SOURCES: Record<WatercolorBlotVariant, string> = {
  splash: "/blot3.svg",

  wash: "/blot2.svg",
  drift: "/blot1.svg"

};

const positionClasses: Record<WatercolorBlotPosition, string> = {
  'top-left': 'absolute -top-10 -left-10',
  'top-right': 'absolute -top-10 -right-10',
  'bottom-left': 'absolute -bottom-10 -left-10',
  'bottom-right': 'absolute -bottom-10 -right-10',
  center: 'absolute left-1/2 top-1/2',
  inline: 'relative inline-block'
};

export function WatercolorBlot({
  variant = 'splash',
  position = 'inline',
  size = 360,
  rotate = 0,
  flip = false,
  flipVertical = false,
  opacity = 1,
  layer = 0,
  blend = true,
  mobileScale = 0.55,
  className = ''
}: WatercolorBlotProps) {
  const centre = position === 'center' ? 'translate(-50%, -50%) ' : '';
  const transform = `${centre}rotate(${rotate}deg) scale(${flip ? -1 : 1}, ${flipVertical ? -1 : 1})`;
  const isAbsolute = position !== 'inline';
  const safeLayer = Math.min(9, Math.max(0, Math.round(layer)));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${positionClasses[position]} ${className}`}
      style={{
        width: responsiveWidth(size, mobileScale),
        opacity: Math.min(1, Math.max(0, opacity)),
        transform,
        zIndex: isAbsolute ? -10 + safeLayer : undefined,
        mixBlendMode: blend ? 'multiply' : undefined
      }}>
      
      <img
        src={WATERCOLOR_BLOT_SOURCES[variant]}
        alt=""
        draggable={false}
        loading="lazy"
        className="block h-auto w-full" />
      
    </div>);

}