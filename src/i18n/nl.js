// Koppen met nadruk zijn arrays: elk oneven deel (index 1, 3, …) wordt de ene
// vette indigo zinsnede. Zie components/Heading.jsx.
const nl = {
  nav: {
    home: "Home",
    services: "Diensten",
    work: "Werk",
    approach: "Aanpak",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contact",
    cta: "Plan een gesprek",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    logoAria: "BlueStar Development, naar de homepage",
    langLabel: "Taal",
  },
  hero: {
    line1: "Websites die",
    line2: "je bedrijf",
    // Laatste regel = vast voorvoegsel plus één wisselend woord. De punt hoort
    // bij elk woord: het is het laatste op de regel, dus een wissel mag de
    // breedte veranderen zonder dat er iets anders verschuift.
    line3prefix: "laten ",
    line3words: ["groeien.", "opvallen.", "verkopen."],
    sub1: "Website laten maken? Snelle, vindbare websites en web-applicaties op maat.",
    sub2: "Gebouwd rond jouw merk en je klanten, van eerste schets tot live site.",
    cta: "Plan een gesprek",
    secondary: "Bekijk ons werk",
    callPrefix: "Liever direct bellen?",
  },
  services: {
    heading: ["Alles voor je ", "online aanwezigheid"],
    subheading:
      "Een goede website is meer dan een mooi ontwerp. Hij moet snel laden, gevonden worden in Google en bezoekers laten doen wat jij wilt: bellen, mailen of een offerte aanvragen. Daarom regelen we alles onder één dak, van ontwerp en bouw tot hosting en onderhoud. Jij hebt één aanspreekpunt en hoeft je nergens zorgen over te maken.",
    termLabel: "Doorlooptijd",
    ctaPrefix: "Bespreek je",
    intentMessage: "Ik wil graag meer weten over",
    // Tekst in de kleine illustraties: voorbeeld-UI, geen echte gegevens.
    demo: {
      url: "jouwbedrijf.nl",
      cta: "Offerte",
      appTitle: "Planning deze week",
      log: ["Updates geïnstalleerd", "Back-up gecontroleerd", "Beveiligingspatch"],
      logMeta: "zojuist",
      status: "Online",
      ssl: "SSL actief",
      backup: "Back-up van vannacht",
    },
    items: {
      website: {
        title: "Website op maat",
        desc: "Snel, vindbaar en gebouwd rond jouw merk.",
        term: "2 tot 4 weken",
        ctaNoun: "website",
      },
      webapp: {
        title: "Web-applicatie",
        desc: "Maatwerk software in de browser, rond jouw werkproces.",
        term: "Afhankelijk van de omvang",
        ctaNoun: "web-applicatie",
      },
      maintenance: {
        title: "Onderhoud & support",
        desc: "Updates, back-ups en hulp, zodat je site veilig blijft.",
        term: "Doorlopend, per maand",
        ctaNoun: "onderhoud",
      },
      hosting: {
        title: "Hosting",
        desc: "Snel en veilig online, standaard inbegrepen.",
        term: "Direct bij livegang",
        ctaNoun: "hosting",
      },
    },
  },
  why: {
    heading: ["Waarom ", "BlueStar", "?"],
    body:
      "Een website laten maken voelt vaak als een gok: wat kost het, hoe lang duurt het en wie werkt er eigenlijk aan? Bij ons spreek je vooraf af wat je krijgt en wanneer, en heb je één aanspreekpunt van de eerste schets tot ver na de livegang.",
    imageAlt: "Homepage van Prince Schilder, een bedrijfswebsite die BlueStar Development bouwde.",
    imageCaption: "Prince Schilder: eigen ontwerp, geen template.",
    facts: [
      { value: "2–4 weken", label: "tot je site live staat" },
      { value: "30 dagen", label: "gratis support na lancering" },
      { value: "100/100", label: "Lighthouse-score, standaard" },
      { value: "1", label: "vast aanspreekpunt" },
    ],
  },
  pricing: {
    heading: ["Wat kost een ", "website laten maken", "?"],
    subheading:
      "De kosten hangen af van wat je nodig hebt. Een bedrijfswebsite op maat begint bij €495; maatwerk software prijzen we pas na een kort gesprek over je wensen, zodat je nooit betaalt voor iets wat je niet gebruikt. In elke prijs zitten een uniek ontwerp, een Lighthouse-score van 100/100, toegankelijkheid volgens WCAG AA, SSL en 30 dagen support na de lancering. Geen verborgen kosten: je weet vooraf precies waar je aan toe bent.",
    from: "vanaf",
    termLabel: "Doorlooptijd",
    intentMessage: "Ik wil graag een offerte voor",
    plans: [
      {
        key: "maintenance",
        title: "Onderhoud & support",
        suits: "Voor ondernemers die hun site veilig en actueel willen houden.",
        from: true,
        price: "€49",
        unit: "per maand",
        term: "Doorlopend, per maand",
        features: [
          "Software-updates",
          "Beveiligingspatches",
          "Controle van de back-ups",
          "Technische hulp bij vragen",
        ],
        cta: "Onderhoud aanvragen",
      },
      {
        key: "website",
        featured: true,
        title: "Website op maat",
        suits: "Voor zzp'ers, kleine bedrijven en mkb dat professioneel online wil.",
        from: true,
        price: "€495",
        unit: "eenmalig",
        term: "2 tot 4 weken",
        features: [
          "Uniek ontwerp, geen templates",
          "Responsief op elk scherm",
          "Lighthouse-score 100/100",
          "Geoptimaliseerd voor zoekmachines",
          "Toegankelijk volgens WCAG AA",
          "SSL-certificaat en dagelijkse back-ups",
          "30 dagen support na lancering",
          "Volledige overdracht van bestanden",
        ],
        cta: "Offerte aanvragen",
      },
      {
        key: "webapp",
        title: "Web-applicatie",
        suits: "Voor bedrijven die maatwerksoftware nodig hebben.",
        from: false,
        price: "Op aanvraag",
        unit: "offerte op maat",
        term: "Na een scopinggesprek",
        features: [
          "Klantportalen",
          "Planningstools",
          "Interne dashboards",
          "Gebouwd rond jouw werkproces",
        ],
        cta: "Plan een scopinggesprek",
      },
    ],
    hostingTitle: "Hosting is altijd inbegrepen",
    hostingBody: "Elke site draait op een snel CDN met SSL en dagelijkse back-ups. Alleen hosting afnemen kan ook, op aanvraag.",
    extrasTitle: "Optioneel extra",
    extras: ["Meertaligheid (NL + EN)", "Blog of kenniscentrum", "Animaties op maat"],
    vatNote: "Alle prijzen zijn exclusief btw.",
  },
  portfolio: {
    heading: ["Werk waar we ", "trots", " op zijn"],
    subheading:
      "Elk project begint bij het bedrijf erachter: wie zijn de klanten, wat zoeken ze en wat moeten ze kunnen doen? Daar ontwerpen we de site omheen, steeds met een eigen ontwerp in plaats van een template. Beweeg over een screenshot om door de hele pagina te scrollen.",
    viewProject: "Bekijk project",
    imageUnavailable: "Afbeelding niet beschikbaar",
    viewTabAriaPrefix: "Bekijk",
    viewTabAriaSuffix: "in een nieuw tabblad",
    screenshotAlt: "Screenshot van de website",
    scrollHint: "Beweeg erover om te scrollen",
    projects: [
      {
        title: "Prince Schilder",
        kind: "Bedrijfswebsite",
        description:
          "Professionele bedrijfswebsite voor een schildersbedrijf in Amsterdam.",
        highlights: [
          "Mobiel-first ontwerp",
          "Offerte-aanvraagformulier",
          "Diensten- en werkenoverzicht",
          "Geanimeerde stats & testimonial",
        ],
      },
      {
        title: "GSK Portfolio",
        kind: "Portfolio",
        description:
          "Strakke, moderne portfolio-website om werk en vaardigheden te presenteren.",
        highlights: [
          "Donker futuristisch thema",
          "Live GitHub-activiteit",
          "Soepele scroll-animaties",
          "Responsief op alle schermformaten",
        ],
      },
    ],
  },
  process: {
    heading: ["Zo ", "werken", " we"],
    subheading:
      "Een nieuwe website hoort geen gok te zijn. Daarom werken we in vier duidelijke stappen, met vaste afspraken over wat je krijgt en wanneer. Je ziet het ontwerp voordat we gaan bouwen en je kunt bij elke stap bijsturen. Na de lancering blijven we bereikbaar voor updates, vragen en aanpassingen.",
    steps: [
      {
        title: "Kennismaking",
        description: "We bespreken je doelen, merk en wat je klanten nodig hebben.",
      },
      {
        title: "Ontwerp",
        description: "Een helder ontwerp dat past bij je merk en je bezoekers stuurt.",
      },
      {
        title: "Bouw",
        description: "We bouwen een snelle, vindbare site die op elk scherm werkt.",
      },
      {
        title: "Lancering en onderhoud",
        description:
          "Live zetten en daarna blijven we zorgen voor updates en support.",
      },
    ],
  },
  testimonials: {
    heading: ["Wat klanten ", "over ons", " zeggen"],
    subheading:
      "We bouwen voor ondernemers die een site willen die gewoon werkt, zonder gedoe. Wat telt is het resultaat: meer aanvragen, een professionele eerste indruk en een samenwerking zonder verrassingen. Dit vertellen opdrachtgevers erover.",
    items: [
      {
        quote:
          "Sinds de nieuwe site krijgen we veel meer aanvragen. Klanten vinden ons nu makkelijker en de eerste indruk is meteen professioneel.",
        name: "Gurdeep Singh",
        role: "Eigenaar, Prince Schilder",
        photoNote: "Foto ter illustratie, niet de opdrachtgever.",
      },
      {
        quote:
          "Het ontwerp is strak en modern, precies wat ik zocht. Alles wat ik wilde laten zien staat er exact zoals ik het voor ogen had.",
        name: "Gurpreet Singh",
        role: "Opdrachtgever, GSK Portfolio",
        photoNote: "Foto ter illustratie, niet de opdrachtgever.",
      },
    ],
  },
  contact: {
    heading: ["Klaar voor een ", "nieuwe website", "?"],
    body: "Vertel ons over je plannen. We denken graag mee en sturen je een vrijblijvend voorstel.",
    directLabel: "Of neem direct contact op",
    nameLabel: "Naam",
    namePlaceholder: "Jouw naam",
    emailLabel: "E-mail",
    emailPlaceholder: "naam@bedrijf.nl",
    messagePlaceholder:
      "Vertel ons over je project. Wat voor site zoek je, wat is je deadline en heb je al een huisstijl?",
    messageLabel: "Bericht",
    submit: "Verstuur bericht",
    sending: "Versturen…",
    successTitle: "Bedankt voor je bericht!",
    successBody: "We bevestigen ontvangst dezelfde werkdag en reageren binnen 24 uur.",
    error: "Er ging iets mis. Stuur je bericht naar",
    errorSuffix: "of bel ons direct.",
    emailSubject: "Nieuw bericht via bluestardevelopment.nl",
  },
  faq: {
    heading: ["Veelgestelde ", "vragen"],
    subheading:
      "Twijfel je nog, of wil je eerst weten hoe het werkt? Hier staan de vragen die ondernemers ons het vaakst stellen, over prijs, planning en wat er na de lancering gebeurt.",
    notFound: "Staat je vraag er niet bij?",
    notFoundLink: "Neem contact op",
    items: [
      {
        question: "Wat kost een website laten maken?",
        answer:
          "De prijs hangt af van de wensen en complexiteit van het project. Een bedrijfswebsite op maat begint bij €495 (excl. btw), een web-applicatie is op aanvraag. Neem contact op voor een vrijblijvende offerte op maat.",
      },
      {
        question: "Hoe snel kan BlueStar Development een website bouwen?",
        answer:
          "De doorlooptijd hangt af van de omvang. Een eenvoudige bedrijfswebsite is vaak binnen twee tot vier weken live. Plan een gesprek voor een concrete planning.",
      },
      {
        question: "Werken jullie ook voor kleine bedrijven en zzp'ers?",
        answer:
          "Absoluut. We werken voor ondernemers van alle groottes, van zzp'ers en kleine bedrijven tot groeiende mkb-bedrijven. We schalen de oplossing mee met jouw behoeften en budget.",
      },
      {
        question: "Blijven jullie beschikbaar na de lancering?",
        answer:
          "Ja. We bieden onderhoud en support na oplevering. Denk aan updates, back-ups, technische hulp en aanpassingen als je bedrijf groeit.",
      },
      {
        question: "In welk gebied werken jullie?",
        answer:
          "We werken voor ondernemers door heel Nederland. Projecten begeleiden we grotendeels op afstand, maar een persoonlijk gesprek is altijd mogelijk.",
      },
    ],
  },
  blog: {
    heading: ["Uit ons ", "blog"],
    subheading:
      "Hoe snel moet een website zijn? Wat meet Google precies, en wat betekent toegankelijkheid voor jouw site? In ons blog leggen we het uit in gewone taal, zodat je betere keuzes maakt voor je eigen website.",
    pageHeading: ["Webdevelopment ", "tips"],
    pageSubheading:
      "Technische inzichten over hoe moderne websites worden gebouwd, hoe Google ze beoordeelt, en waarom dat voor jou uitmaakt.",
    read: "Lees",
    readMore: "Lees verder",
    readingTime: "min leestijd",
    viewAll: "Bekijk alle blogs",
    back: "Terug naar blog",
    more: "Meer artikelen",
    ctaHeading: ["Klaar voor een ", "snelle website", "?"],
    ctaBody:
      "Wij bouwen sites die scoren op snelheid, toegankelijkheid en vindbaarheid. Plan een vrijblijvend gesprek.",
    ctaButton: "Plan een gesprek",
  },
  footer: {
    tagline: "Snelle, vindbare websites en web-applicaties op maat voor ondernemers.",
    navigation: "Navigatie",
    contact: "Contact",
    copyright: "Alle rechten voorbehouden.",
    terms: "Algemene voorwaarden",
    privacy: "Privacybeleid",
    disclaimer: "Disclaimer",
    navLinks: [
      { label: "Diensten", href: "#diensten" },
      { label: "Werk", href: "#portfolio" },
      { label: "Aanpak", href: "#aanpak" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "/blog", external: true },
    ],
  },
  cookie: {
    bannerText:
      "We gebruiken cookies om de website goed te laten werken en uw ervaring te verbeteren. Lees ons",
    privacyLabel: "privacybeleid",
    bannerTextSuffix: "voor meer informatie. U kunt uw keuze op elk moment aanpassen.",
    acceptAll: "Alles accepteren",
    necessaryOnly: "Alleen noodzakelijk",
    customise: "Instellingen aanpassen",
    saveChoice: "Keuze opslaan",
    settingsTitle: "Cookie-instellingen",
    alwaysActive: "Altijd actief",
    close: "Sluiten",
    fabAria: "Cookie-instellingen aanpassen",
    fabTitle: "Cookie-instellingen",
    dialogBanner: "Cookiemelding",
    dialogSettings: "Cookie-instellingen",
    categories: [
      {
        id: "necessary",
        label: "Noodzakelijk",
        description:
          "Vereist voor de basisfunctionaliteit van de website, zoals beveiliging en sessiebeheer. Kunnen niet worden uitgeschakeld.",
      },
      {
        id: "functional",
        label: "Functioneel",
        description:
          "Onthouden uw voorkeuren zoals taalinstellingen en ingevulde formuliergegevens voor een betere gebruikerservaring.",
      },
      {
        id: "analytics",
        label: "Analytisch",
        description:
          "Meten anoniem hoe bezoekers de website gebruiken, zodat we de inhoud en prestaties kunnen verbeteren (bijv. Google Analytics).",
      },
      {
        id: "marketing",
        label: "Marketing",
        description:
          "Worden gebruikt voor gepersonaliseerde advertenties en het bijhouden van campagnes op externe platforms zoals Google en Meta.",
      },
    ],
  },
};

export default nl;
