import { LegalPage } from './LegalPage';

/**
 * Impressum — FINAL (owner-provided eRecht24 text, 2026-11-21).
 * Published with owner-approved corrections to the generated text:
 *  - E-mail typo fixed (double dot → zumwohlmobil@gmail.com).
 *  - Phone confirmed as 0177 4471833, displayed as +49 (0) 177 4471833
 *    (the generated text had 0176 — wrong digit).
 *  - Telefax line dropped (not required under § 5 DDG).
 *  - "Umsatzsteuer-ID" section (invalid generator placeholder) replaced
 *    by the § 19 UStG note: Claire is a Kleinunternehmerin, no VAT ID.
 * NAP data must stay in sync with src/seo.ts (see AGENTS.md).
 */
export function ImpressumPage() {
  return (
    <LegalPage title="Impressum" subtitle="Angaben gemäß § 5 DDG">
      <section>
        <p>
          Claire Turi
          <br />
          Zum Wohl Mobil
          <br />
          Helenenstraße 38
          <br />
          90419 Nürnberg
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: +49 (0) 177 4471833
          <br />
          E-Mail:{' '}
          <a href="mailto:zumwohlmobil@gmail.com">zumwohlmobil@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>Umsatzsteuer</h2>
        <p>
          Es wird keine Umsatzsteuer ausgewiesen, da die Anbieterin als
          Kleinunternehmerin im Sinne des § 19 UStG gilt.
        </p>
      </section>

      <section>
        <h2>Aufsichtsbehörde</h2>
        <p>
          Stadt Nürnberg - Ordnungsamt
          <br />
          Innerer Laufer Pl. 3,
          <br />
          90403 Nürnberg
        </p>
        <p>
          <a
            href="https://www.nuernberg.de/internet/ordnungsamt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.nuernberg.de/internet/ordnungsamt/
          </a>
        </p>
      </section>

      <section>
        <h2>Redaktionell verantwortlich</h2>
        <p>
          Shehjar Kaul
          <br />
          Am Stadtpark 41
          <br />
          90409 Nürnberg
        </p>
      </section>

      <section>
        <h2>
          Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
        </h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <p>
        Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a>
      </p>
    </LegalPage>
  );
}