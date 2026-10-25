import { LegalPage, PlaceholderNotice } from './LegalPage';

/**
 * Impressum — TEILENTWURF.
 * Identitätsdaten übernommen aus der finalen Datenschutzerklärung
 * (Inhaber-Angabe, 25.10.2026): Claire Turi ist alleinige Betreiberin.
 * Offen bleibt: USt-IdNr./Kleinunternehmerregelung. Sobald der finale
 * eRecht24-Impressumstext vorliegt, diese Seite 1:1 ersetzen und die
 * PlaceholderNotice entfernen.
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
        <h2>Umsatzsteuer-ID</h2>
        <p>
          [USt-IdNr. TODO, falls vorhanden – sonst Hinweis auf
          Kleinunternehmerregelung gem. § 19 UStG prüfen]
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
