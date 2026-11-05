// Dienstpagina's — hardcoded, NL+EN, net als posts.js. Elke pagina richt zich
// op één zoekvraag; de homepage blijft de algemene ingang die hiernaar linkt.
// Voeg je hier een pagina toe, dan wordt die vanzelf voorgerenderd en in de
// sitemap gezet (scripts/prerender.js).
//
// `sectionIcons` geeft elk onderwerp in `sections` een icoon, in dezelfde volgorde.
//
// Tekst in `sections[].body`: alinea's gescheiden door een lege regel, regels
// die met "- " beginnen worden een lijst, **vet** en [link](/pad) werken inline.
// Houd prijzen en termijnen gelijk aan i18n/pricing en public/pricing.md.

const BASE = "https://bluestardevelopment.nl";

const pageData = [
  {
    slug: "website-laten-maken",
    updatedAt: "2026-11-05", // voor de sitemap; pas aan als de inhoud wijzigt
    icon: "website",
    serviceType: "Website laten maken",
    blocks: ["included", "case", "sections", "process", "faq", "related"],
    sectionIcons: ["users", "gauge", "tag", "lifebuoy"],
    nl: {
      breadcrumb: "Website laten maken",
      metaTitle: "Website laten maken op maat | BlueStar Development",
      metaDescription:
        "Website laten maken die snel laadt, goed vindbaar is in Google en klanten oplevert. Eigen ontwerp, prijs in overleg en meestal binnen 4 tot 8 weken live.",
      heading: ["", "Website laten maken", " die klanten oplevert"],
      lead:
        "Je website is vaak de eerste kennismaking met je bedrijf. Wij ontwerpen en bouwen bedrijfswebsites op maat voor zzp'ers, kleine bedrijven en het mkb: snel, vindbaar in Google en gemaakt om bezoekers te laten bellen, mailen of een offerte aanvragen. Je hebt één aanspreekpunt, van het eerste gesprek tot ver na de lancering.",
      intent: "Ik wil graag een website laten maken.",
      secondary: { label: "Bekijk de prijzen", href: "/prijzen" },
      panel: {
        price: { from: false, value: "In overleg", unit: "offerte op maat" },
        facts: ["Binnen 4 tot 8 weken live", "Eén vast aanspreekpunt", "30 dagen support na de lancering", "Hosting altijd inbegrepen"],
      },
      card: { title: "Website op maat", desc: "Een snelle, vindbare bedrijfswebsite met een eigen ontwerp." },
      included: {
        heading: ["Wat je ", "krijgt"],
        lead:
          "Bij een website op maat zit dit standaard in de prijs: je hoeft er niet apart om te vragen en er komt achteraf niets bij.",
        items: [
          {
            title: "Een eigen ontwerp",
            text: "Geen template, maar een ontwerp rond jouw merk, je klanten en wat zij op je site moeten kunnen doen.",
          },
          {
            title: "Snel op elk scherm",
            text: "Responsief gebouwd en geoptimaliseerd tot een Lighthouse-score van 100/100, op mobiel en desktop.",
          },
          {
            title: "Vindbaar in Google",
            text: "Een technisch nette basis: snelle pagina's, logische koppen, metadata en HTML die Google direct kan lezen.",
          },
          {
            title: "Toegankelijk voor iedereen",
            text: "Gebouwd volgens WCAG AA, zodat je site ook werkt met een schermlezer of alleen een toetsenbord.",
          },
          {
            title: "Veilig online",
            text: "Een SSL-certificaat, hosting op een snel CDN en dagelijkse back-ups zijn standaard inbegrepen.",
          },
          {
            title: "Alles is van jou",
            text: "Na de oplevering dragen we alle bestanden aan je over. Je site is en blijft van jou.",
          },
        ],
      },
      sections: [
        {
          heading: "Voor wie bouwen we websites?",
          body: `We werken voor zzp'ers, kleine bedrijven en groeiende mkb-bedrijven door heel Nederland. Denk aan een schilder of installateur die vaker gevonden wil worden in de regio, een adviesbureau dat professioneler wil overkomen, of een bedrijf waarvan de huidige site traag en verouderd is.\n\nWat ze gemeen hebben: de website moet iets opleveren. Meer aanvragen, betere klanten of minder tijd kwijt aan steeds dezelfde vragen. Daar ontwerpen we de site omheen.`,
        },
        {
          heading: "Waarom snelheid en vindbaarheid zo belangrijk zijn",
          body: `Google kijkt niet alleen naar wat er op je site staat, maar ook naar hoe snel en stabiel hij laadt. Die meetwaarden heten [Core Web Vitals](/blog/core-web-vitals-uitgelegd) en tellen mee voor je positie in de zoekresultaten. Een trage site staat daardoor op achterstand, ook als de inhoud goed is.\n\nBezoekers haken bovendien sneller af als een pagina lang laadt, zeker op mobiel. Daarom bouwen we met React en vooraf opgebouwde pagina's: de browser krijgt direct een complete pagina en hoeft weinig code te laden. Het resultaat is een site die op elk apparaat vlot aanvoelt.`,
        },
        {
          heading: "Wat kost een website laten maken?",
          body: `Wil je snel en eenvoudig online, dan begint een **basiswebsite bij €495 excl. btw**: één pagina met een contactformulier, hosting en SSL. Een **website op maat** prijzen we in overleg. Die prijs hangt af van het aantal pagina's, de functies die je nodig hebt en of je teksten en beelden al klaar zijn, zodat je alleen betaalt voor wat je gebruikt.\n\nVoor de start weet je precies wat je krijgt en wat het kost. Op de [prijzenpagina](/prijzen) lees je meer over de pakketten en wat de prijs bepaalt.`,
        },
        {
          heading: "Na de lancering",
          body: `Na de livegang krijg je 30 dagen gratis support. Daarna kun je kiezen voor [onderhoud en support](/website-onderhoud), vanaf €49 per maand: we houden de software up-to-date, installeren beveiligingspatches, controleren de back-ups en helpen bij technische vragen.`,
        },
      ],
      faq: {
        heading: ["Vragen over ", "websites"],
        items: [
          {
            question: "Hoe lang duurt het om een website te laten maken?",
            answer:
              "Een website op maat staat meestal binnen 4 tot 8 weken live. De exacte planning spreken we samen af; die hangt af van de omvang en van hoe snel teksten en beelden beschikbaar zijn. Na het eerste gesprek krijg je een concrete planning.",
          },
          {
            question: "Wat heb ik nodig om te beginnen?",
            answer:
              "Een idee van wat je site moet opleveren is genoeg om te starten. Heb je al een logo, huisstijl, teksten of foto's, dan nemen we die mee. Ontbreekt er nog iets, dan bespreken we hoe we dat invullen.",
          },
          {
            question: "Bouwen jullie met WordPress?",
            answer:
              "Nee. We bouwen met React en vooraf opgebouwde, statische pagina's. Daardoor laadt je site sneller en zijn er geen plug-ins die je steeds moet bijwerken en beveiligen.",
          },
          {
            question: "Is hosting inbegrepen?",
            answer:
              "Ja. Elke website draait op een snel CDN met een SSL-certificaat. Bij een website op maat horen daar ook dagelijkse back-ups bij.",
          },
          {
            question: "In welke regio werken jullie?",
            answer:
              "We werken voor ondernemers door heel Nederland. Projecten begeleiden we grotendeels op afstand, maar een persoonlijk gesprek is altijd mogelijk.",
          },
        ],
      },
    },
    en: {
      breadcrumb: "Website design",
      metaTitle: "Custom website design | BlueStar Development",
      metaDescription:
        "A website that loads fast, ranks well in Google and brings in customers. A design of your own, price by arrangement and usually live within 4 to 8 weeks.",
      heading: ["A ", "custom website", " that brings in customers"],
      lead:
        "Your website is often the first introduction to your business. We design and build custom business websites for freelancers, small businesses and SMEs: fast, findable in Google and made to get visitors to call, email or request a quote. You have one point of contact, from the first conversation until well after launch.",
      intent: "I would like to have a website built.",
      secondary: { label: "View pricing", href: "/prijzen" },
      panel: {
        price: { from: false, value: "By arrangement", unit: "custom quote" },
        facts: ["Live within 4 to 8 weeks", "One fixed point of contact", "30 days of support after launch", "Hosting always included"],
      },
      card: { title: "Custom website", desc: "A fast, findable business website with its own design." },
      included: {
        heading: ["What you ", "get"],
        lead:
          "With a custom website this is included in the price as standard: you don't have to ask for it and nothing is added afterwards.",
        items: [
          { title: "A design of your own", text: "No template, but a design built around your brand, your customers and what they need to do on your site." },
          { title: "Fast on every screen", text: "Responsive and optimised to a Lighthouse score of 100/100, on mobile and desktop." },
          { title: "Findable in Google", text: "A clean technical foundation: fast pages, logical headings, metadata and HTML Google can read right away." },
          { title: "Accessible to everyone", text: "Built to WCAG AA, so your site also works with a screen reader or just a keyboard." },
          { title: "Secure online", text: "An SSL certificate, hosting on a fast CDN and daily backups are included as standard." },
          { title: "It's all yours", text: "After delivery we hand over all files. Your site is and stays yours." },
        ],
      },
      sections: [
        {
          heading: "Who do we build websites for?",
          body: `We work for freelancers, small businesses and growing SMEs across the Netherlands. Think of a painter or installer who wants to be found more often in their area, a consultancy that wants to come across more professionally, or a business whose current site is slow and outdated.\n\nWhat they have in common: the website has to deliver. More enquiries, better customers or less time spent answering the same questions. We design the site around that.`,
        },
        {
          heading: "Why speed and findability matter",
          body: `Google looks not only at what is on your site, but also at how fast and stable it loads. These measurements are called [Core Web Vitals](/blog/core-web-vitals-uitgelegd) and count towards your position in the search results. A slow site starts at a disadvantage, even when the content is good.\n\nVisitors also leave sooner when a page takes long to load, especially on mobile. That's why we build with React and prebuilt pages: the browser receives a complete page straight away and has little code to load. The result is a site that feels quick on every device.`,
        },
        {
          heading: "What does a website cost?",
          body: `If you want to get online quickly and simply, a **basic website starts at €495 excl. VAT**: one page with a contact form, hosting and SSL. A **custom website** is priced by arrangement. That price depends on the number of pages, the features you need and whether your copy and images are ready, so you only pay for what you use.\n\nBefore we start, you know exactly what you get and what it costs. The [pricing page](/prijzen) explains the packages and what determines the price.`,
        },
        {
          heading: "After launch",
          body: `After going live you get 30 days of free support. After that you can choose [maintenance and support](/website-onderhoud), from €49 per month: we keep the software up to date, install security patches, check the backups and help with technical questions.`,
        },
      ],
      faq: {
        heading: ["Questions about ", "websites"],
        items: [
          { question: "How long does it take to build a website?", answer: "A custom website is usually live within 4 to 8 weeks. We agree on the exact schedule together; the schedule depends on the scope and on how quickly copy and images are available. After the first conversation you get a concrete planning." },
          { question: "What do I need to get started?", answer: "An idea of what your site should achieve is enough to start. If you already have a logo, brand style, copy or photos, we'll use them. If something is missing, we'll discuss how to fill it in." },
          { question: "Do you build with WordPress?", answer: "No. We build with React and prebuilt, static pages. That makes your site faster and there are no plugins you constantly have to update and secure." },
          { question: "Is hosting included?", answer: "Yes. Every website runs on a fast CDN with an SSL certificate. A custom website also comes with daily backups." },
          { question: "Which region do you work in?", answer: "We work for businesses across the Netherlands. Projects are mostly guided remotely, but a face-to-face meeting is always possible." },
        ],
      },
    },
  },
  {
    slug: "webapplicatie-laten-maken",
    updatedAt: "2026-11-05", // voor de sitemap; pas aan als de inhoud wijzigt
    icon: "webapp",
    serviceType: "Webapplicatie laten maken",
    blocks: ["included", "sections", "process", "faq", "related"],
    sectionIcons: ["signpost", "compare", "calculator"],
    nl: {
      breadcrumb: "Webapplicatie laten maken",
      metaTitle: "Webapplicatie laten maken op maat | BlueStar Development",
      metaDescription:
        "Webapplicatie laten maken die past bij jouw werkproces: klantportalen, planningstools en interne dashboards. Maatwerk in de browser, offerte op maat.",
      heading: ["", "Webapplicatie laten maken", " rond jouw werkproces"],
      lead:
        "Loopt je bedrijf vast in spreadsheets, losse mails en handwerk? Een webapplicatie op maat brengt dat samen in één overzichtelijk systeem dat je team en je klanten gewoon in de browser gebruiken. We bouwen wat jouw proces nodig heeft, zonder overbodige functies.",
      intent: "Ik wil graag een webapplicatie laten maken.",
      secondary: { label: "Bekijk de prijzen", href: "/prijzen" },
      panel: {
        price: { from: false, value: "Op aanvraag", unit: "offerte op maat" },
        facts: ["Offerte op maat", "Gebouwd rond jouw werkproces", "Werkt op computer, tablet en telefoon", "Hosting en onderhoud mogelijk"],
      },
      card: { title: "Web-applicatie", desc: "Maatwerk software in de browser, van klantportaal tot dashboard." },
      included: {
        heading: ["Wat we ", "bouwen"],
        lead:
          "Een webapplicatie is gereedschap voor je team of je klanten. Dit zijn de toepassingen waar ondernemers het vaakst mee komen, en de uitgangspunten waarmee we elke applicatie bouwen.",
        items: [
          {
            title: "Klantportalen",
            text: "Een beveiligde omgeving waar klanten zelf hun gegevens, documenten of status bekijken, zonder te mailen of te bellen.",
          },
          {
            title: "Planningstools",
            text: "Afspraken, roosters of projecten op één plek, zodat iedereen ziet wat er wanneer moet gebeuren.",
          },
          {
            title: "Interne dashboards",
            text: "De cijfers die ertoe doen in één overzicht, in plaats van verspreid over losse bestanden.",
          },
          {
            title: "Op maat van je proces",
            text: "We beginnen bij hoe jullie nu werken en bouwen de software daaromheen, niet andersom.",
          },
          {
            title: "Snel en toegankelijk",
            text: "Dezelfde standaard als onze websites: vlot op elk apparaat en bruikbaar voor iedereen.",
          },
          {
            title: "Klein beginnen, later uitbreiden",
            text: "Start met wat nu het meeste oplevert. De applicatie groeit mee als je bedrijf groeit.",
          },
        ],
      },
      sections: [
        {
          heading: "Wanneer is een webapplicatie de juiste keuze?",
          body: `Standaardsoftware is prima zolang die past bij hoe je werkt. Het wordt lastig als je team om het pakket heen moet werken: gegevens dubbel invoeren, exports heen en weer mailen of betalen voor functies die niemand gebruikt.\n\nEen webapplicatie op maat is dan vaak de betere keuze. Signalen dat het tijd is:\n\n- Je team is veel tijd kwijt aan handmatig overtypen en controleren\n- Klanten mailen of bellen voor informatie die ze ook zelf zouden kunnen inzien\n- Belangrijke gegevens staan verspreid over spreadsheets en mailboxen\n- Een standaardpakket past maar half bij je werkproces`,
        },
        {
          heading: "Website of webapplicatie: wat is het verschil?",
          body: `Een website vertelt bezoekers wie je bent en wat je doet; meestal is het doel dat ze contact opnemen. Een webapplicatie is gereedschap: gebruikers loggen in, voeren gegevens in en halen informatie op. Denk aan een klantportaal, een boekingssysteem of een intern dashboard.\n\nDe twee gaan goed samen. Veel bedrijven beginnen met een [website op maat](/website-laten-maken) en voegen later een portaal of tool toe voor hun klanten of hun eigen team.`,
        },
        {
          heading: "Hoe komt de prijs tot stand?",
          body: `Geen twee webapplicaties zijn hetzelfde, daarom werken we hier niet met vaste pakketprijzen. In een scopinggesprek brengen we in kaart wat de applicatie moet kunnen, wie hem gaat gebruiken en welke koppelingen nodig zijn. Daarna krijg je een offerte op maat met een duidelijke planning.\n\nZo weet je vooraf waar je aan toe bent en betaal je niet voor functies die je niet gebruikt. Wil je klein beginnen? Dan bouwen we eerst de onderdelen die direct het meeste opleveren.`,
        },
      ],
      faq: {
        heading: ["Vragen over ", "webapplicaties"],
        items: [
          {
            question: "Wat kost een webapplicatie laten maken?",
            answer:
              "Dat hangt af van de functies, het aantal soorten gebruikers en eventuele koppelingen met andere systemen. Daarom maken we de prijs pas na een kort scopinggesprek. Je krijgt dan een offerte op maat, zonder verrassingen achteraf.",
          },
          {
            question: "Hoe lang duurt de ontwikkeling?",
            answer:
              "Dat verschilt per project. Na het scopinggesprek krijg je een concrete planning, zodat je weet wanneer de eerste versie klaarstaat.",
          },
          {
            question: "Werkt een webapplicatie ook op mobiel?",
            answer:
              "Ja. Een webapplicatie draait in de browser, dus je gebruikt hem op een computer, tablet of telefoon zonder iets te installeren. We bouwen de schermen zo dat ze op elk formaat goed werken.",
          },
          {
            question: "Kan de applicatie koppelen met andere software?",
            answer:
              "Vaak wel, maar dat hangt af van de software die je gebruikt. Of en hoe een koppeling mogelijk is, zoeken we uit in het scopinggesprek.",
          },
          {
            question: "Wie host en onderhoudt de applicatie?",
            answer:
              "Dat kunnen wij voor je regelen, zodat de applicatie snel, veilig en up-to-date blijft. Je hebt dan één aanspreekpunt voor de bouw en het beheer.",
          },
        ],
      },
    },
    en: {
      breadcrumb: "Web application development",
      metaTitle: "Custom web application development | BlueStar Development",
      metaDescription:
        "A custom web application that fits your workflow: client portals, planning tools and internal dashboards. Built for the browser, quoted after a scoping call.",
      heading: ["A ", "custom web application", " built around your workflow"],
      lead:
        "Is your business stuck in spreadsheets, scattered emails and manual work? A custom web application brings it together in one clear system that your team and customers simply use in the browser. We build what your process needs, without unnecessary features.",
      intent: "I would like to have a web application built.",
      secondary: { label: "View pricing", href: "/prijzen" },
      panel: {
        price: { from: false, value: "On request", unit: "custom quote" },
        facts: ["Tailored quote", "Built around your workflow", "Works on computer, tablet and phone", "Hosting and maintenance available"],
      },
      card: { title: "Web application", desc: "Custom software in the browser, from client portal to dashboard." },
      included: {
        heading: ["What we ", "build"],
        lead:
          "A web application is a tool for your team or your customers. These are the applications businesses ask for most, and the principles we build every application on.",
        items: [
          { title: "Client portals", text: "A secure environment where customers view their own details, documents or status, without emailing or calling." },
          { title: "Planning tools", text: "Appointments, schedules or projects in one place, so everyone sees what needs to happen when." },
          { title: "Internal dashboards", text: "The numbers that matter in one overview, instead of spread across separate files." },
          { title: "Fitted to your process", text: "We start from how you work today and build the software around it, not the other way round." },
          { title: "Fast and accessible", text: "The same standard as our websites: quick on every device and usable for everyone." },
          { title: "Start small, expand later", text: "Begin with what delivers the most right now. The application grows as your business grows." },
        ],
      },
      sections: [
        {
          heading: "When is a web application the right choice?",
          body: `Off-the-shelf software is fine as long as it fits the way you work. It gets difficult when your team has to work around the package: entering data twice, emailing exports back and forth or paying for features nobody uses.\n\nA custom web application is often the better choice then. Signs that it's time:\n\n- Your team spends a lot of time retyping and checking data by hand\n- Customers email or call for information they could look up themselves\n- Important data is scattered across spreadsheets and inboxes\n- An off-the-shelf package only half fits your workflow`,
        },
        {
          heading: "Website or web application: what's the difference?",
          body: `A website tells visitors who you are and what you do; usually the goal is for them to get in touch. A web application is a tool: users log in, enter data and retrieve information. Think of a client portal, a booking system or an internal dashboard.\n\nThe two work well together. Many businesses start with a [custom website](/website-laten-maken) and later add a portal or tool for their customers or their own team.`,
        },
        {
          heading: "How is the price determined?",
          body: `No two web applications are the same, so we don't use fixed package prices here. In a scoping call we map out what the application needs to do, who will use it and which integrations are needed. You then get a custom quote with a clear planning.\n\nThat way you know where you stand in advance and you don't pay for features you won't use. Want to start small? Then we build the parts that deliver the most first.`,
        },
      ],
      faq: {
        heading: ["Questions about ", "web apps"],
        items: [
          { question: "What does a custom web application cost?", answer: "That depends on the features, the number of user types and any integrations with other systems. That's why we only price it after a short scoping call. You then get a custom quote, without surprises afterwards." },
          { question: "How long does development take?", answer: "That differs per project. After the scoping call you get a concrete planning, so you know when the first version will be ready." },
          { question: "Does a web application work on mobile too?", answer: "Yes. A web application runs in the browser, so you use it on a computer, tablet or phone without installing anything. We build the screens to work well at every size." },
          { question: "Can the application connect to other software?", answer: "Often yes, but it depends on the software you use. Whether and how an integration is possible is something we figure out in the scoping call." },
          { question: "Who hosts and maintains the application?", answer: "We can arrange that for you, so the application stays fast, secure and up to date. You then have one point of contact for both development and management." },
        ],
      },
    },
  },
  {
    slug: "website-onderhoud",
    updatedAt: "2026-11-05", // voor de sitemap; pas aan als de inhoud wijzigt
    icon: "maintenance",
    serviceType: "Website onderhoud en hosting",
    price: "49",
    priceUnit: "MON",
    blocks: ["included", "sections", "faq", "related"],
    sectionIcons: ["shield", "cloud", "calculator"],
    nl: {
      breadcrumb: "Website onderhoud en hosting",
      metaTitle: "Website onderhoud en hosting | BlueStar Development",
      metaDescription:
        "Website onderhoud vanaf €49 per maand: updates, beveiliging, back-ups en technische hulp. Hosting met SSL en dagelijkse back-ups inbegrepen.",
      heading: ["", "Website onderhoud", " en hosting"],
      lead:
        "Een website is nooit helemaal af. Software veroudert, er komen beveiligingslekken aan het licht en soms gaat er iets mis. Met ons onderhoud blijft je site veilig, snel en actueel, en heb je één vast aanspreekpunt als je een vraag hebt.",
      intent: "Ik wil graag meer weten over onderhoud en hosting.",
      secondary: { label: "Bekijk de prijzen", href: "/prijzen" },
      panel: {
        price: { from: true, value: "€49", unit: "per maand, excl. btw" },
        facts: ["Doorlopend, per maand", "Hosting met SSL inbegrepen", "Dagelijkse back-ups", "Eén vast aanspreekpunt"],
      },
      card: { title: "Onderhoud & hosting", desc: "Updates, back-ups en hulp, op snelle hosting met SSL." },
      included: {
        heading: ["Wat er in het ", "onderhoud", " zit"],
        lead:
          "Onderhoud en hosting horen bij elkaar: de een houdt je site gezond, de ander zorgt dat hij snel en veilig bereikbaar is. Dit regelen we voor je.",
        items: [
          {
            title: "Software-updates",
            text: "We houden de onderdelen waarop je site draait up-to-date, zodat alles blijft werken zoals het hoort.",
          },
          {
            title: "Beveiligingspatches",
            text: "Komt er een beveiligingslek aan het licht, dan installeren we de patch. Zo blijven je site en de gegevens van je bezoekers veilig.",
          },
          {
            title: "Controle van de back-ups",
            text: "Er worden dagelijks back-ups gemaakt en wij controleren ze, zodat er bij een probleem altijd een werkende versie klaarstaat.",
          },
          {
            title: "Technische hulp",
            text: "Werkt er iets niet of heb je een technische vraag? Je hebt één vast aanspreekpunt dat je site kent.",
          },
          {
            title: "Hosting op een snel CDN",
            text: "Je site wordt geleverd vanaf een wereldwijd netwerk van servers, zodat hij overal snel laadt.",
          },
          {
            title: "SSL-certificaat",
            text: "Een versleutelde verbinding (https) is standaard. Bezoekers zien het slotje en Google weegt het mee.",
          },
        ],
      },
      sections: [
        {
          heading: "Waarom onderhoud nodig is",
          body: `Ook een website die perfect is opgeleverd, veroudert. De software waarop hij draait krijgt updates, browsers veranderen en er worden regelmatig nieuwe beveiligingslekken gevonden. Wie daar niets mee doet, loopt het risico op een trage, kapotte of zelfs gehackte site.\n\nOnderhoud voorkomt dat. Kleine problemen worden opgelost voordat bezoekers er last van hebben, en je hoeft er zelf niet aan te denken.`,
        },
        {
          id: "hosting",
          heading: "Hosting is altijd inbegrepen",
          body: `Bij elke website die we bouwen is hosting standaard inbegrepen. Je site draait op een snel CDN met een SSL-certificaat en dagelijkse back-ups. Je hoeft dus geen apart hostingpakket af te sluiten of zelf servers te beheren.\n\nHeb je al een website en zoek je alleen hosting? Ook dat kan, op aanvraag. [Neem contact op](#contact), dan bekijken we wat er nodig is.`,
        },
        {
          heading: "Wat kost website onderhoud?",
          body: `Onderhoud en support begint bij **€49 per maand excl. btw** en loopt per maand door. Na de lancering van een nieuwe website krijg je eerst 30 dagen gratis support, zodat je rustig kunt kiezen of je onderhoud wilt.\n\nAlle pakketten staan op de [prijzenpagina](/prijzen).`,
        },
      ],
      faq: {
        heading: ["Vragen over ", "onderhoud"],
        items: [
          {
            question: "Wat kost website onderhoud per maand?",
            answer:
              "Onderhoud en support begint bij €49 per maand (excl. btw). Wat je precies nodig hebt hangt af van je website; dat bespreken we vooraf.",
          },
          {
            question: "Is hosting inbegrepen?",
            answer:
              "Ja. Bij websites die wij bouwen is hosting met SSL en dagelijkse back-ups altijd inbegrepen. Alleen hosting afnemen kan ook, op aanvraag.",
          },
          {
            question: "Wat gebeurt er als mijn website niet werkt?",
            answer:
              "Neem contact met ons op. Je hebt één vast aanspreekpunt dat je site kent, en dankzij de dagelijkse back-ups staat er altijd een werkende versie klaar om terug te zetten.",
          },
          {
            question: "Heb ik onderhoud nodig als mijn site net nieuw is?",
            answer:
              "De eerste 30 dagen na de lancering is support gratis. Daarna raden we onderhoud aan, omdat software en beveiliging blijven veranderen, ook als je site er hetzelfde uitziet.",
          },
        ],
      },
    },
    en: {
      breadcrumb: "Website maintenance and hosting",
      metaTitle: "Website maintenance and hosting | BlueStar Development",
      metaDescription:
        "Website maintenance from €49 per month: software updates, security patches, backup checks and technical help. Hosting with SSL and daily backups included.",
      heading: ["", "Website maintenance", " and hosting"],
      lead:
        "A website is never quite finished. Software ages, security holes come to light and sometimes something breaks. With our maintenance your site stays secure, fast and up to date, and you have one fixed point of contact when you have a question.",
      intent: "I would like to know more about maintenance and hosting.",
      secondary: { label: "View pricing", href: "/prijzen" },
      panel: {
        price: { from: true, value: "€49", unit: "per month, excl. VAT" },
        facts: ["Ongoing, per month", "Hosting with SSL included", "Daily backups", "One fixed point of contact"],
      },
      card: { title: "Maintenance & hosting", desc: "Updates, backups and help, on fast hosting with SSL." },
      included: {
        heading: ["What ", "maintenance", " includes"],
        lead:
          "Maintenance and hosting belong together: one keeps your site healthy, the other makes sure it's fast and securely reachable. We take care of this for you.",
        items: [
          { title: "Software updates", text: "We keep the components your site runs on up to date, so everything keeps working as it should." },
          { title: "Security patches", text: "When a security hole comes to light, we install the patch. That keeps your site and your visitors' data safe." },
          { title: "Backup checks", text: "Backups are made daily and we check them, so a working version is always ready if something goes wrong." },
          { title: "Technical help", text: "Something not working, or a technical question? You have one fixed point of contact who knows your site." },
          { title: "Hosting on a fast CDN", text: "Your site is served from a worldwide network of servers, so it loads fast everywhere." },
          { title: "SSL certificate", text: "An encrypted connection (https) is standard. Visitors see the padlock and Google takes it into account." },
        ],
      },
      sections: [
        {
          heading: "Why maintenance is needed",
          body: `Even a website that was delivered perfectly ages. The software it runs on gets updates, browsers change and new security holes are found regularly. Doing nothing about that risks a slow, broken or even hacked site.\n\nMaintenance prevents that. Small problems are fixed before visitors notice them, and you don't have to think about it yourself.`,
        },
        {
          id: "hosting",
          heading: "Hosting is always included",
          body: `Hosting is included as standard with every website we build. Your site runs on a fast CDN with an SSL certificate and daily backups. So you don't need a separate hosting plan or manage servers yourself.\n\nAlready have a website and only looking for hosting? That's possible too, on request. [Get in touch](#contact) and we'll look at what's needed.`,
        },
        {
          heading: "What does website maintenance cost?",
          body: `Maintenance and support starts at **€49 per month excl. VAT** and runs month by month. After a new website launches you first get 30 days of free support, so you can decide calmly whether you want maintenance.\n\nAll packages are on the [pricing page](/prijzen).`,
        },
      ],
      faq: {
        heading: ["Questions about ", "maintenance"],
        items: [
          { question: "What does website maintenance cost per month?", answer: "Maintenance and support starts at €49 per month (excl. VAT). What exactly you need depends on your website; we discuss that in advance." },
          { question: "Is hosting included?", answer: "Yes. For websites we build, hosting with SSL and daily backups is always included. Hosting on its own is also possible, on request." },
          { question: "What happens if my website stops working?", answer: "Get in touch with us. You have one fixed point of contact who knows your site, and thanks to the daily backups there is always a working version ready to restore." },
          { question: "Do I need maintenance if my site is brand new?", answer: "Support is free for the first 30 days after launch. After that we recommend maintenance, because software and security keep changing, even when your site looks the same." },
        ],
      },
    },
  },
  {
    slug: "prijzen",
    updatedAt: "2026-11-05", // voor de sitemap; pas aan als de inhoud wijzigt
    icon: "pricing",
    blocks: ["pricing", "sections", "faq", "related"],
    sectionIcons: ["compare", "sliders", "cycle", "scales"],
    nl: {
      breadcrumb: "Prijzen",
      metaTitle: "Wat kost een website laten maken? | BlueStar Development",
      metaDescription:
        "Wat kost een website laten maken? Een basiswebsite vanaf €495, een website op maat in overleg, onderhoud vanaf €49 per maand en webapplicaties op aanvraag. Prijzen excl. btw.",
      heading: ["Wat kost een ", "website laten maken", "?"],
      lead:
        "Een website laten maken kan een paar honderd euro kosten, maar ook tienduizenden. Het verschil zit in wat er gebouwd wordt en wat er in de prijs zit. Bij ons weet je vooraf waar je aan toe bent: een basiswebsite begint bij €495, onderhoud bij €49 per maand, en voor een website op maat of een webapplicatie krijg je een offerte op maat.",
      intent: "Ik wil graag een offerte.",
      secondary: { label: "Bekijk wat je krijgt", href: "/website-laten-maken" },
      panel: {
        price: { from: true, value: "€495", unit: "basiswebsite, excl. btw" },
        facts: ["Website op maat in overleg", "Geen verborgen kosten", "Hosting altijd inbegrepen", "Vooraf duidelijke afspraken"],
      },
      card: { title: "Prijzen", desc: "Alle pakketten en wat de prijs van een website bepaalt." },
      pricing: {
        heading: ["Onze ", "pakketten"],
        lead:
          "Een basiswebsite om snel online te zijn, een website op maat voor bedrijven die meer willen, en maatwerk software. Bij elk pakket weet je vooraf wat je krijgt en wat het kost.",
      },
      sections: [
        {
          heading: "Basiswebsite of website op maat?",
          body: `Het verschil zit in wat je website moet doen. Wil je vooral online te vinden zijn met je gegevens, dan volstaat een basiswebsite. Moet je site klanten binnenhalen, dan kies je een website op maat.\n\n| | Basiswebsite | Website op maat |\n|---|---|---|\n| Prijs | Vanaf €495, eenmalig | In overleg, offerte op maat |\n| Pagina's | Eén pagina (one-pager) | Zoveel als je nodig hebt |\n| Ontwerp | Eenvoudig, in je huisstijl | Uniek ontwerp rond jouw merk |\n| Vindbaar in Google | Niet geoptimaliseerd | Geoptimaliseerd voor zoekmachines |\n| Support na lancering | Niet inbegrepen | 30 dagen inbegrepen |\n| Doorlooptijd | Kort traject | 4 tot 8 weken |`,
        },
        {
          heading: "Wat bepaalt de prijs van een website?",
          body: `De prijs van een website hangt vooral af van vier dingen:\n\n- **Omvang**: een site met vijf pagina's vraagt minder werk dan een site met twintig.\n- **Functies**: een tweede taal, een blog of animaties op maat komen erbij.\n- **Inhoud**: zijn de teksten en beelden klaar, of moeten ze nog gemaakt worden?\n- **Ontwerp**: een eenvoudig ontwerp is goedkoper, maar een eigen ontwerp maakt je site herkenbaar. Bij een website op maat ontwerpen we alles rond jouw merk.\n\nIn het eerste gesprek lopen we deze punten samen door. Daarna krijg je een voorstel met een duidelijke prijs.`,
        },
        {
          heading: "Eenmalige en doorlopende kosten",
          body: `Bij een website betaal je twee soorten kosten. De bouw is eenmalig: ontwerp, ontwikkeling en lancering. Daarna zijn er doorlopende kosten om de site online, veilig en actueel te houden.\n\nBij ons is hosting met SSL en dagelijkse back-ups altijd inbegrepen. Voor [onderhoud en support](/website-onderhoud) kies je zelf: vanaf €49 per maand houden we de software up-to-date, installeren we beveiligingspatches en helpen we je bij technische vragen.`,
        },
        {
          heading: "Waarom de goedkoopste website vaak duurder uitvalt",
          body: `Een website van een paar honderd euro op basis van een standaardtemplate lijkt aantrekkelijk. Maar zo'n site laadt vaak traag, scoort matig in Google en lijkt op die van concurrenten. Dan betaal je alsnog: in gemiste aanvragen, of met een nieuwe website een paar jaar later.\n\nDaarom is onze basiswebsite eerlijk over wat hij is: een nette one-pager om snel online te zijn. Moet je site klanten opleveren, dan kies je een website op maat, met een eigen ontwerp, een Lighthouse-score van 100/100, toegankelijkheid volgens WCAG AA en 30 dagen support na de lancering. Hoe we dat doen, lees je bij [website laten maken](/website-laten-maken).`,
        },
      ],
      faq: {
        heading: ["Vragen over ", "prijzen"],
        items: [
          {
            question: "Wat zit er in de basiswebsite van €495?",
            answer:
              "Eén pagina (one-pager) in een eenvoudig ontwerp in je huisstijl, responsief op elk scherm, met één contactformulier, hosting en een SSL-certificaat. Extra pagina's, zoekmachine-optimalisatie en support na de lancering zitten er niet in; daarvoor is er de website op maat.",
          },
          {
            question: "Wat kost een website op maat?",
            answer:
              "Dat bespreken we in een kort gesprek, omdat de prijs afhangt van het aantal pagina's, de functies en of je teksten en beelden al klaar zijn. Je krijgt daarna een offerte op maat, zonder verrassingen achteraf.",
          },
          {
            question: "Zijn de prijzen inclusief btw?",
            answer: "Nee, alle prijzen zijn exclusief btw.",
          },
          {
            question: "Zijn er verborgen kosten?",
            answer:
              "Nee. Je weet vooraf wat je krijgt en wat het kost. Extra's, zoals een tweede taal of een blog, spreken we vooraf met je af.",
          },
          {
            question: "Wat kost een webapplicatie?",
            answer:
              "Dat hangt af van de functies, de gebruikers en eventuele koppelingen. Na een kort scopinggesprek krijg je een offerte op maat.",
          },
          {
            question: "Kan ik alleen hosting afnemen?",
            answer:
              "Ja, op aanvraag. Bij websites die wij bouwen is hosting altijd inbegrepen.",
          },
        ],
      },
    },
    en: {
      breadcrumb: "Pricing",
      metaTitle: "What does a website cost? | BlueStar Development",
      metaDescription:
        "What does a website cost? A basic website from €495, a custom website by arrangement, maintenance from €49 per month and web applications on request. Prices excl. VAT.",
      heading: ["What does a ", "website", " cost?"],
      lead:
        "A website can cost a few hundred euros, but also tens of thousands. The difference lies in what gets built and what the price includes. With us you know where you stand in advance: a basic website starts at €495, maintenance at €49 per month, and for a custom website or a web application you get a custom quote.",
      intent: "I would like a quote.",
      secondary: { label: "See what you get", href: "/website-laten-maken" },
      panel: {
        price: { from: true, value: "€495", unit: "basic website, excl. VAT" },
        facts: ["Custom website by arrangement", "No hidden costs", "Hosting always included", "Clear agreements up front"],
      },
      card: { title: "Pricing", desc: "All packages and what determines the price of a website." },
      pricing: {
        heading: ["Our ", "packages"],
        lead:
          "A basic website to get online quickly, a custom website for businesses that want more, and custom software. With every package you know in advance what you get and what it costs.",
      },
      sections: [
        {
          heading: "Basic website or custom website?",
          body: `The difference lies in what your website needs to do. If you mainly want to be findable online with your details, a basic website is enough. If your site needs to bring in customers, choose a custom website.\n\n| | Basic website | Custom website |\n|---|---|---|\n| Price | From €495, one-off | By arrangement, custom quote |\n| Pages | One page (one-pager) | As many as you need |\n| Design | Simple, in your brand style | Unique design around your brand |\n| Findable in Google | Not optimised | Search engine optimised |\n| Support after launch | Not included | 30 days included |\n| Turnaround | Short project | 4 to 8 weeks |`,
        },
        {
          heading: "What determines the price of a website?",
          body: `The price of a website mainly depends on four things:\n\n- **Scope**: a site with five pages takes less work than one with twenty.\n- **Features**: a second language, a blog or custom animations come on top.\n- **Content**: are the copy and images ready, or do they still need to be made?\n- **Design**: a simple design is cheaper, but a design of your own makes your site recognisable. With a custom website we design everything around your brand.\n\nIn the first conversation we go through these points together. You then get a proposal with a clear price.`,
        },
        {
          heading: "One-off and ongoing costs",
          body: `A website comes with two kinds of costs. The build is one-off: design, development and launch. After that there are ongoing costs to keep the site online, secure and up to date.\n\nWith us, hosting with SSL and daily backups is always included. For [maintenance and support](/website-onderhoud) the choice is yours: from €49 per month we keep the software up to date, install security patches and help with technical questions.`,
        },
        {
          heading: "Why the cheapest website often costs more",
          body: `A website of a few hundred euros based on a standard template looks attractive. But such a site often loads slowly, ranks poorly in Google and looks like your competitors'. You end up paying anyway: in missed enquiries, or with a new website a few years later.\n\nThat's why our basic website is honest about what it is: a tidy one-pager to get online quickly. If your site needs to bring in customers, choose a custom website, with a design of your own, a Lighthouse score of 100/100, WCAG AA accessibility and 30 days of support after launch. Read how we do that on [custom website design](/website-laten-maken).`,
        },
      ],
      faq: {
        heading: ["Questions about ", "pricing"],
        items: [
          { question: "What is included in the €495 basic website?", answer: "One page (one-pager) in a simple design in your brand style, responsive on every screen, with one contact form, hosting and an SSL certificate. Extra pages, search engine optimisation and support after launch are not included; that's what the custom website is for." },
          { question: "What does a custom website cost?", answer: "We discuss that in a short conversation, because the price depends on the number of pages, the features and whether your copy and images are ready. You then get a custom quote, without surprises afterwards." },
          { question: "Are prices including VAT?", answer: "No, all prices are excluding VAT." },
          { question: "Are there hidden costs?", answer: "No. You know in advance what you get and what it costs. Extras, such as a second language or a blog, are agreed with you up front." },
          { question: "What does a web application cost?", answer: "That depends on the features, the users and any integrations. After a short scoping call you get a custom quote." },
          { question: "Can I buy hosting only?", answer: "Yes, on request. For websites we build, hosting is always included." },
        ],
      },
    },
  },
];

function localize(page, lang) {
  const { nl, en, ...meta } = page;
  return { ...meta, ...(lang === "en" ? en : nl) };
}

export const SERVICE_SLUGS = pageData.map((p) => p.slug);

export function getServicePage(slug, lang = "nl") {
  const page = pageData.find((p) => p.slug === slug);
  return page ? localize(page, lang) : null;
}

export function getServicePages(lang = "nl") {
  return pageData.map((p) => localize(p, lang));
}

// Markdown-links eruit voor JSON-LD, dat platte tekst verwacht.
const plain = (text) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

/** Structured data voor één dienstpagina: Service (of WebPage), kruimelpad en FAQ. */
export function buildServicePageJsonLd(page) {
  const url = `${BASE}/${page.slug}`;
  const org = { "@id": `${BASE}/#organization` };
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      inLanguage: "nl-NL",
      dateModified: page.updatedAt,
      isPartOf: { "@id": `${BASE}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          ...(page.serviceType ? [{ "@type": "ListItem", position: 2, name: "Diensten", item: `${BASE}/#diensten` }] : []),
          { "@type": "ListItem", position: page.serviceType ? 3 : 2, name: page.breadcrumb, item: url },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
      })),
    },
  ];

  if (page.serviceType) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.breadcrumb,
      serviceType: page.serviceType,
      description: page.metaDescription,
      url,
      provider: org,
      areaServed: { "@type": "Country", name: "Nederland" },
      ...(page.price && {
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: page.price,
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
            ...(page.priceUnit && { unitCode: page.priceUnit }),
          },
        },
      }),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
