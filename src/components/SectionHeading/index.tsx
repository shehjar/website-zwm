import React from 'react';

export type SectionHeadingAlign = 'left' | 'center' | 'right';
export type SectionHeadingSize = 'sm' | 'md' | 'lg';
export type SectionHeadingTone = 'default' | 'inverse';
export type SectionHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type SectionHeadingFont = 'sans' | 'script';

export interface SectionHeadingProps {
  /** Heading text */
  title: React.ReactNode;
  /** 'sans' = Jost uppercase (default), 'script' = Allura for warm/emotional sections */
  font?: SectionHeadingFont;
  /** Small script line rendered above the title, e.g. "Getränkepauschalen" */
  eyebrow?: string;
  /** Optional supporting paragraph below the heading */
  description?: React.ReactNode;
  align?: SectionHeadingAlign;
  size?: SectionHeadingSize;
  tone?: SectionHeadingTone;
  /** Semantic heading level for the title */
  as?: SectionHeadingLevel;
  /** Show a short divider rule under the title */
  divider?: boolean;
  className?: string;
  id?: string;
}

const SCRIPT_FONT = "var(--font-script, 'Allura'), 'Allura', cursive";
const SANS_FONT = "var(--font-body, 'Jost'), 'Jost', ui-sans-serif, system-ui, sans-serif";

const alignClasses: Record<SectionHeadingAlign, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right'
};

const scriptSize: Record<SectionHeadingSize, string> = {
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-5xl',
  lg: 'text-5xl md:text-7xl'
};

const titleSize: Record<SectionHeadingSize, string> = {
  sm: 'text-base md:text-lg',
  md: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-4xl'
};

const toneClasses: Record<
  SectionHeadingTone,
  {script: string;title: string;description: string;divider: string;}> =
{
  default: {
    script: 'text-stone-500',
    title: 'text-stone-900',
    description: 'text-stone-600',
    divider: 'bg-stone-300'
  },
  inverse: {
    script: 'text-stone-300',
    title: 'text-white',
    description: 'text-stone-200',
    divider: 'bg-white/40'
  }
};

export function SectionHeading({
  title,
  eyebrow,
  font = 'sans',
  description,
  align = 'center',
  size = 'md',
  tone = 'default',
  as = 'h2',
  divider = false,
  className = '',
  id
}: SectionHeadingProps) {
  const Heading = as;
  const colors = toneClasses[tone];

  return (
    <header
      id={id}
      className={`flex w-full flex-col gap-2 ${alignClasses[align]} ${className}`}>
      
      {eyebrow &&
      <span
        className="block leading-none text-xl md:text-2xl"
        style={{ fontFamily: SCRIPT_FONT, fontWeight: 400, color: colors.script }}>
        {eyebrow}
      </span>
      }
      <Heading
        className={
          font === 'script' ?
          `m-0 leading-tight ${scriptSize[size]} ${colors.script}` :
          `m-0 font-medium uppercase tracking-[0.2em] leading-tight ${titleSize[size]} ${colors.title}`}
        style={{ fontFamily: font === 'script' ? SCRIPT_FONT : SANS_FONT, fontWeight: font === 'script' ? 400 : 500 }}>
        
        {title}
      </Heading>
      {divider ?
      <span
        aria-hidden="true"
        className={`mt-2 block h-px w-16 ${colors.divider}`} /> :

      null}
      {description ?
      <p
        className={`mt-2 max-w-2xl text-base font-light leading-relaxed ${colors.description}`}
        style={{ fontFamily: SANS_FONT }}>
        
          {description}
        </p> :
      null}
    </header>);

}
