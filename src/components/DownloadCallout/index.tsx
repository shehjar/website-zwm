import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { PillButton } from '../PillButton';

/** Current price list (A4). Swap for the real PDF once exported from Canva. */
export const PRICE_LIST_URL = '/Preisliste_fur_PDF.pdf';


export interface DownloadCalloutProps {
  /** Description, e.g. "Unsere Preise als PDF herunterladen" */
  text?: string;
  buttonLabel?: string;
  /** File URL. When missing, the button is disabled ("bald verfügbar"). */
  href?: string;
  /** Suggested file name for download */
  fileName?: string;
  /** Small meta line, e.g. "PDF · 180 KB" */
  meta?: string;
  className?: string;
}

export function DownloadCallout({
  text = 'Unsere Preisliste herunterladen',
  buttonLabel = 'Herunterladen',
  href = PRICE_LIST_URL,
  fileName = 'Zum-Wohl-Mobil-Preisliste.pdf',
  meta = 'Preisliste · A4',
  className = ''
}: DownloadCalloutProps) {
  return (
    <div
      className={`flex w-full flex-col items-center gap-5 rounded-[32px] border border-border px-6 py-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left ${className}`}>
      
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-text">
          
          <FileTextIcon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-base text-text">{text}</p>
          <p className="text-sm text-muted-text">{href ? meta : 'Bald verfügbar'}</p>
        </div>
      </div>
      {href ?
      <PillButton href={href} download={fileName} target="_blank" rel="noopener noreferrer">
          {buttonLabel}
        </PillButton> :

      <PillButton disabled>{buttonLabel}</PillButton>
      }
    </div>);

}