import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { PillButton } from '../PillButton';
export type MobileMenuLink = {
  label: string;
  href: string;
};

export type MobileMenuOverlayProps = {
  /** Navigation links. Defaults to the Zum Wohl Mobil main nav. */
  links?: MobileMenuLink[];
  /** href of the currently active page – receives the active marker. */
  activeHref?: string;
  /** Logo element rendered in the overlay header. Falls back to a wordmark. */
  logo?: React.ReactNode;
  /** Called when a link is clicked (menu closes automatically). */
  onNavigate?: (link: MobileMenuLink, event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Fires when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Hide the trigger + overlay at the lg breakpoint and above. Default true. */
  hideOnDesktop?: boolean;
  className?: string;
};

export const DEFAULT_MOBILE_MENU_LINKS: MobileMenuLink[] = [
{ label: 'Start', href: '#start' },
{ label: 'Mietablauf', href: '#mietablauf' },
{ label: 'Preise', href: '#preise' },
{ label: 'Rezepte', href: '#rezepte' },
{ label: 'Über uns', href: '#ueber-uns' },
{ label: 'Kontakt', href: '#kontakt' }];


const FOCUSABLE =
'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenuOverlay({
  links = DEFAULT_MOBILE_MENU_LINKS,
  activeHref,
  logo,
  onNavigate,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  hideOnDesktop = true,
  className = ''
}: MobileMenuOverlayProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  const titleId = useId();
  const navId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Focus management, scroll lock & Escape
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const t = window.setTimeout(() => closeRef.current?.focus(), 0);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
          return;
        }
        if (e.key !== 'Tab' || !dialogRef.current) return;
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((n) => n.offsetParent !== null || n === document.activeElement);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      wasOpen.current = true;
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = prevOverflow;
        document.removeEventListener('keydown', onKeyDown);
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
    return undefined;
  }, [open, setOpen]);

  const visibility = hideOnDesktop ? 'lg:hidden' : '';

  return (
    <div className={`${visibility} ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={navId}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#2F3B33] transition-colors hover:bg-[#E3EADF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E7A63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F1]">
        
        <MenuIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          ref={dialogRef}
          key="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-[#EEF2EB] text-[#2F3B33]">
          
            <h2 id={titleId} className="sr-only">
              Hauptmenü
            </h2>

            <div className="flex items-center justify-between px-6 py-5 sm:px-10">
              <div className="flex items-center">
                {logo ??
              <span className="font-['Jost',sans-serif] text-lg font-medium uppercase tracking-[0.18em]">
                    Zum Wohl Mobil
                  </span>
              }
              </div>
              <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#2F3B33] transition-colors hover:bg-[#DDE6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E7A63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF2EB]">
              
                <XIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav
            id={navId}
            aria-label="Hauptnavigation"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-12 pt-4 sm:px-10">
            
              <motion.ul
              className="my-auto flex w-full flex-col gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
              }}>
              
                {links.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
                    }}>
                    
                      <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        onNavigate?.(link, e);
                        setOpen(false);
                      }}
                      className={`group relative inline-flex items-center gap-4 rounded-md py-2 pr-2 font-['Jost',sans-serif] text-3xl font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E7A63] focus-visible:ring-offset-4 focus-visible:ring-offset-[#EEF2EB] sm:text-4xl ${
                      isActive ? 'text-[#2F3B33]' : 'text-[#2F3B33]/70 hover:text-[#2F3B33]'}`
                      }>
                      
                        <span
                        aria-hidden="true"
                        className={`h-[2px] transition-all duration-200 ${
                        isActive ?
                        'w-8 bg-[#5E7A63]' :
                        'w-0 bg-[#5E7A63]/60 group-hover:w-4'}`
                        } />
                      
                        {link.label}
                      </a>
                    </motion.li>);

              })}
              </motion.ul>
            </nav>

            <div className="shrink-0 border-t border-[#DDE6D8] px-6 pb-8 pt-5 sm:px-10">
              <PillButton
                href="#kontakt"
                size="lg"
                fullWidth
                onClick={() => setOpen(false)}
                showArrow>
              
                Jetzt anfragen
              </PillButton>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}