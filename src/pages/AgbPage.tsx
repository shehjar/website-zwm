import { LegalPage, PlaceholderNotice } from './LegalPage';

/**
 * PLACEHOLDER AGB.
 * Replace with the final terms the business actually wants to use.
 * Typical sections for an event-rental business are listed as a skeleton.
 */
export function AgbPage() {
  return (
    <LegalPage title="AGB" subtitle="Allgemeine Geschäftsbedingungen">
      <PlaceholderNotice />

      <section>
        <h2>1. Geltungsbereich</h2>
        <p>[TODO – Für wen und welche Leistungen gelten die AGB?]</p>
      </section>

      <section>
        <h2>2. Buchung und Vertragsschluss</h2>
        <p>
          [TODO – z. B.: Anfrage über das Formular ist unverbindlich; der
          Vertrag kommt erst durch Bestätigung zustande.]
        </p>
      </section>

      <section>
        <h2>3. Preise und Zahlung</h2>
        <p>
          [TODO – Pauschalpreise, Anzahlung, Fälligkeit, Anfahrt ab 51 km
          (3,00 € pro km) usw.]
        </p>
      </section>

      <section>
        <h2>4. Stornierung und Rücktritt</h2>
        <p>[TODO – Fristen und Stornogebühren]</p>
      </section>

      <section>
        <h2>5. Mitwirkungspflichten der Kunden</h2>
        <p>
          [TODO – z. B. ebene Stellfläche ca. 3 × 1,5 m, Zufahrt, kein
          Stromanschluss erforderlich]
        </p>
      </section>

      <section>
        <h2>6. Haftung</h2>
        <p>[TODO – Haftungsumfang, Aufsichtspflicht der Gäste an der Selbstbedienungsbar]</p>
      </section>

      <section>
        <h2>7. Schlussbestimmungen</h2>
        <p>[TODO – Anwendbares Recht, Gerichtsstand, Salvatorische Klausel]</p>
      </section>
    </LegalPage>
  );
}
