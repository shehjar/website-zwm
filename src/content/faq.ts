/**
 * src/content/faq.ts — EINE Quelle für alle FAQ-Inhalte.
 *
 * Die Antworten sind einfacher Text mit `**fett**`-Auszeichnung (wie Markdown).
 * Daraus werden beide Welten abgeleitet, damit Inhalte nie doppelt gepflegt
 * werden müssen:
 *  - sichtbare UI: `renderFaqAnswer()` aus `./faqRender` erzeugt JSX mit <strong>
 *  - SEO/AEO: `faqPlainText()` erzeugt reinen Text für das FAQPage-JSON-LD
 *
 * Inhalt hier ändern → UI, Schema und prerendered HTML aktualisieren sich
 * beim nächsten Build automatisch.
 *
 * Hinweis: Diese Datei darf KEIN React importieren — sie wird auch von
 * `src/seo.ts` genutzt, das wiederum aus `vite.config.ts` (Node-Kontext)
 * geladen wird.
 */

export interface FaqEntry {
  question: string;
  /** Antwort als Klartext; `**Text**` wird in der UI fett gerendert. */
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
 * Entfernt die `**`-Auszeichnung → reiner Text für JSON-LD (FAQPage-Schema),
 * Meta-Beschreibungen und alle weiteren SEO/AEO-Konsumenten.
 */
export function faqPlainText(answer: string): string {
  // split/join statt replaceAll: tsconfig-lib ist ES2020 (replaceAll = ES2021)
  return answer.split('**').join('');
}
