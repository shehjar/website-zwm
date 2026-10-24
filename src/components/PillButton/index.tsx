import React from 'react';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type PillButtonSize = 'sm' | 'md' | 'lg';

type BaseProps = {
  children: React.ReactNode;
  size?: PillButtonSize;
  showArrow?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps = BaseProps &
Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
  href?: undefined;
};

type AnchorProps = BaseProps &
Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  href: string;
  disabled?: boolean;
};

export type PillButtonProps = ButtonProps | AnchorProps;

const sizeClasses: Record<PillButtonSize, string> = {
  sm: 'h-9 px-5 text-xs gap-2',
  md: 'h-11 px-7 text-sm gap-2.5',
  lg: 'h-14 px-9 text-base gap-3'
};

const iconSizes: Record<PillButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18
};

export function PillButton(props: PillButtonProps) {
  const {
    children,
    size = 'md',
    showArrow = true,
    loading = false,
    fullWidth = false,
    className
  } = props;

  const isDisabled = Boolean(props.disabled) || loading;
  const iconSize = iconSizes[size];

  const classes = twMerge(
    'group inline-flex select-none items-center justify-center whitespace-nowrap rounded-full',
    'bg-[#4F6B58] font-semibold uppercase tracking-[0.12em] text-white shadow-sm',
    'transition-colors duration-200 hover:bg-[#3E5646] active:bg-[#33473A]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6B58] focus-visible:ring-offset-2',
    sizeClasses[size],
    fullWidth && 'w-full',
    isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
    className
  );

  const content =
  <>
      <span>{children}</span>
      {loading ?
    <Loader2Icon size={iconSize} className="animate-spin" aria-hidden="true" /> :
    showArrow ?
    <ArrowRightIcon
      size={iconSize}
      strokeWidth={2.75}
      className="transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true" /> :

    null}
    </>;


  if (props.href !== undefined) {
    const {
      children: _c,
      size: _s,
      showArrow: _a,
      loading: _l,
      fullWidth: _f,
      className: _cn,
      disabled: _d,
      ...rest
    } = props as AnchorProps;
    return (
      <a
        {...rest}
        className={classes}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        tabIndex={isDisabled ? -1 : rest.tabIndex}>
        
        {content}
      </a>);

  }

  const {
    children: _c,
    size: _s,
    showArrow: _a,
    loading: _l,
    fullWidth: _f,
    className: _cn,
    disabled: _d,
    type = 'button',
    ...rest
  } = props as ButtonProps;
  return (
    <button
      {...rest}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}>
      
      {content}
    </button>);

}