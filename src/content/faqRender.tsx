import React from 'react';

/**
 * Wandelt eine FAQ-Antwort aus `./faq` in JSX um: `**Text**` wird zu
 * <strong>Text</strong>, der Rest bleibt normaler Text. Bewusst minimal
 * gehalten (keine Markdown-Bibliothek) — Fett ist die einzige Auszeichnung,
 * die die FAQ-Antworten verwenden.
 */
export function renderFaqAnswer(answer: string): React.ReactNode {
  const parts = answer.split('**');
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}
