import React, { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2Icon, InstagramIcon } from 'lucide-react';
import { PillInput } from '../PillInput';
import type { FieldShape } from '../PillInput';
import { PillSelect, EVENT_TYPE_OPTIONS } from '../PillSelect';
import { PillDateInput } from '../PillDateInput';
import { PillTextarea } from '../PillTextarea';
import { ConsentCheckbox } from '../ConsentCheckbox';
import { PillButton } from '../PillButton';
import { FormStatusMessage } from '../FormStatusMessage';

/** Inbox that receives all inquiries. */
export const INQUIRY_RECIPIENT = 'zumwohlmobil@gmail.com';

/**
 * Default delivery uses FormSubmit (no backend needed).
 * One-time setup: the FIRST submission triggers an activation email to
 * INQUIRY_RECIPIENT — click "Activate" in that email, then all later
 * inquiries are delivered. Mention FormSubmit as a processor in the Datenschutzerklärung.
 */
export const INQUIRY_ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_RECIPIENT}`;

export type InquiryFormValues = {
  name: string;
  phone: string;
  email: string;
  date: string;
  eventType: string;
  location: string;
  guests: string;
  message: string;
  consent: boolean;
};

type FieldKey = keyof InquiryFormValues;
type Errors = Partial<Record<FieldKey, string>>;

export interface InquiryFormProps {
  /** Form heading */
  title?: string;
  /** Short intro line under the heading */
  intro?: string;
  /** Pre-fill guest count, e.g. from a clicked PricingTierCard (`30`, `60`, `90`). `null` = individual offer. */
  initialGuests?: number | null;
  /** Pre-select event type value (see EVENT_TYPE_OPTIONS) */
  initialEventType?: string;
  /** Field corner style. `rounded` matches the Canva design, `pill` the website rule. */
  shape?: FieldShape;
  /** Datenschutz page URL */
  privacyHref?: string;
  /**
   * Called with validated values. Throw to show the error state.
   * Wire this to your mail/form service; default only simulates sending.
   */
  onSubmit?: (values: InquiryFormValues, recipient: string) => Promise<void>;
  className?: string;
}

const EMPTY: InquiryFormValues = {
  name: '',
  phone: '',
  email: '',
  date: '',
  eventType: '',
  location: '',
  guests: '',
  message: '',
  consent: false
};

const FIELD_ORDER: FieldKey[] = ['name', 'phone', 'email', 'date', 'eventType', 'location', 'guests', 'consent'];

export function InquiryForm({
  title = 'Anfrageformular',
  intro = 'Erzähl uns von deinem Fest – wir melden uns persönlich bei dir.',
  initialGuests,
  initialEventType = '',
  shape = 'rounded',
  privacyHref = '/datenschutz',
  onSubmit = sendViaFormSubmit,
  className = ''
}: InquiryFormProps) {
  const headingId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<InquiryFormValues>({
    ...EMPTY,
    eventType: initialEventType,
    guests: typeof initialGuests === 'number' ? String(initialGuests) : ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const today = new Date().toISOString().slice(0, 10);
  const lastPrefill = useRef(initialGuests);

  // Pre-fill only the guest count when a pricing tier is clicked; keep all other input.
  useEffect(() => {
    if (initialGuests === lastPrefill.current) return;
    lastPrefill.current = initialGuests;
    const next = typeof initialGuests === 'number' ? String(initialGuests) : '';
    setValues((v) => (v.guests === next ? v : { ...v, guests: next }));
    if (errors.guests) setErrors((e) => ({ ...e, guests: undefined }));
  }, [initialGuests, errors.guests]);

  const set = <K extends FieldKey,>(key: K, value: InquiryFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values, today);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await onSubmit(values, INQUIRY_RECIPIENT);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section
        aria-labelledby={headingId}
        className={`w-full rounded-[32px] bg-card px-6 py-12 text-center md:px-12 ${className}`}>
        
        <CheckCircle2Icon className="mx-auto h-10 w-10 text-primary" strokeWidth={1.5} aria-hidden="true" />
        <h2 id={headingId} className="mt-4 text-5xl text-text" style={{ fontFamily: 'Allura, cursive' }}>
          Danke, {values.name.split(' ')[0]}!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text">
          Deine Anfrage ist bei uns angekommen. Sie ist <strong>unverbindlich</strong> und{' '}
          <strong>noch keine Buchung</strong>. Wir prüfen, ob unser Wagen an deinem Wunschtermin frei ist, und melden
          uns in der Regel innerhalb von 24 Stunden persönlich bei dir, um alles Weitere zu besprechen.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <PillButton href="https://www.instagram.com/zumwohlmobil/" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 normal-case tracking-normal">
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />@zumwohlmobil auf Instagram folgen
            </span>
          </PillButton>
          <button
            type="button"
            onClick={() => {
              setValues({ ...EMPTY, guests: values.guests });
              setStatus('idle');
            }}
            className="rounded-sm text-sm text-muted-text underline underline-offset-2 transition-colors hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          
            Weitere Anfrage senden
          </button>
        </div>
      </section>);

  }

  const sending = status === 'sending';
  const guestHint =
  initialGuests === null ?
  'Ab 91 Gästen erstellen wir dir ein individuelles Angebot.' :
  'Bis 30, 60 oder 90 Gäste – oder mehr für ein individuelles Angebot.';

  return (
    <section aria-labelledby={headingId} className={`w-full ${className}`}>
      <header className="mb-8">
        <h2 id={headingId} className="text-3xl font-light text-text md:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-2 text-base text-text">{intro}</p>}
        <p className="mt-1 text-sm text-muted-text">Felder mit * sind Pflichtfelder.</p>
      </header>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset disabled={sending} className="contents">
          <legend className="sr-only">Kontaktdaten</legend>
          <PillInput
            shape={shape}
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            error={errors.name} />
          
          <div className="grid gap-6 md:grid-cols-2">
            <PillInput
              shape={shape}
              label="Telefonnummer (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set('phone', e.target.value)}
              error={errors.phone} />
            
            <PillInput
              shape={shape}
              label="E-Mail-Adresse"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email} />
            
          </div>
        </fieldset>

        <fieldset disabled={sending} className="contents">
          <legend className="sr-only">Deine Veranstaltung</legend>
          <div className="grid gap-6 md:grid-cols-2">
            <PillDateInput
              shape={shape}
              name="date"
              required
              min={today}
              value={values.date}
              onChange={(v) => set('date', v)}
              error={errors.date} />
            
            <PillSelect
              shape={shape}
              name="eventType"
              required
              options={EVENT_TYPE_OPTIONS}
              value={values.eventType}
              onChange={(e) => set('eventType', e.target.value)}
              error={errors.eventType} />
            
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <PillInput
              shape={shape}
              label="Ort der Veranstaltung"
              name="location"
              placeholder="z. B. Bonn oder Location-Name"
              required
              value={values.location}
              onChange={(e) => set('location', e.target.value)}
              error={errors.location}
              hint="Bis 50 km ist die Anfahrt inklusive." />
            
            <PillInput
              shape={shape}
              label="Personenanzahl"
              name="guests"
              type="number"
              min={1}
              required
              value={values.guests}
              onChange={(e) => set('guests', e.target.value)}
              error={errors.guests}
              hint={guestHint} />
            
          </div>
          <PillTextarea
            className={shape === 'rounded' ? '!rounded-2xl' : ''}
            label="Möchtest du uns noch etwas mitteilen?"
            name="message"
            rows={4}
            maxLength={1000}
            showCount
            placeholder="Uhrzeit, besondere Wünsche, Fragen …"
            value={values.message}
            onChange={(e) => set('message', e.target.value)} />
          
        </fieldset>

        <ConsentCheckbox
          name="consent"
          privacyHref={privacyHref}
          checked={values.consent}
          onChange={(v) => set('consent', v)}
          error={errors.consent}
          disabled={sending} />
        

        {status === 'error' &&
        <FormStatusMessage
          status="error"
          title="Das hat leider nicht geklappt"
          message={
            <>
              Deine Anfrage konnte nicht gesendet werden. Bitte versuch es gleich noch einmal oder schreib uns
              direkt an{' '}
              <a
                href={`mailto:${INQUIRY_RECIPIENT}`}
                className="font-semibold underline underline-offset-2">
                {INQUIRY_RECIPIENT}
              </a>
              .
            </>
          }
          onDismiss={() => setStatus('idle')} />

        }

        <div className="mt-2 flex flex-col gap-3">
          <PillButton type="submit" size="lg" fullWidth loading={sending}>
            {sending ? 'Wird gesendet' : 'Anfrage absenden'}
          </PillButton>
          <p className="text-center text-sm text-muted-text">
            Wir melden uns in der Regel innerhalb von 24 Stunden bei dir.
          </p>
          <div className="space-y-2 text-center text-sm leading-relaxed text-muted-text">
            <p>
              Das Absenden des Formulars ist eine unverbindliche Anfrage und noch keine Buchung. Nach Eingang deiner
              Anfrage prüfen wir zunächst, ob unser Wagen an deinem Wunschtermin noch verfügbar ist.
            </p>
            <p>
              Ist der Termin bereits vergeben, erhältst du von uns schnellstmöglich eine entsprechende Absage. Ist
              dein Wunschtermin noch frei, melden wir uns persönlich bei dir, um die weiteren Details zu besprechen.
            </p>
          </div>
        </div>
      </form>
    </section>);

}

export function validate(v: InquiryFormValues, today: string): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Bitte gib deinen Namen ein.';
  if (v.phone.trim() && !/^[+\d][\d\s/()-]{5,}$/.test(v.phone.trim()))
    e.phone = 'Diese Telefonnummer sieht nicht ganz richtig aus.';
  if (!v.email.trim()) e.email = 'Bitte gib deine E-Mail-Adresse ein.';else
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Bitte prüf deine E-Mail-Adresse.';
  if (!v.date) e.date = 'Bitte wähle deinen Wunschtermin.';else
  if (v.date < today) e.date = 'Der Termin liegt in der Vergangenheit.';
  if (!v.eventType) e.eventType = 'Bitte wähle die Art der Veranstaltung.';
  if (!v.location.trim()) e.location = 'Wo soll gefeiert werden?';
  const g = Number(v.guests);
  if (!v.guests) e.guests = 'Wie viele Gäste erwartest du?';else
  if (!Number.isInteger(g) || g < 1) e.guests = 'Bitte gib eine ganze Zahl ab 1 ein.';
  if (!v.consent) e.consent = 'Bitte stimm der Datenschutzerklärung zu, damit wir dir antworten können.';
  return e;
}

const EVENT_LABELS: Record<string, string> = {
  hochzeit: 'Hochzeit',
  geburtstag: 'Geburtstag',
  firmenfeier: 'Firmenfeier',
  jubilaeum: 'Jubiläum',
  sonstiges: 'Sonstiges'
};

/** Default handler: delivers the inquiry to INQUIRY_RECIPIENT via FormSubmit. */
export async function sendViaFormSubmit(values: InquiryFormValues, recipient: string) {
  const date = values.date ? values.date.split('-').reverse().join('.') : '';
  const res = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Neue Anfrage: ${EVENT_LABELS[values.eventType] ?? values.eventType} am ${date}`,
      _replyto: values.email,
      _template: 'table',
      _captcha: 'false',
      Name: values.name,
      Telefonnummer: values.phone || '–',
      'E-Mail-Adresse': values.email,
      Wunschtermin: date,
      'Art der Veranstaltung': EVENT_LABELS[values.eventType] ?? values.eventType,
      'Ort der Veranstaltung': values.location,
      Personenanzahl: values.guests,
      Nachricht: values.message || '–',
      Datenschutz: values.consent ? 'zugestimmt' : 'nicht zugestimmt'
    })
  });
  if (!res.ok) throw new Error(`Send failed: ${res.status}`);
  const data = (await res.json().catch(() => ({}))) as {success?: string | boolean;};
  if (data.success === false || data.success === 'false') throw new Error('Send failed');
}