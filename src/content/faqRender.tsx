import React from 'react';

/**
 * Converts a FAQ answer from `./faq` into JSX: `**Text**` becomes
 * <strong>Text</strong>, everything else stays plain text. Deliberately
 * minimal (no Markdown library) — bold is the only markup the FAQ answers
 * use.
 */
export function renderFaqAnswer(answer: string): React.ReactNode {
  const parts = answer.split('**');
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}
