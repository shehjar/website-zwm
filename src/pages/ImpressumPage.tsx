import { LegalPage, PlaceholderNotice } from './LegalPage';

/**
 * PLACEHOLDER Impressum.
 * Replace the TODO fields with the real business details before launch.
 * Pflichtangaben für eine deutsche Geschäftswebsite (§ 5 DDG, § 18 MStV).
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
          Claire [Nachname TODO] &amp; Haider [Nachname TODO]
          <br />
          [Straße und Hausnummer TODO]
          <br />
          [PLZ und Ort TODO]
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail:{' '}
          <a href="mailto:zumwohlmobil@gmail.com">zumwohlmobil@gmail.com</a>
          <br />
          Telefon: [Telefonnummer TODO – empfohlen]
        </p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          [Vor- und Nachname sowie Anschrift der verantwortlichen Person TODO]
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
