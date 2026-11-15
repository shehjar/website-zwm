import { LegalPage, PlaceholderNotice } from './LegalPage';

/**
 * Impressum — PARTIAL DRAFT.
 * Identity data taken from the final privacy policy (owner statement,
 * 2026-10-25): Claire Turi is the sole operator.
 * VAT question settled: small business under § 19 UStG, no VAT ID
 * (see the "Umsatzsteuer" section). As soon as the final eRecht24
 * Impressum text arrives, replace this page 1:1 and remove the
 * PlaceholderNotice.
 */
export function ImpressumPage() {
  return (
    <LegalPage title="Impressum" subtitle="Angaben gemäß § 5 DDG">
      <PlaceholderNotice />

      <section>
        <h2>Anbieter</h2>
        <p>
          Zum Wohl Mobil
          <br />
          Claire Turi
          <br />
          Helenenstraße 38
          <br />
          90419 Nürnberg
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: 01774471833
          <br />
          E-Mail:{' '}
          <a href="mailto:zumwohlmobil@gmail.com">zumwohlmobil@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Claire Turi
          <br />
          Helenenstraße 38
          <br />
          90419 Nürnberg
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
        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit und nicht
          verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalPage>
  );
}
