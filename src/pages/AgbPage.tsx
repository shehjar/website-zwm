import { LegalPage } from './LegalPage';

/**
 * AGB — FINAL (owner-provided PDF text, 2026-11-21).
 * Rendered as HTML only — no PDF download: the source PDF (public/AGB.pdf,
 * kept untracked as a local source file) contains an outdated phone number
 * and typos. Owner-approved corrections to the PDF text:
 *  - §3 typo: "aus de jeweiligen" → "aus der jeweiligen".
 *  - §10: "Eine Haftung des Kunden für Schäden, die durch Zum Wohl Mobil …"
 *    was logically broken (customer liable for the provider's own damages);
 *    now "Die Haftung für Schäden, die durch Zum Wohl Mobil …".
 * §12 (Ausschank/Jugendschutz) kept as-is per owner decision despite the
 * self-service model. Business terms (20 % deposit, 3-week cancellation
 * rule, 50 km included / 3,00 € per extra km) match the site copy; the
 * § 19 UStG sentence matches the pricing rule in AGENTS.md.
 */
export function AgbPage() {
  return (
    <LegalPage title="AGB" subtitle="Allgemeine Geschäfts- und Buchungsbedingungen">
      <section>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäfts- und Buchungsbedingungen gelten für alle
          Leistungen von Zum Wohl Mobil im Zusammenhang mit der Bereitstellung
          und Betreuung der mobilen Bar für Veranstaltungen. Abweichende
          Vereinbarungen gelten nur, wenn diese ausdrücklich in Textform
          vereinbart wurden.
        </p>
      </section>

      <section>
        <h2>2. Angebot und Vertragsschluss</h2>
        <p>
          Unsere Angebote sind, sofern nicht anders angegeben, bis zum im
          Angebot genannten Datum gültig. Eine Buchung kommt zustande, sobald
          der Kunde unser Angebot in Textform annimmt und die Buchung von Zum
          Wohl Mobil bestätigt wird.
        </p>
      </section>

      <section>
        <h2>3. Leistungen</h2>
        <p>
          Der konkrete Leistungsumfang ergibt sich aus der jeweiligen
          Buchungsbestätigung. Die Getränkepauschale umfasst die in der
          Buchungsbestätigung aufgeführten Leistungen. Änderungen oder
          zusätzliche Leistungen können nach vorheriger Absprache vereinbart
          und gegebenenfalls zusätzlich berechnet werden.
        </p>
      </section>

      <section>
        <h2>4. Fahrtkosten</h2>
        <p>
          Bis zu einer Entfernung von 50 km sind die Fahrtkosten in den
          jeweiligen Getränkepauschalen enthalten. Für jeden darüber
          hinausgehenden Kilometer berechnen wir 3,00 € pro km.
        </p>
        <p>
          Die im Angebot ausgewiesenen Fahrtkosten beziehen sich auf die für
          die jeweilige Veranstaltung zugrunde gelegte Entfernung.
        </p>
      </section>

      <section>
        <h2>5. Preise und Zahlung</h2>
        <p>
          Es gelten die in der jeweiligen Buchungsbestätigung vereinbarten
          Preise. Mit verbindlicher Buchung wird eine Anzahlung in Höhe von
          20 % des vereinbarten Gesamtbetrags fällig. Die Anzahlung ist
          innerhalb der in der Rechnung angegebenen Zahlungsfrist zu
          begleichen.
        </p>
        <p>
          Sofern nicht anders vereinbart, ist der Rechnungsbetrag bis zum in
          der Rechnung angegebenen Zahlungsziel zu begleichen.
        </p>
        <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.</p>
      </section>

      <section>
        <h2>6. Änderungen der Veranstaltung</h2>
        <p>
          Änderungen hinsichtlich Veranstaltungsort, Datum, Beginn der
          Veranstaltung oder vereinbartem Leistungsumfang sind Zum Wohl Mobil
          möglichst frühzeitig mitzuteilen.
        </p>
        <p>
          Änderungen können Einfluss auf den vereinbarten Preis haben und
          bedürfen gegebenenfalls einer erneuten Abstimmung.
        </p>
      </section>

      <section>
        <h2>7. Stornierung durch den Kunden</h2>
        <p>Eine Stornierung der Buchung ist jederzeit in Textform möglich.</p>
        <p>
          Bei einer Stornierung bis einschließlich 3 Wochen vor dem
          vereinbarten Veranstaltungstermin wird die geleistete Anzahlung in
          Höhe von 20 % des vereinbarten Gesamtbetrags einbehalten. Weitere
          Kosten werden in diesem Fall nicht berechnet.
        </p>
        <p>
          Bei einer Stornierung innerhalb von 3 Wochen vor dem
          Veranstaltungstermin behalten wir uns vor, zusätzlich zur Anzahlung
          weitere bereits entstandene und nicht mehr vermeidbare Kosten in
          Rechnung zu stellen. Hierzu können insbesondere Kosten für bereits
          beschaffte Getränke, Dekoration, Mietgegenstände, Transport sowie
          sonstige im Zusammenhang mit der Veranstaltung beauftragte
          Leistungen gehören.
        </p>
        <p>
          Dem Kunden bleibt der Nachweis vorbehalten, dass kein oder ein
          wesentlich geringerer Schaden entstanden ist.
        </p>
      </section>

      <section>
        <h2>8. Verschiebung der Veranstaltung</h2>
        <p>
          Sollte eine Veranstaltung verschoben werden müssen, bemühen wir uns
          nach Möglichkeit um einen Ersatztermin.
        </p>
        <p>
          Eine Terminverschiebung ist nur nach vorheriger Absprache und
          Verfügbarkeit möglich. Bereits entstandene Kosten können
          gegebenenfalls berechnet werden.
        </p>
      </section>

      <section>
        <h2>9. Veranstaltungsort und Voraussetzungen</h2>
        <p>
          Der Kunde stellt sicher, dass Zum Wohl Mobil zum vereinbarten
          Zeitpunkt Zugang zum Veranstaltungsort erhält und die notwendigen
          Voraussetzungen für Aufbau und Durchführung der Leistung gegeben
          sind. Der für den Barwagen vorgesehene Bereich muss ausreichend groß
          und für den Aufbau geeignet sein.
        </p>
        <p>
          Besondere örtliche Gegebenheiten, Zufahrtsbeschränkungen, Treppen,
          fehlende Parkmöglichkeiten oder sonstige erschwerende Bedingungen
          sind uns vorab mitzuteilen.
        </p>
      </section>

      <section>
        <h2>10. Haftung</h2>
        <p>
          Der Kunde haftet nicht für normale Abnutzung. Für Schäden am
          Barwagen, an Gläsern oder sonstigem Equipment, die durch den Kunden
          oder seine Gäste vorsätzlich oder fahrlässig verursacht werden, kann
          Ersatz verlangt werden.
        </p>
        <p>
          Die Haftung für Schäden, die durch Zum Wohl Mobil oder deren
          Mitarbeiter verursacht wurden, richtet sich nach den gesetzlichen
          Vorschriften.
        </p>
      </section>

      <section>
        <h2>11. Wetter und Veranstaltungen im Freien</h2>
        <p>
          Bei Veranstaltungen im Außenbereich ist vom Kunden sicherzustellen,
          dass die mobile Bar und das Equipment vor starkem Regen, Sturm,
          Hagel, extremer Hitze und anderen witterungsbedingten Gefahren
          geschützt sind.
        </p>
        <p>
          Bei nicht geeigneten Wetterbedingungen kann der Aufbau im
          Außenbereich aus Sicherheitsgründen abgelehnt oder ein geeigneter
          alternativer Standort verlangt werden.
        </p>
      </section>

      <section>
        <h2>12. Ausschank und Jugendschutz</h2>
        <p>
          Der Ausschank alkoholischer Getränke erfolgt unter Beachtung der
          jeweils geltenden gesetzlichen Vorschriften, insbesondere der
          Bestimmungen des Jugendschutzgesetzes.
        </p>
        <p>
          Zum Wohl Mobil ist berechtigt, den Ausschank zu verweigern, wenn
          gesetzliche Voraussetzungen nicht erfüllt sind oder eine Person
          erkennbar stark alkoholisiert ist.
        </p>
      </section>

      <section>
        <h2>13. Ausfall der Leistung</h2>
        <p>
          Sollte die Durchführung der Veranstaltung aufgrund von Umständen,
          die Zum Wohl Mobil nicht zu vertreten hat, ganz oder teilweise
          unmöglich werden, gelten die gesetzlichen Vorschriften.
        </p>
        <p>
          Dies gilt insbesondere bei höherer Gewalt oder unvorhersehbaren
          Ereignissen, die die Durchführung der vereinbarten Leistung
          unmöglich machen oder unzumutbar erschweren.
        </p>
      </section>

      <section>
        <h2>14. Schlussbestimmungen</h2>
        <p>
          Sollten einzelne Bestimmungen dieser Allgemeinen Geschäfts- und
          Buchungsbedingungen unwirksam sein oder werden, bleibt die
          Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der
          unwirksamen Bestimmung treten die gesetzlichen Vorschriften.
        </p>
        <p>Es gilt das Recht der Bundesrepublik Deutschland.</p>
      </section>
    </LegalPage>
  );
}