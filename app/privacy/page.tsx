export const metadata = {
  title: "Privacybeleid | Wallmade",
  description: "Lees hoe Wallmade omgaat met persoonsgegevens, contactaanvragen en afbeeldingen die worden geüpload via de AI Designer.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE7] px-4 py-12 text-[#171513] sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Wallmade</p>
        <h1 className="mt-3 text-4xl font-light tracking-[-0.045em] sm:text-5xl">
          Privacybeleid
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 sm:text-base">
          Wallmade respecteert jouw privacy. Op deze pagina leggen wij uit welke
          gegevens wij verwerken, waarom wij dat doen en hoe wij omgaan met
          afbeeldingen die je uploadt via de AI Designer.
        </p>

        <div className="mt-10 space-y-8 rounded-[28px] border border-black/10 bg-white/70 p-6 sm:p-8">
          <section>
            <h2 className="text-xl font-medium">1. Wie verwerkt jouw gegevens?</h2>
            <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">
              Wallmade is een merk van H. Solution Bouw. Voor vragen over privacy
              kun je contact opnemen via WhatsApp, Instagram of e-mail zoals
              vermeld op onze website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">2. Welke gegevens verwerken wij?</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-black/70 sm:text-base">
              <p>Wij kunnen de volgende gegevens verwerken:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Contactgegevens die je zelf met ons deelt via WhatsApp, Instagram of e-mail.</li>
                <li>Informatie uit offerte- of contactaanvragen.</li>
                <li>Keuzes die je maakt in de Cinewall Configurator of AI Designer.</li>
                <li>Afbeeldingen van jouw ruimte die je vrijwillig uploadt via de AI Designer.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">3. Waarom verwerken wij deze gegevens?</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-black/70 sm:text-base">
              <p>Wij gebruiken deze gegevens om:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>te reageren op vragen en aanvragen;</li>
                <li>een ontwerp of prijsindicatie voor jouw project te maken;</li>
                <li>de AI Designer en configurator goed te laten werken;</li>
                <li>onze dienstverlening te verbeteren.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">4. Afbeeldingen in de AI Designer</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-black/70 sm:text-base">
              <p>
                Wanneer je een afbeelding uploadt via de AI Designer, wordt deze
                gebruikt om een visuele impressie van jouw ruimte en ontwerp te maken.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>De afbeelding wordt technisch voorbereid voor verwerking.</li>
                <li>EXIF-gegevens, waaronder locatiegegevens, worden verwijderd.</li>
                <li>De originele bestandsnaam wordt niet meegestuurd.</li>
                <li>De afbeelding wordt gebruikt om via een externe AI-dienst een ontwerp te genereren.</li>
              </ul>
              <p>
                Upload geen documenten of gevoelige persoonsgegevens in afbeeldingen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">5. Externe dienst voor beeldgeneratie</h2>
            <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">
              Voor het genereren van ontwerpen via de AI Designer maakt Wallmade
              gebruik van technologie van OpenAI. Afbeeldingen en ontwerpinformatie
              worden uitsluitend verwerkt voor het maken van het gevraagde ontwerp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">6. Bewaartermijn</h2>
            <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">
              Wij bewaren persoonsgegevens niet langer dan nodig is voor het doel
              waarvoor zij zijn verstrekt of verwerkt. Voor zover zichtbaar in onze
              huidige websitefunctionaliteit worden afbeeldingen uit de AI Designer
              niet bedoeld als permanente opslag op onze website, maar gebruikt voor
              tijdelijke verwerking van jouw aanvraag.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">7. Cookies en analyse</h2>
            <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">
              Op basis van de huidige websitefunctionaliteit gebruiken wij op dit
              moment geen zichtbare analytics of tracking scripts zoals Google
              Analytics of Meta Pixel. Als dit in de toekomst verandert, wordt dit
              privacybeleid daarop aangepast.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">8. Jouw rechten</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-black/70 sm:text-base">
              <p>Je kunt contact met ons opnemen als je:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>wilt weten welke gegevens wij van je hebben;</li>
                <li>gegevens wilt laten aanpassen of verwijderen;</li>
                <li>bezwaar wilt maken tegen verwerking van jouw gegevens.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">9. Bedrijfsgegevens</h2>
            <div className="mt-3 space-y-2 text-sm leading-7 text-black/70 sm:text-base">
              <p>Wallmade is onderdeel van H. Solution Bouw.</p>
              <p>KVK: 91293049</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
