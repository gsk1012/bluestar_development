// Juridische pagina's, letterlijk overgenomen uit de PDF's in /public. Pas je
// een tekst aan, doe dat dan ook in de PDF (of haal de PDF-link weg), zodat de
// twee versies niet uit elkaar lopen. Alleen Nederlands: een vertaling van
// juridische tekst hoort door een jurist te gebeuren.

const legalData = [
  {
    slug: "privacybeleid",
    pdf: "/privacybeleid_bluestar.pdf",
    title: "Privacybeleid",
    heading: ["", "Privacybeleid"],
    updated: "Laatst bijgewerkt: 17 juni 2026",
    metaTitle: "Privacybeleid | BlueStar Development",
    metaDescription:
      "Lees welke persoonsgegevens BlueStar Development verzamelt, waarom we ze verwerken, hoe lang we ze bewaren en welke rechten je hebt.",
    sections: [
      {
        heading: "Inleiding",
        body: `Blue Star Development hecht veel waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij deze verwerken en welke rechten u heeft.\n\nDoor gebruik te maken van onze website en diensten gaat u akkoord met dit privacybeleid.`,
      },
      {
        heading: "Verantwoordelijke",
        body: `Blue Star Development is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.\n\n- **Bedrijfsnaam:** Blue Star Development\n- **Website:** www.bluestardevelopment.nl\n- **E-mail:** [info@bluestardevelopment.nl](mailto:info@bluestardevelopment.nl)`,
      },
      {
        heading: "Welke gegevens verzamelen wij?",
        body: `Wij kunnen de volgende persoonsgegevens verzamelen:\n\n- Voor- en achternaam\n- Bedrijfsnaam\n- E-mailadres\n- Telefoonnummer\n- Factuurgegevens\n- IP-adres\n- Browser- en apparaatgegevens\n- Gegevens die u vrijwillig verstrekt via contactformulieren, e-mail of andere communicatie`,
      },
      {
        heading: "Waarom verwerken wij uw gegevens?",
        body: `Wij verwerken persoonsgegevens voor de volgende doeleinden:\n\n- Het beantwoorden van vragen en contactverzoeken\n- Het opstellen van offertes\n- Het uitvoeren van overeenkomsten\n- Het leveren van webdesign- en ontwikkelingsdiensten\n- Facturatie en administratie\n- Verbetering van onze website en dienstverlening\n- Het voldoen aan wettelijke verplichtingen`,
      },
      {
        heading: "Grondslag voor verwerking",
        body: `Wij verwerken persoonsgegevens op basis van één of meer van de volgende wettelijke grondslagen:\n\n- Toestemming van de betrokkene\n- Uitvoering van een overeenkomst\n- Wettelijke verplichting\n- Gerechtvaardigd belang van Blue Star Development`,
      },
      {
        heading: "Bewaartermijnen",
        body: `Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor het doel waarvoor deze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is.\n\nAdministratieve gegevens worden bewaard volgens de wettelijke fiscale bewaartermijn van minimaal **7 jaar**.`,
      },
      {
        heading: "Delen van gegevens met derden",
        body: `Blue Star Development verkoopt uw persoonsgegevens **niet** aan derden.\n\nWij kunnen gegevens delen met derde partijen wanneer dit noodzakelijk is voor onze dienstverlening, zoals:\n\n- Hostingproviders\n- Domeinregistratiepartijen\n- Betaaldiensten\n- Boekhoudsoftware\n- IT-dienstverleners\n\nMet deze partijen worden indien nodig verwerkersovereenkomsten gesloten.`,
      },
      {
        heading: "Cookies",
        body: `Onze website kan gebruikmaken van cookies om de website goed te laten functioneren en het gebruik ervan te analyseren.\n\nCookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen. U kunt cookies uitschakelen via de instellingen van uw browser.\n\nVoor meer informatie verwijzen wij naar ons Cookiebeleid.`,
      },
      {
        heading: "Beveiliging",
        body: `Blue Star Development neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik, onbevoegde toegang of openbaarmaking.`,
      },
      {
        heading: "Uw rechten",
        body: `U heeft het recht om:\n\n- Inzage te vragen in uw persoonsgegevens\n- Uw gegevens te laten corrigeren\n- Uw gegevens te laten verwijderen\n- De verwerking van uw gegevens te beperken\n- Bezwaar te maken tegen verwerking\n- Gegevensoverdraagbaarheid aan te vragen\n- Eerder gegeven toestemming in te trekken\n\nVerzoeken kunnen worden gestuurd naar [info@bluestardevelopment.nl](mailto:info@bluestardevelopment.nl).`,
      },
      {
        heading: "Klachten",
        body: `Indien u een klacht heeft over de verwerking van uw persoonsgegevens, verzoeken wij u eerst contact met ons op te nemen.\n\nDaarnaast heeft u het recht een klacht in te dienen bij de Nederlandse toezichthouder:\n\n- **Autoriteit Persoonsgegevens** · [www.autoriteitpersoonsgegevens.nl](https://www.autoriteitpersoonsgegevens.nl)`,
      },
      {
        heading: "Wijzigingen",
        body: `Blue Star Development behoudt zich het recht voor dit privacybeleid te wijzigen. De meest actuele versie zal altijd beschikbaar zijn op de website.`,
      },
    ],
  },
  {
    slug: "algemene-voorwaarden",
    pdf: "/algemene_voorwaarden_bluestar.pdf",
    title: "Algemene voorwaarden",
    heading: ["", "Algemene voorwaarden"],
    updated: "Versie 1.0 · 2026",
    metaTitle: "Algemene voorwaarden | BlueStar Development",
    metaDescription:
      "De algemene voorwaarden van BlueStar Development voor offertes, overeenkomsten, betaling, oplevering, hosting en onderhoud.",
    intro:
      "Deze algemene voorwaarden zijn van toepassing op alle diensten en overeenkomsten van **BlueStar Development**, gevestigd in Nederland. Door gebruik te maken van onze diensten of een overeenkomst aan te gaan, verklaart de opdrachtgever kennis te hebben genomen van en in te stemmen met de onderstaande voorwaarden.",
    articles: true,
    sections: [
      {
        heading: "Algemene bepalingen",
        body: `1. Blue Star Development, gevestigd in Nederland, wordt in deze voorwaarden aangeduid als **"Opdrachtnemer"**.\n\n2. De klant wordt aangeduid als **"Opdrachtgever"**.\n\n3. Onder **diensten** wordt verstaan: websiteontwikkeling, webdesign, onderhoud, hosting, SEO, digitale oplossingen en overige werkzaamheden die door Opdrachtnemer worden aangeboden.`,
      },
      {
        heading: "Toepasselijkheid",
        body: `1. Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van Blue Star Development.\n\n2. Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien schriftelijk overeengekomen.`,
      },
      {
        heading: "Offertes en overeenkomsten",
        body: `1. Alle offertes zijn vrijblijvend en geldig gedurende **30 dagen**, tenzij anders vermeld.\n\n2. Een overeenkomst komt tot stand zodra de opdrachtgever schriftelijk of digitaal akkoord geeft op een offerte.\n\n3. Blue Star Development behoudt zich het recht voor opdrachten zonder opgave van reden te weigeren.`,
      },
      {
        heading: "Uitvoering van de werkzaamheden",
        body: `1. Blue Star Development zal de werkzaamheden naar beste inzicht en vermogen uitvoeren.\n\n2. De opdrachtgever verstrekt tijdig alle benodigde informatie, materialen en toegang die noodzakelijk zijn voor de uitvoering van de opdracht.\n\n3. Vertragingen als gevolg van het niet tijdig aanleveren van informatie door de opdrachtgever komen voor rekening van de opdrachtgever.`,
      },
      {
        heading: "Betaling",
        body: `1. Facturen dienen binnen **14 dagen** na factuurdatum te worden voldaan, tenzij anders overeengekomen.\n\n2. Bij grotere projecten kan een aanbetaling van **30% tot 50%** worden verlangd voordat de werkzaamheden starten.\n\n3. Bij niet-tijdige betaling is Blue Star Development gerechtigd de werkzaamheden op te schorten totdat volledige betaling heeft plaatsgevonden.\n\n4. Eventuele incassokosten en wettelijke rente komen voor rekening van de opdrachtgever.`,
      },
      {
        heading: "Wijzigingen en meerwerk",
        body: `1. Wijzigingen buiten de overeengekomen opdracht worden beschouwd als **meerwerk**.\n\n2. Meerwerk wordt uitgevoerd tegen het overeengekomen uurtarief of een vooraf afgesproken prijs.\n\n3. Blue Star Development is niet verplicht wijzigingen uit te voeren zonder aanvullende vergoeding.`,
      },
      {
        heading: "Oplevering",
        body: `1. Een project wordt als opgeleverd beschouwd zodra de website of dienst beschikbaar is gesteld aan de opdrachtgever.\n\n2. De opdrachtgever heeft **14 dagen** na oplevering om eventuele gebreken schriftelijk te melden.\n\n3. Kleine afwijkingen die de functionaliteit niet beïnvloeden vormen geen reden voor afkeuring van het project.`,
      },
      {
        heading: "Intellectueel eigendom",
        body: `1. Het intellectueel eigendom van ontwerpen, broncode, teksten, afbeeldingen en overige materialen blijft eigendom van Blue Star Development totdat alle facturen volledig zijn voldaan.\n\n2. Na volledige betaling verkrijgt de opdrachtgever het gebruiksrecht van de geleverde website, tenzij anders overeengekomen.\n\n3. Blue Star Development behoudt het recht om gerealiseerde projecten op te nemen in haar portfolio en voor promotionele doeleinden te gebruiken.`,
      },
      {
        heading: "Hosting en onderhoud",
        body: `1. Indien hosting of onderhoud wordt afgenomen, zal Blue Star Development zich inspannen voor een optimale beschikbaarheid van de website.\n\n2. Blue Star Development kan geen garantie geven op ononderbroken beschikbaarheid van servers, netwerken of diensten van derden.\n\n3. Onderhoudsabonnementen kunnen maandelijks worden opgezegd met een opzegtermijn van **één maand**, tenzij anders overeengekomen.`,
      },
      {
        heading: "Aansprakelijkheid",
        body: `1. Blue Star Development is uitsluitend aansprakelijk voor directe schade die het gevolg is van opzet of grove nalatigheid.\n\n2. De aansprakelijkheid is beperkt tot het bedrag dat door de opdrachtgever voor de betreffende opdracht is betaald.\n\n3. Blue Star Development is niet aansprakelijk voor indirecte schade, gevolgschade, omzetverlies, verlies van gegevens of winstderving.`,
      },
      {
        heading: "Overmacht",
        body: `1. Onder overmacht wordt verstaan iedere situatie buiten de redelijke controle van Blue Star Development waardoor nakoming van de overeenkomst tijdelijk of blijvend onmogelijk wordt.\n\n2. Tijdens overmacht worden verplichtingen opgeschort zonder dat schadevergoeding verschuldigd is.`,
      },
      {
        heading: "Privacy",
        body: `1. Blue Star Development verwerkt persoonsgegevens conform de geldende privacywetgeving (**AVG/GDPR**).\n\n2. Meer informatie hierover is opgenomen in het [privacybeleid](/privacybeleid) op de website.`,
      },
      {
        heading: "Toepasselijk recht",
        body: `1. Op alle overeenkomsten tussen Blue Star Development en de opdrachtgever is **Nederlands recht** van toepassing.\n\n2. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.`,
      },
    ],
  },
  {
    slug: "disclaimer",
    pdf: "/disclaimer_bluestar.pdf",
    title: "Disclaimer",
    heading: ["", "Disclaimer"],
    updated: "Laatst bijgewerkt: 17 juni 2026",
    metaTitle: "Disclaimer | BlueStar Development",
    metaDescription:
      "De disclaimer van BlueStar Development over het gebruik van deze website, aansprakelijkheid, externe links en intellectueel eigendom.",
    sections: [
      {
        heading: "Algemene informatie",
        body: `De informatie op deze website (bluestardevelopment.nl) is uitsluitend bedoeld voor algemene informatiedoeleinden. Hoewel Blue Star Development zorgvuldigheid betracht bij het samenstellen en onderhouden van de inhoud van deze website, kunnen wij niet garanderen dat alle informatie volledig, juist, actueel of foutloos is. Aan de inhoud van deze website kunnen geen rechten worden ontleend.`,
      },
      {
        heading: "Gebruik van de website",
        body: `Het gebruik van deze website en de daarop verstrekte informatie is volledig op eigen risico. Blue Star Development aanvaardt geen aansprakelijkheid voor schade die voortvloeit uit het gebruik van deze website of uit het vertrouwen op de informatie die op deze website wordt aangeboden.`,
      },
      {
        heading: "Diensten en offertes",
        body: `Alle informatie over diensten, prijzen, pakketten en aanbiedingen op deze website is onder voorbehoud van typefouten, wijzigingen en beschikbaarheid. Een overeenkomst tussen Blue Star Development en een klant komt uitsluitend tot stand na schriftelijke bevestiging of acceptatie van een offerte.`,
      },
      {
        heading: "Beschikbaarheid van de website",
        body: `Blue Star Development streeft ernaar de website zo goed mogelijk beschikbaar te houden. Wij kunnen echter niet garanderen dat de website altijd zonder onderbrekingen, storingen of technische problemen toegankelijk zal zijn. Blue Star Development is niet aansprakelijk voor schade die ontstaat door tijdelijke onbeschikbaarheid van de website.`,
      },
      {
        heading: "Externe links",
        body: `Deze website kan links bevatten naar externe websites van derden. Blue Star Development heeft geen controle over de inhoud, beschikbaarheid of het privacybeleid van deze websites en aanvaardt hiervoor geen enkele verantwoordelijkheid of aansprakelijkheid. Het bezoeken van externe websites gebeurt volledig op eigen risico.`,
      },
      {
        heading: "Aansprakelijkheid",
        body: `Voor zover wettelijk toegestaan, is Blue Star Development niet aansprakelijk voor enige directe of indirecte schade, gevolgschade, winstderving, verlies van gegevens of andere schade die voortvloeit uit:\n\n- Het gebruik van deze website\n- Het niet kunnen gebruiken van deze website\n- Onjuiste of onvolledige informatie op deze website\n- Technische storingen of onderbrekingen\n- Het gebruik van websites van derden`,
      },
      {
        heading: "Intellectuele eigendomsrechten",
        body: `Alle teksten, afbeeldingen, ontwerpen, logo's, broncode en overige inhoud op deze website zijn eigendom van Blue Star Development, tenzij anders vermeld. Het is niet toegestaan om zonder voorafgaande schriftelijke toestemming inhoud van deze website te kopiëren, verspreiden, publiceren of op andere wijze te gebruiken.`,
      },
      {
        heading: "Portfolio",
        body: `Blue Star Development behoudt zich het recht voor om gerealiseerde projecten, websites en ontwerpen op te nemen in haar portfolio en te gebruiken voor promotionele doeleinden, tenzij schriftelijk anders is overeengekomen met de opdrachtgever. Merknamen, handelsnamen en logo's van klanten blijven eigendom van de betreffende rechthebbenden.`,
      },
      {
        heading: "Wijzigingen",
        body: `Blue Star Development behoudt zich het recht voor deze disclaimer op ieder moment te wijzigen of aan te vullen. De meest actuele versie is altijd beschikbaar op deze website.`,
      },
    ],
  },
];

export const LEGAL_SLUGS = legalData.map((p) => p.slug);
export const getLegalPages = () => legalData;
export const getLegalPage = (slug) => legalData.find((p) => p.slug === slug) ?? null;
