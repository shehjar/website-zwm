import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SiteFooter } from '@/components/SiteFooter';
import { PageBackdrop } from '@/components/PageBackdrop';

/**
 * Shared layout for the legal pages (Impressum, Datenschutz, AGB).
 * Deliberately simpler than the main SiteHeader: its nav links are hash
 * anchors that only resolve on the home page.
 */
export interface LegalPageProps {
  /** Page title, e.g. "Impressum" */
  title: string;
  /** Short subtitle, e.g. "Angaben gemäß § 5 TMG" */
  subtitle?: string;
  children: React.ReactNode;
}

/** Yellow-ish notice shown while the legal texts are still placeholders. */
export function PlaceholderNotice() {
  return (
    <p className="mb-8 rounded-2xl border border-accent/40 bg-wash px-5 py-4 text-sm leading-relaxed text-text">
      <strong>Hinweis:</strong> Diese Seite enthält derzeit einen Platzhaltertext.
      Der endgültige Rechtstext wird vor der Veröffentlichung eingesetzt.
    </p>
  );
}

export function LegalPage({ title, subtitle, children }: LegalPageProps) {
  React.useEffect(() => {
    document.title = `${title} – Zum Wohl Mobil`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background">
      <PageBackdrop />

      <header className="sticky top-0 z-40 w-full border-b border-wash bg-background">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 md:h-24 md:px-8">
          <Link
            to="/"
            aria-label="Zum Wohl Mobil – Startseite"
            className="inline-flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Logo size="lg" className="[&_img]:h-[56px] md:[&_img]:h-[76px]" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm text-sm text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
          <h1 className="text-4xl font-light text-text md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-2 text-base text-muted-text">{subtitle}</p>}
          <div className="mt-10 rounded-[32px] bg-card/60 px-6 py-8 md:px-10 md:py-10">
            <div className="legal-content flex flex-col gap-6 text-base leading-relaxed text-text">
              {children}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
