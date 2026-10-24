import { LegalPage, PlaceholderNotice } from './LegalPage';

/**
 * PLACEHOLDER Datenschutzerklärung.
 * Must be replaced/finalised before launch. It has to cover every third-party
 * service this site actually uses:
 *  - Hosting: Netlify (server logs)
 *  - Kontaktformular: FormSubmit.co (verarbeitet personenbezogene Daten, USA)
 *  - Google Fonts: werden derzeit vom Google-CDN geladen (fonts.googleapis.com)
 *    → Alternative: Fonts selbst hosten, dann entfällt dieser Punkt
 *  - Rezeptbilder: inzwischen selbst gehostet (keine Pexels-Aufrufe mehr)
 */
export function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" subtitle="gemäß DSGVO">
      <PlaceholderNotice />

      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          [Name und Anschrift wie im Impressum TODO]
          <br />
          E-Mail: <a href="mailto:zumwohlmobil@gmail.com">zumwohlmobil@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>2. Hosting bei Netlify</h2>
        <p>
          Diese Website wird bei Netlify, Inc. gehostet. Beim Aufruf der Seite
          werden technisch notwendige Zugriffsdaten (z. B. IP-Adresse,
          Browser, Zeitpunkt) in Server-Logfiles verarbeitet.
          [Formulierung TODO – Auftragsverarbeitungsvertrag /
          Standardvertragsklauseln prüfen]
        </p>
      </section>

      <section>
        <h2>3. Kontaktformular (FormSubmit)</h2>
        <p>
          Wenn du das Anfrageformular nutzt, werden deine Angaben (Name,
          Kontaktdaten, Veranstaltungsdaten, Nachricht) zum Zweck der
          Bearbeitung deiner Anfrage über den Dienst FormSubmit.co an uns
          übermittelt und per E-Mail zugestellt. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
          [Formulierung TODO – Hinweis auf Datenverarbeitung in den USA /
          Auftragsverarbeitung ergänzen]
        </p>
      </section>

      <section>
        <h2>4. Google Fonts</h2>
        <p>
          Diese Seite lädt Schriftarten (Google Fonts) von Servern der Google
          Ireland Limited. Dabei wird deine IP-Adresse an Google übermittelt.
          [Formulierung TODO – alternativ: Fonts selbst hosten und diesen
          Abschnitt entfernen]
        </p>
      </section>

      <section>
        <h2>5. Deine Rechte</h2>
        <p>
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          sowie ein Beschwerderecht bei einer Aufsichtsbehörde.
          [Ausformulierung TODO]
        </p>
      </section>
    </LegalPage>
  );
}
