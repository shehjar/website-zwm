import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  XIcon } from
'lucide-react';
import { twMerge } from 'tailwind-merge';

export type FormStatus = 'success' | 'error' | 'info' | 'loading';

export interface FormStatusMessageProps {
  /** Visual and semantic status of the message */
  status: FormStatus;
  /** Bold headline, e.g. "Vielen Dank!" */
  title?: string;
  /** Supporting message text */
  message?: React.ReactNode;
  /** Controls visibility (animated in/out). Defaults to true */
  visible?: boolean;
  /** Shows a dismiss button when provided */
  onDismiss?: () => void;
  /** Optional action (e.g. retry button) rendered under the message */
  action?: React.ReactNode;
  className?: string;
}

const styles: Record<
  FormStatus,
  {wrap: string;icon: string;title: string;Icon: React.ElementType;}> =
{
  success: {
    wrap: 'border-green-200 bg-green-50 text-green-900',
    icon: 'text-green-600',
    title: 'text-green-900',
    Icon: CheckCircle2Icon
  },
  error: {
    wrap: 'border-red-200 bg-red-50 text-red-900',
    icon: 'text-red-600',
    title: 'text-red-900',
    Icon: AlertCircleIcon
  },
  info: {
    wrap: 'border-sky-200 bg-sky-50 text-sky-900',
    icon: 'text-sky-600',
    title: 'text-sky-900',
    Icon: InfoIcon
  },
  loading: {
    wrap: 'border-gray-200 bg-gray-50 text-gray-800',
    icon: 'text-gray-500 animate-spin',
    title: 'text-gray-900',
    Icon: Loader2Icon
  }
};

export function FormStatusMessage({
  status,
  title,
  message,
  visible = true,
  onDismiss,
  action,
  className
}: FormStatusMessageProps) {
  const s = styles[status];
  const Icon = s.Icon;
  const isError = status === 'error';

  return (
    <AnimatePresence initial={false}>
      {visible &&
      <motion.div
        key={status}
        role={isError ? 'alert' : 'status'}
        aria-live={isError ? 'assertive' : 'polite'}
        aria-busy={status === 'loading' || undefined}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={twMerge(
          'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm',
          s.wrap,
          className
        )}>
        
          <Icon
          className={twMerge('mt-0.5 h-5 w-5 shrink-0', s.icon)}
          aria-hidden="true" />
        
          <div className="min-w-0 flex-1">
            {title &&
          <p className={twMerge('font-semibold leading-5', s.title)}>
                {title}
              </p>
          }
            {message &&
          <div className={twMerge('leading-5 opacity-90', title && 'mt-1')}>
                {message}
              </div>
          }
            {action && <div className="mt-3">{action}</div>}
          </div>
          {onDismiss &&
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Meldung schließen"
          className="-m-1 rounded-md p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current">
          
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
        }
        </motion.div>
      }
    </AnimatePresence>);

}