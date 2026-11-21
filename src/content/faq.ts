/**
 * src/content/faq.ts — ONE source for all FAQ content.
 *
 * Answers are plain text with `**bold**` markup (like Markdown). Both
 * worlds are derived from it so content never has to be maintained twice:
 *  - visible UI: `renderFaqAnswer()` from `./faqRender` produces JSX with <strong>
 *  - SEO/AEO: `faqPlainText()` produces plain text for the FAQPage JSON-LD
 *
 * Edit content here → UI, schema, and prerendered HTML all update
 * automatically on the next build.
 *
 * NOTE: the answer *texts* are German website content — do not translate
 * them (language policy, see AGENTS.md). Only comments/docs are English.
 *
 * NOTE: This file must NOT import React — it is also used by `src/seo.ts`,
 * which is loaded from `vite.config.ts` (Node context).
 */

export interface FaqEntry {
  question: string;
  /** Answer as plain text; `**Text**` renders bold in the UI. */
  answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: 'Was ist in der Getränkepauschale enthalten?',
    answer:
      'Jeder Preis ist ein **Pauschalpreis für dein ganzes Fest** (nicht pro Person) und enthält: ' +
      '**ein Getränk pro Person** – wir bieten ausschließlich Aperol Spritz und verschiedene ' +
      'Aperol-Kreationen an, eine Übersicht findest du unter Rezepte –, die **Selbstbedienungsbar** ' +
      '(Aufbau, Vorbereitung und Abbau sind bereits Bestandteil der Buchung; ein Ausschank oder ' +
      'eine Betreuung der Gäste vor Ort ist nicht vorgesehen) sowie **Wagenmiete & Dekoration**. ' +
      'Die Anfahrt ist bis 50 km inklusive, für jeden weiteren Kilometer berechnen wir 3,00 €.'
  },
  {
    question: 'Kann ich zusätzliche Dekoration dazubuchen?',
    answer:
      'Ja – zusätzlich zur **Dekoration, die in jeder Pauschale bereits enthalten ist**, ' +
      'bieten wir weitere Dekoelemente: eine **Regalleiter für 20,00 €**, **Obstkisten für ' +
      '15,00 €** (im Set zu drei Stück – der Preis gilt für alle drei Kisten zusammen) und ' +
      'eine **Palette für 10,00 €**, die wir auf Wunsch individuell und passend zu eurem ' +
      'Anlass beschriften. Weitere Bilder und Inspirationen findest du unter „Unsere Events“.'
  },
  {
    question: 'Gibt es auch alkoholfreie Getränke?',
    answer:
      'Ja – alle unsere Getränke gibt es auch als **alkoholfreie Variante**. Du kannst also jeden ' +
      'der drei Spritz aus der Getränkeübersicht ohne Alkohol genießen. Eine Übersicht aller ' +
      'Getränke findest du unter Rezepte.'
  },
  {
    question: 'Wie viel Platz braucht der Wagen und braucht er Strom?',
    answer:
      'Der Wagen passt auf eine Stellfläche von etwa **3 × 1,5 m** und braucht keinen eigenen ' +
      'Stromanschluss. Am besten ist ein ebener Untergrund – wir richten alles für dich ein.'
  },
  {
    question: 'Wie läuft Aufbau und Abbau ab?',
    answer:
      'Aufbau, Vorbereitung und Abbau sind bereits **in der Buchung enthalten**. Wir liefern den ' +
      'Wagen an, bauen auf und holen ihn nach dem Fest wieder ab – für dich bleibt nichts zu tun.'
  },
  {
    question: 'Was passiert bei einer Anfahrt über 50 km?',
    answer:
      'Die Anfahrt bis **50 km ist inklusive** – unser Zuhause ist Nürnberg, in der ganzen ' +
      'Metropolregion (Fürth, Erlangen, Schwabach & Umland) sind wir schnell bei dir. Für jeden ' +
      'weiteren Kilometer berechnen wir 3,00 €, und auf Anfrage kommen wir **auch deutschlandweit** ' +
      'zu deinem Fest. Die Entfernung klären wir gemeinsam bei deiner Anfrage.'
  },
  {
    question: 'Wie läuft die Buchung konkret ab?',
    answer:
      'Deine Anfrage ist **unverbindlich und kostenlos**. Wir prüfen, ob der Wagen an deinem ' +
      'Wunschtermin frei ist, und melden uns in der Regel innerhalb von 24 Stunden bei dir. ' +
      'Verbindlich wird es erst, wenn wir alle Details gemeinsam besprochen haben.'
  }
];

/**
 * Strips the `**` markup → plain text for the JSON-LD (FAQPage schema),
 * meta descriptions, and all other SEO/AEO consumers.
 */
export function faqPlainText(answer: string): string {
  // split/join instead of replaceAll: tsconfig lib is ES2020 (replaceAll = ES2021)
  return answer.split('**').join('');
}
