import React from 'react';

export type NavLinkSize = 'sm' | 'md';
export type NavLinkTone = 'dark' | 'light';

export interface NavLinkProps extends
  React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the link as the current page: shows the dot marker and full underline. */
  active?: boolean;
  /** Text size. */
  size?: NavLinkSize;
  /** Color scheme — `dark` text for light backgrounds, `light` text for dark/image backgrounds. */
  tone?: NavLinkTone;
  /** Hide the dot marker on the active item. */
  hideDot?: boolean;
  children: React.ReactNode;
}

const sizeClasses: Record<NavLinkSize, string> = {
  sm: 'text-xs tracking-[0.18em] gap-2 py-1.5',
  md: 'text-sm tracking-[0.2em] gap-2.5 py-2'
};

const toneClasses: Record<NavLinkTone, {base: string;active: string;}> = {
  dark: {
    base: 'text-muted-text hover:text-text focus-visible:ring-primary focus-visible:ring-offset-background',
    active: 'text-text'
  },
  light: {
    base: 'text-white/70 hover:text-white focus-visible:ring-white focus-visible:ring-offset-stone-900',
    active: 'text-white'
  }
};

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink(
  {
    active = false,
    size = 'md',
    tone = 'dark',
    hideDot = false,
    className = '',
    style,
    children,
    href = '#',
    ...rest
  },
  ref)
  {
    const toneClass = toneClasses[tone];

    return (
      <a
        ref={ref}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={[
        'group relative inline-flex items-center font-medium uppercase leading-none no-underline',
        'transition-colors duration-200 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
        sizeClasses[size],
        active ? toneClass.active : toneClass.base,
        className].
        join(' ')}
        style={{
          fontFamily: "'Jost', var(--font-heading, var(--font-body, sans-serif))",
          ...style
        }}
        {...rest}>
        
        {!hideDot &&
        <span
          aria-hidden="true"
          className={[
          'h-1.5 w-1.5 shrink-0 rounded-full bg-current transition-all duration-200 ease-out',
          active ? 'scale-100 opacity-100' : 'scale-0 opacity-0 -ml-1.5'].
          join(' ')} />

        }
        <span className="relative">
          {children}
          <span
            aria-hidden="true"
            className={[
            'pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current',
            'transition-transform duration-300 ease-out',
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'].
            join(' ')} />
          
        </span>
      </a>);

  }
);