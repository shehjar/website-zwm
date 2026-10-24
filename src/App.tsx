import { useState } from 'react';
import {
  MessageCircleHeartIcon,
  CalendarHeartIcon,
  PartyPopperIcon,
  TruckIcon
} from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PageHeader } from '@/components/PageHeader';
import { ScriptBanner } from '@/components/ScriptBanner';
import { SectionHeading } from '@/components/SectionHeading';
import { ProcessStep } from '@/components/ProcessStep';
import type { ImageCarouselImage } from '@/components/ImageCarousel';
import { PricingTierCard } from '@/components/PricingTierCard';
import { PriceNote } from '@/components/PriceNote';
import { InfoTextBlock } from '@/components/InfoTextBlock';
import { RecipeCard } from '@/components/RecipeCard';
import type { RecipeIngredient } from '@/components/RecipeCard';
import { InstagramSection } from '@/components/InstagramSection';
import { PillButton } from '@/components/PillButton';
import { InquiryForm } from '@/components/InquiryForm';
import { FaqSection } from '@/components/FaqSection';
import type { FaqItem } from '@/components/FaqSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import type { Testimonial } from '@/components/TestimonialSection';
import { DownloadCallout } from '@/components/DownloadCallout';
import { TornEdgeImage } from '@/components/TornEdgeImage';
import { PageBackdrop } from '@/components/PageBackdrop';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'Start', href: '#start' },
  { label: 'Mietablauf', href: '#mietablauf' },
  { label: 'Preise', href: '#preise' },
  { label: 'Rezepte', href: '#rezepte' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' }
];

const HERO_IMAGE = '/First_page.jpeg';

const CAROUSEL_IMAGES: ImageCarouselImage[] = [
  {
    src: '/carousel-images/DSC08902.jpg',
    alt: 'Mobile Bar mit Lichterketten bei einer Gartenparty',
    caption: 'Unsere mobile Bar im Garten'
  },
  {
    src: '/carousel-images/DSC09082.jpg',
    alt: 'Getränkespender mit Aperol Spritz und Eukalyptus',
    caption: 'Frisch gezapfte Drinks'
  },
  {
    src: '/carousel-images/DSC08942.jpg',
    alt: 'Hochzeitsgäste stoßen mit Sekt an',
    caption: 'Anstoßen mit den Gästen'
  },
  {
    src: '/carousel-images/DSC08950.jpg',
    alt: 'Frisch gemixte Spritz-Cocktails',
    caption: 'Frisch gemixte Drinks'
  },
  {
    src: '/carousel-images/DSC08982.jpg',
    alt: 'Frische Zutaten für Spritz-Kreationen',
    caption: 'Frische Zutaten'
  },
  {
    src: '/carousel-images/DSC09241.jpg',
    alt: 'Mobile Bar auf einem Sommerfest',
    caption: 'Sommerfest im Grünen'
  },
  {
    src: '/carousel-images/DSC09275.jpg',
    alt: 'Gäste feiern an der mobilen Bar',
    caption: 'Gute Laune inklusive'
  }
];

const ING = (...names: string[]): RecipeIngredient[] => names.map((name) => ({ name }));

const DRINKS = [
  {
    title: 'Aperol Spritz',
    tag: 'Klassiker',
    imageSrc: '/images/aperol-spritz.jpg',
    ingredients: ING('Aperol', 'Prosecco', 'Soda', 'Orange')
  },
  {
    title: 'Tropical Spritz',
    tag: 'Fruchtig',
    imageSrc: '/images/tropical-spritz.jpg',
    ingredients: ING('Aperol', 'Prosecco', 'Soda', 'Mangonektar', 'Mango')
  },
  {
    title: 'Pearfect Spritz',
    tag: 'Würzig',
    imageSrc: '/images/pearfect-spritz.jpg',
    ingredients: ING('Aperol', 'Prosecco', 'Soda', 'Birnensaft', 'Zimt', 'Birne')
  }
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Was ist in der Getränkepauschale enthalten?',
    answer: (
      <>
        Jeder Preis ist ein <strong>Pauschalpreis für dein ganzes Fest</strong> (nicht pro Person)
        und enthält: <strong>ein Getränk pro Person</strong> – wir bieten ausschließlich Aperol Spritz
        und verschiedene Aperol-Kreationen an, eine Übersicht findest du unter Rezepte –, die
        <strong> Selbstbedienungsbar</strong> (Aufbau, Vorbereitung und Abbau sind bereits Bestandteil
        der Buchung; ein Ausschank oder eine Betreuung der Gäste vor Ort ist nicht vorgesehen) sowie
        <strong> Wagenmiete & Dekoration</strong>. Die Anfahrt ist bis 50 km inklusive, für jeden
        weiteren Kilometer berechnen wir 3,00 €.
      </>
    )
  },
  {
    question: 'Gibt es auch alkoholfreie Getränke?',
    answer: (
      <>
        Ja – alle unsere Getränke gibt es auch als <strong>alkoholfreie Variante</strong>. Du kannst
        also jeden der drei Spritz aus der Getränkeübersicht ohne Alkohol genießen. Eine Übersicht
        aller Getränke findest du unter Rezepte.
      </>
    )
  },
  {
    question: 'Wie viel Platz braucht der Wagen und braucht er Strom?',
    answer: (
      <>
        Der Wagen passt auf eine Stellfläche von etwa <strong>3 × 1,5 m</strong> und braucht keinen
        eigenen Stromanschluss. Am besten ist ein ebener Untergrund – wir richten alles für dich ein.
      </>
    )
  },
  {
    question: 'Wie läuft Aufbau und Abbau ab?',
    answer: (
      <>
        Aufbau, Vorbereitung und Abbau sind bereits <strong>in der Buchung enthalten</strong>. Wir
        liefern den Wagen an, bauen auf und holen ihn nach dem Fest wieder ab – für dich bleibt
        nichts zu tun.
      </>
    )
  },
  {
    question: 'Was passiert bei einer Anfahrt über 50 km?',
    answer: (
      <>
        Die Anfahrt bis <strong>50 km ist inklusive</strong>. Für jeden weiteren Kilometer
        berechnen wir 3,00 € – die Entfernung klären wir gemeinsam bei deiner Anfrage.
      </>
    )
  },
  {
    question: 'Wie läuft die Buchung konkret ab?',
    answer: (
      <>
        Deine Anfrage ist <strong>unverbindlich und kostenlos</strong>. Wir prüfen, ob der Wagen an
        deinem Wunschtermin frei ist, und melden uns in der Regel innerhalb von 24 Stunden bei dir.
        Verbindlich wird es erst, wenn wir alle Details gemeinsam besprochen haben.
      </>
    )
  }
];

// Platzhalter-Stimmen – NICHT veröffentlichen (erfundene Bewertungen sind
// wettbewerbswidrig, UWG). SHOW_TESTIMONIALS erst auf true setzen, wenn echte
// Gästestimmen vorliegen.
const SHOW_TESTIMONIALS = false;
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Der Wagen war der Blickfang unserer Hochzeit – die Gäste haben den ganzen Abend an der Bar gestanden. Absolut unkompliziert von der Anfrage bis zum Abbau.',
    name: 'Familie M.',
    occasion: 'Hochzeit im Rheinland'
  },
  {
    quote:
      'Vom ersten Kontakt bis zum Abbau alles perfekt organisiert. Die Aperol-Kreationen kamen bei unseren Gästen super an – wir würden jederzeit wieder buchen.',
    name: 'Sandra K.',
    occasion: 'Geburtstagsfeier in Bonn'
  },
  {
    quote:
      'Uns hat besonders beeindruckt, wie stilvoll und gepflegt alles aussah. Aufbau und Abbau liefen völlig ohne Aufwand für uns – gerne wieder!',
    name: 'Michael & Thomas',
    occasion: 'Jubiläumsfeier'
  }
];

export default function App() {
  const [guests, setGuests] = useState<number | null | undefined>(undefined);
  const activeHref = useActiveSection(NAV_LINKS.map((l) => l.href.replace('#', '')));

  const selectTier = (tier: { guests: number | null }) => {
    setGuests(tier.guests);
  };

  return (
    <div className="relative isolate min-h-screen bg-background">
      <PageBackdrop />
      <SiteHeader activeHref={`#${activeHref}`} links={NAV_LINKS} ctaHref="#kontakt" />

      <main>
        <section id="start" className="scroll-mt-20">
          <PageHeader
            title={
              <>
                <span className="block text-5xl font-medium leading-tight text-stone-700 md:text-6xl">
                  Mobile Bar
                </span>
                <span className="mt-1 block text-3xl font-light leading-snug text-stone-700 md:text-4xl">
                  für
                </span>
                <span className="mt-2 block font-script text-7xl leading-none text-text md:text-8xl lg:text-9xl">
                  Besondere Momente
                </span>
              </>
            }
            ctaLabel="Jetzt anfragen"
            ctaHref="#kontakt"
            imageSrc={HERO_IMAGE}
            imageAlt="Unsere mobile Aperol-Spritz-Bar mit Lampions und Getränkespendern im Garten"
          />
        </section>

        <ScriptBanner
          text="Unverbindlich angefragt – schnell eine Antwort!"
          eyebrow="Aperol Spritz – unsere Spezialität"
        />

        <section id="mietablauf" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading title="So einfach geht's" font="script" size="md"
              description="In 4 einfachen Schritten zu deiner eigenen Spritz-Bar."
              divider
            />
            <ol className="mt-14 grid gap-12 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              <ProcessStep
                variant="circle"
                step={1}
                icon={<MessageCircleHeartIcon />}
                title="Abfrage absenden"
                description="Erzähl uns von deiner Veranstaltung."
                showConnector
              />
              <ProcessStep
                variant="circle"
                step={2}
                icon={<CalendarHeartIcon />}
                title="Absprache"
                description="Wir besprechen alle Wünsche und Details."
                showConnector
              />
              <ProcessStep
                variant="circle"
                step={3}
                icon={<TruckIcon />}
                title="Bringen & Dekorieren"
                description="Wir bringen den Wagen zu deinem Event und bauen auf."
                showConnector
              />
              <ProcessStep
                variant="circle"
                step={4}
                icon={<PartyPopperIcon />}
                title="Feier genießen"
                description="Du genießt deinen Moment – wir holen nach dem Event den Wagen wieder ab."
              />
            </ol>
          </div>
        </section>

        <InstagramSection
          id="events"
          images={CAROUSEL_IMAGES}
          heading={
            <SectionHeading
              title="Unsere Events"
              description="Eindrücke von unseren letzten Festen – dein Event könnte das nächste sein."
              size="lg"
              divider
            />
          }
          cta={
            <PillButton href="#kontakt" size="lg">
              Dein Event könnte das nächste sein – jetzt anfragen
            </PillButton>
          }
        />

        <section
          id="preise"
          className="scroll-mt-20"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading
              title="Unsere Preise"
              description="Pauschalpreise für dein Fest – Wagenmiete, Dekoration & Getränke inklusive."
              size="lg"
              divider
            />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <PricingTierCard guests={30} price="250,00 €" hint="Pauschale für dein Fest" onSelect={selectTier} />
              <PricingTierCard guests={60} price="400,00 €" hint="Pauschale für dein Fest" onSelect={selectTier} />
              <PricingTierCard guests={90} price="550,00 €" hint="Pauschale für dein Fest" onSelect={selectTier} />
              <PricingTierCard custom onSelect={selectTier} />
            </div>
            <PriceNote />

            <div className="mx-auto mt-10 max-w-3xl">
              <DownloadCallout
                text="Unsere Preisliste herunterladen"
                buttonLabel="Herunterladen"
              />
            </div>
          </div>
        </section>

        <section id="rezepte" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading
              title="Unsere Getränke"
              description="Klassisch, fruchtig oder mit dem gewissen Extra – entdecke unsere Aperol-Kreationen und lass dich inspirieren."
              size="lg"
              divider
            />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DRINKS.map((drink) => (
                <RecipeCard
                  key={drink.title}
                  title={drink.title}
                  tag={drink.tag}
                  imageSrc={drink.imageSrc}
                  imageAlt={drink.title}
                  ingredients={drink.ingredients}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <PillButton href="#kontakt" size="lg">
                Jetzt anfragen
              </PillButton>
            </div>
          </div>
        </section>

        <ScriptBanner
          text="Wähle das Getränk, das dir am besten schmeckt!"
          heart
        />

        <section id="ueber-uns" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading title="Über uns" font="script" size="lg" divider />
            <div className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-[2fr_3fr] md:gap-14">
              <div className="mx-auto w-full max-w-sm md:max-w-none">
                <TornEdgeImage
                  src="/images/claire_haider.jpeg"
                  alt="Claire und Haider, das Team hinter Zum Wohl Mobil, lächelnd in einem Park bei Abendlicht"
                  aspectRatio="4 / 5"
                  rotate={-1.5}
                  caption="Claire & Haider"
                  seed={11}
                />
              </div>
              <InfoTextBlock variant="plain" title="Hi, wir sind Claire & Haider ♡" as="h3">
                <p>
                  Wir sind ein deutsch-französisch-pakistanisches Team und wahrscheinlich beide ein
                  bisschen „Lass uns das einfach machen“-Typen.
                </p>
                <p>
                  Wir lieben es zu reisen und haben auch schon einige Zeit im Ausland gelebt. Diese
                  Erfahrungen haben uns offen, neugierig und ziemlich kontaktfreudig gemacht. Wir
                  lernen gerne neue Menschen kennen, entdecken neue Orte und lassen uns immer wieder
                  von anderen Kulturen und Lebensweisen inspirieren.
                </p>
                <p>
                  Wir lachen viel, haben gerne Spaß und genießen die kleinen und großen Momente, die
                  das Leben so mit sich bringt. Wir verbringen gerne Zeit mit unseren Freunden,
                  genauso wichtig ist uns aber auch die Zeit zu zweit.
                </p>
                <p>
                  Wenn wir nicht gerade unterwegs sind, werkeln wir meistens an irgendetwas herum.
                  Wir bauen, schrauben und tüfteln gerne selbst und probieren immer wieder neue
                  Dinge aus. Oft entstehen aus kleinen Ideen neue Projekte.
                </p>
                <p>
                  Zum Wohl Mobil ist genau aus dieser Freude heraus entstanden. Es ist unser
                  Herzensprojekt, das wir mit viel Leidenschaft und Liebe nebenberuflich führen.
                  Dabei geht es für uns nicht einfach nur um eine mobile Bar, sondern darum,
                  besondere Momente mitzugestalten.
                </p>
                <p>
                  Wir freuen uns, mit Zum Wohl Mobil viele besondere Feste begleiten zu dürfen und
                  dabei immer wieder neue Menschen und ihre ganz persönlichen Geschichten
                  kennenzulernen. ♡
                </p>
              </InfoTextBlock>
            </div>
          </div>
        </section>

        {SHOW_TESTIMONIALS && <TestimonialSection items={TESTIMONIALS} />}

        <FaqSection items={FAQ_ITEMS} />

        <section
          id="kontakt"
          className="scroll-mt-20"
        >
          <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading
              title="Jetzt anfragen"
              description="Erzähl uns von deinem Fest, und wir melden uns persönlich bei dir – in der Regel innerhalb von 24 Stunden."
              size="lg"
              divider
            />
            <div className="mt-12">
              <InquiryForm
                initialGuests={guests ?? undefined}
                intro="Erzähl uns von deinem Fest – wir melden uns persönlich bei dir."
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
