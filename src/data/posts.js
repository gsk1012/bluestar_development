// Blog posts — hardcoded, NL+EN. Voeg nieuwe posts toe aan het begin van de array.
// Elke post heeft een `nl` en `en` blok met title, category, excerpt, sections etc.

const postData = [
  {
    slug: "hoe-lang-duurt-website-laten-maken",
    publishedAt: "2026-11-04",
    readingTime: 5,
    image: "/logo.png",
    nl: {
      category: "Advies",
      imageAlt: "Planning voor het laten maken van een website",
      title: "Hoe lang duurt het om een website te laten maken?",
      metaDescription:
        "Hoe lang duurt het om een website te laten maken? Een bedrijfswebsite staat meestal binnen 2 tot 4 weken live. Lees waar de tijd in gaat en hoe het sneller kan.",
      excerpt:
        "Een bedrijfswebsite staat meestal binnen 2 tot 4 weken live. Of dat lukt, hangt minder af van het bouwen dan van wat er vooraf klaarligt.",
      sections: [
        {
          heading: "Een realistische planning",
          body: `Een bedrijfswebsite op maat staat bij ons meestal binnen **2 tot 4 weken** live. Een site met een handvol pagina's en kant-en-klare teksten zit aan de korte kant. Meer pagina's, een tweede taal of een blog vragen meer tijd.\n\nVoor een webapplicatie geldt een andere rekensom. Daar hangt de doorlooptijd af van wat de applicatie moet kunnen, en die planning maken we pas na een scopinggesprek. Lees meer bij [webapplicatie laten maken](/webapplicatie-laten-maken).`,
        },
        {
          heading: "Waar de tijd in gaat",
          body: `Een website laten maken verloopt in vier stappen:\n- **Kennismaking**: we bespreken je doelen, je merk en wat je klanten nodig hebben\n- **Ontwerp**: je ziet het ontwerp voordat we gaan bouwen en kunt bijsturen\n- **Bouw**: we bouwen een snelle, vindbare site die op elk scherm werkt\n- **Lancering**: de site gaat live en we blijven bereikbaar voor vragen\n\nDe bouw zelf is zelden het langste deel. De meeste tijd zit in afstemming: wachten op teksten, beelden en feedback.`,
        },
        {
          heading: "Wat een project vertraagt",
          body: `De vertragingen die we het vaakst zien, hebben weinig met techniek te maken:\n- Teksten die nog geschreven moeten worden\n- Een logo of foto's die er nog niet zijn\n- Feedback die van meerdere mensen moet komen en lang op zich laat wachten\n- Nieuwe wensen halverwege het project\n\nNieuwe wensen zijn geen probleem, maar ze schuiven de planning op. Daarom leggen we vooraf vast wat er gebouwd wordt.`,
        },
        {
          heading: "Zo gaat het sneller",
          body: `Wil je snel live? Dan helpen deze vier dingen het meest:\n- Zorg dat teksten, logo en foto's klaarstaan voordat we beginnen\n- Wijs één persoon aan die beslist over ontwerp en inhoud\n- Verzamel feedback in één keer in plaats van in losse berichten\n- Begin met de pagina's die echt nodig zijn en breid later uit\n\nEen kleinere eerste versie die snel live staat, levert vaak meer op dan een grote site die maanden op zich laat wachten.`,
        },
        {
          heading: "En na de lancering?",
          body: `Na de livegang krijg je 30 dagen gratis support. Daarna kun je kiezen voor [onderhoud en support](/website-onderhoud), zodat je site veilig en actueel blijft. Wat een website kost, lees je op de [prijzenpagina](/prijzen).`,
        },
      ],
    },
    en: {
      category: "Advice",
      imageAlt: "Planning for having a website built",
      title: "How long does it take to have a website built?",
      metaDescription:
        "How long does it take to have a website built? A business website is usually live within 2 to 4 weeks. Read where the time goes and how to speed it up.",
      excerpt:
        "A business website is usually live within 2 to 4 weeks. Whether that works depends less on the building than on what's ready in advance.",
      sections: [
        {
          heading: "A realistic schedule",
          body: `A custom business website is usually live within **2 to 4 weeks** with us. A site with a handful of pages and ready-made copy is at the short end. More pages, a second language or a blog take more time.\n\nA web application is a different calculation. There, the turnaround depends on what the application needs to do, and we only plan it after a scoping call. Read more on [web application development](/webapplicatie-laten-maken).`,
        },
        {
          heading: "Where the time goes",
          body: `Having a website built follows four steps:\n- **Introduction**: we discuss your goals, your brand and what your customers need\n- **Design**: you see the design before we build and can adjust it\n- **Build**: we build a fast, findable site that works on every screen\n- **Launch**: the site goes live and we stay available for questions\n\nThe build itself is rarely the longest part. Most time goes into coordination: waiting for copy, images and feedback.`,
        },
        {
          heading: "What slows a project down",
          body: `The delays we see most often have little to do with technology:\n- Copy that still needs to be written\n- A logo or photos that don't exist yet\n- Feedback that has to come from several people and takes a long time\n- New wishes halfway through the project\n\nNew wishes are no problem, but they push the schedule. That's why we agree up front what will be built.`,
        },
        {
          heading: "How to go faster",
          body: `Want to go live quickly? These four things help most:\n- Have copy, logo and photos ready before we start\n- Appoint one person who decides on design and content\n- Collect feedback in one go instead of in separate messages\n- Start with the pages you really need and expand later\n\nA smaller first version that goes live quickly often delivers more than a large site that takes months.`,
        },
        {
          heading: "And after launch?",
          body: `After going live you get 30 days of free support. After that you can choose [maintenance and support](/website-onderhoud), so your site stays secure and up to date. What a website costs is on the [pricing page](/prijzen).`,
        },
      ],
    },
  },
  {
    slug: "website-laten-maken-of-zelf-bouwen",
    publishedAt: "2026-11-04",
    readingTime: 5,
    image: "/logo.png",
    nl: {
      category: "Advies",
      imageAlt: "Een website laten maken of zelf bouwen vergeleken",
      title: "Website laten maken of zelf bouwen met een websitebouwer?",
      metaDescription:
        "Website laten maken of zelf bouwen met een websitebouwer? We zetten de voor- en nadelen eerlijk op een rij, zodat je kunt kiezen wat bij je bedrijf past.",
      excerpt:
        "Met een websitebouwer heb je in een weekend een site. Toch is dat niet altijd de goedkoopste keuze. Wanneer is zelf bouwen prima, en wanneer loont laten maken?",
      sections: [
        {
          heading: "Twee routes naar een website",
          body: `Je kunt een website zelf in elkaar zetten met een websitebouwer: een online dienst waarmee je met een template en een editor zonder code een site maakt. Of je laat een website op maat ontwerpen en bouwen door een webbureau.\n\nBeide routes zijn prima, voor verschillende situaties. Het gaat er vooral om wat je website moet opleveren.`,
        },
        {
          heading: "Wanneer zelf bouwen prima is",
          body: `Een websitebouwer is een goede keuze als:\n- Je net begint en vooral online vindbaar wilt zijn met je contactgegevens\n- Je site weinig hoeft te doen behalve informeren\n- Je zelf tijd en plezier hebt om eraan te werken\n- Je budget nu echt beperkt is\n\nVoor een eerste online visitekaartje is dat vaak genoeg.`,
        },
        {
          heading: "Waar een websitebouwer tegen grenzen aanloopt",
          body: `Zodra je website klanten moet opleveren, merk je de beperkingen:\n- **Snelheid**: sites uit een bouwer laden vaak veel extra code mee, wat ten koste gaat van de laadtijd en je positie in Google\n- **Herkenbaarheid**: templates worden door veel bedrijven gebruikt, waardoor je site lijkt op die van anderen\n- **Vrijheid**: wil je iets wat de bouwer niet ondersteunt, dan houdt het op\n- **Afhankelijkheid**: je site zit vast aan het platform en verhuizen is lastig\n- **Doorlopende kosten**: je betaalt zolang je site online staat\n\nHoe [Core Web Vitals](/blog/core-web-vitals-uitgelegd) je positie in Google beïnvloeden, lees je in een eerder artikel.`,
        },
        {
          heading: "Wanneer laten maken loont",
          body: `Een website laten maken loont als:\n- Je site aanvragen, telefoontjes of offertes moet opleveren\n- Je gevonden wilt worden op zoekwoorden waar concurrenten ook op zitten\n- Je een professionele eerste indruk wilt maken met een eigen ontwerp\n- Je tijd beter besteed is aan je bedrijf dan aan je website\n\nBij ons krijg je daarbij een eigen ontwerp, een Lighthouse-score van 100/100 en toegankelijkheid volgens WCAG AA als standaard. Lees meer bij [website laten maken](/website-laten-maken).`,
        },
        {
          heading: "De kosten naast elkaar",
          body: `Bij een websitebouwer betaal je een abonnement, plus je eigen tijd om de site te bouwen en bij te houden. Die tijd wordt vaak vergeten.\n\nEen bedrijfswebsite op maat begint bij ons bij **€495 excl. btw**, eenmalig, met hosting inbegrepen. Onderhoud is optioneel, vanaf €49 per maand. Alle pakketten staan op de [prijzenpagina](/prijzen).`,
        },
        {
          heading: "Onze conclusie",
          body: `Zoek je alleen een online visitekaartje en heb je er zelf tijd voor, begin dan gerust met een websitebouwer. Moet je website klanten opleveren, dan is een site op maat meestal de betere investering: sneller, beter vindbaar en helemaal van jou.`,
        },
      ],
    },
    en: {
      category: "Advice",
      imageAlt: "Having a website built versus building it yourself",
      title: "Have a website built, or build it yourself with a website builder?",
      metaDescription:
        "Have a website built or build it yourself with a website builder? We list the pros and cons honestly, so you can choose what fits your business.",
      excerpt:
        "With a website builder you have a site in a weekend. Yet that's not always the cheapest choice. When is building it yourself fine, and when does having it built pay off?",
      sections: [
        {
          heading: "Two routes to a website",
          body: `You can put a website together yourself with a website builder: an online service that lets you make a site from a template and an editor without code. Or you have a custom website designed and built by a web agency.\n\nBoth routes are fine, for different situations. It mainly comes down to what your website needs to deliver.`,
        },
        {
          heading: "When building it yourself is fine",
          body: `A website builder is a good choice if:\n- You're just starting out and mainly want to be findable with your contact details\n- Your site doesn't need to do much beyond informing\n- You have the time and enjoy working on it yourself\n- Your budget really is limited right now\n\nFor a first online business card, that's often enough.`,
        },
        {
          heading: "Where a website builder hits its limits",
          body: `As soon as your website needs to bring in customers, you notice the limits:\n- **Speed**: builder sites often load a lot of extra code, which costs load time and your position in Google\n- **Recognisability**: templates are used by many businesses, so your site looks like others\n- **Freedom**: if you want something the builder doesn't support, that's the end of it\n- **Dependence**: your site is tied to the platform and moving is difficult\n- **Ongoing costs**: you pay for as long as your site is online\n\nHow [Core Web Vitals](/blog/core-web-vitals-uitgelegd) affect your position in Google is explained in an earlier article.`,
        },
        {
          heading: "When having it built pays off",
          body: `Having a website built pays off if:\n- Your site needs to bring in enquiries, calls or quote requests\n- You want to rank for keywords your competitors also target\n- You want to make a professional first impression with a design of your own\n- Your time is better spent on your business than on your website\n\nWith us you get a design of your own, a Lighthouse score of 100/100 and WCAG AA accessibility as standard. Read more on [custom website design](/website-laten-maken).`,
        },
        {
          heading: "The costs side by side",
          body: `With a website builder you pay a subscription, plus your own time to build and maintain the site. That time is often forgotten.\n\nA custom business website starts at **€495 excl. VAT** with us, one-off, with hosting included. Maintenance is optional, from €49 per month. All packages are on the [pricing page](/prijzen).`,
        },
        {
          heading: "Our conclusion",
          body: `If you're only looking for an online business card and have the time yourself, feel free to start with a website builder. If your website needs to bring in customers, a custom site is usually the better investment: faster, more findable and entirely yours.`,
        },
      ],
    },
  },
  {
    slug: "wat-is-een-klantportaal",
    publishedAt: "2026-11-04",
    readingTime: 5,
    image: "/logo.png",
    nl: {
      category: "Webapplicaties",
      imageAlt: "Een klantportaal op een laptop",
      title: "Wat is een klantportaal en heb je er een nodig?",
      metaDescription:
        "Wat is een klantportaal, wat levert het op en wanneer heb je er een nodig? Uitleg in gewone taal, met signalen dat het tijd is.",
      excerpt:
        "Een klantportaal is een beveiligde omgeving waar klanten zelf hun gegevens, documenten of status bekijken. Het scheelt mails en telefoontjes, mits het goed gebouwd is.",
      sections: [
        {
          heading: "Wat is een klantportaal?",
          body: `Een klantportaal is een beveiligde omgeving op internet waar je klanten inloggen om hun eigen informatie te bekijken. Denk aan de status van een opdracht, offertes en facturen, rapporten of afspraken.\n\nIn plaats van te mailen of te bellen, zoekt de klant het zelf op, wanneer het uitkomt. Een klantportaal is daarmee een vorm van een webapplicatie: software die in de browser draait.`,
        },
        {
          heading: "Voorbeelden uit de praktijk",
          body: `Een klantportaal past bij veel soorten bedrijven:\n- Een installatiebedrijf dat onderhoudsafspraken en rapporten deelt\n- Een adviesbureau dat documenten en voortgang met klanten deelt\n- Een verhuurder die contracten en facturen op één plek zet\n- Een dienstverlener die klanten zelf afspraken laat inplannen`,
        },
        {
          heading: "Wat levert het op?",
          body: `Een goed klantportaal levert vooral tijd op, aan beide kanten:\n- **Minder vragen**: klanten zoeken zelf op wat ze nu nog per mail vragen\n- **Altijd beschikbaar**: informatie is ook buiten kantoortijden in te zien\n- **Minder fouten**: één bron van waarheid in plaats van losse bestanden\n- **Een professionele indruk**: klanten zien dat je je zaken op orde hebt`,
        },
        {
          heading: "Signalen dat je er een nodig hebt",
          body: `Herken je een of meer van deze situaties? Dan is een klantportaal het overwegen waard:\n- Je beantwoordt steeds dezelfde vragen over de status van een opdracht\n- Je mailt regelmatig documenten heen en weer\n- Klantinformatie staat verspreid over mailboxen en spreadsheets\n- Klanten vragen om meer inzicht in wat je voor ze doet`,
        },
        {
          heading: "Waar een goed klantportaal aan voldoet",
          body: `Een portaal werkt alleen als klanten het ook gebruiken. Let daarom op deze punten:\n- **Veilig**: klanten zien alleen hun eigen gegevens\n- **Eenvoudig**: inloggen en vinden wat je zoekt zonder uitleg\n- **Mobiel**: het werkt net zo goed op een telefoon als op een computer\n- **Toegankelijk**: bruikbaar voor iedereen, ook met een schermlezer\n- **Passend**: het sluit aan op hoe jij nu werkt, in plaats van andersom`,
        },
        {
          heading: "Hoe begin je?",
          body: `Begin klein. Kies het onderdeel dat nu de meeste vragen of het meeste handwerk oplevert, en bouw dat eerst. Later breid je het portaal uit.\n\nIn een kort scopinggesprek brengen we in kaart wat je portaal moet kunnen en krijg je een offerte op maat. Lees meer bij [webapplicatie laten maken](/webapplicatie-laten-maken).`,
        },
      ],
    },
    en: {
      category: "Web applications",
      imageAlt: "A client portal on a laptop",
      title: "What is a client portal and do you need one?",
      metaDescription:
        "What is a client portal, what does it deliver and when do you need one? Explained in plain language, with signs that it's time and what a good portal needs.",
      excerpt:
        "A client portal is a secure environment where customers view their own details, documents or status. It saves emails and phone calls, provided it's built well.",
      sections: [
        {
          heading: "What is a client portal?",
          body: `A client portal is a secure online environment where your customers log in to view their own information. Think of the status of a job, quotes and invoices, reports or appointments.\n\nInstead of emailing or calling, the customer looks it up themselves, whenever it suits them. That makes a client portal a type of web application: software that runs in the browser.`,
        },
        {
          heading: "Examples from practice",
          body: `A client portal fits many kinds of businesses:\n- An installation company sharing maintenance appointments and reports\n- A consultancy sharing documents and progress with clients\n- A landlord putting contracts and invoices in one place\n- A service provider letting customers book appointments themselves`,
        },
        {
          heading: "What does it deliver?",
          body: `A good client portal mainly saves time, on both sides:\n- **Fewer questions**: customers look up what they now ask by email\n- **Always available**: information can be viewed outside office hours too\n- **Fewer mistakes**: one source of truth instead of separate files\n- **A professional impression**: customers see you have things in order`,
        },
        {
          heading: "Signs that you need one",
          body: `Recognise one or more of these situations? Then a client portal is worth considering:\n- You keep answering the same questions about the status of a job\n- You regularly email documents back and forth\n- Customer information is scattered across inboxes and spreadsheets\n- Customers ask for more insight into what you do for them`,
        },
        {
          heading: "What a good client portal needs",
          body: `A portal only works if customers actually use it. So pay attention to these points:\n- **Secure**: customers only see their own data\n- **Simple**: logging in and finding things without explanation\n- **Mobile**: it works just as well on a phone as on a computer\n- **Accessible**: usable for everyone, including with a screen reader\n- **Fitting**: it matches how you work today, not the other way round`,
        },
        {
          heading: "How to get started",
          body: `Start small. Pick the part that currently causes the most questions or manual work, and build that first. Later you expand the portal.\n\nIn a short scoping call we map out what your portal needs to do and you get a custom quote. Read more on [web application development](/webapplicatie-laten-maken).`,
        },
      ],
    },
  },
  {
    slug: "core-web-vitals-uitgelegd",
    publishedAt: "2026-06-10",
    readingTime: 6,
    image: "/blog/core-web-vitals.webp",
    nl: {
      category: "Prestaties",
      imageAlt: "Dashboard met prestatiecijfers op een scherm",
      title: "Core Web Vitals uitgelegd: wat Google écht meet",
      metaDescription:
        "LCP, INP en CLS klinken als jargon, maar ze bepalen of Google je site hoog of laag zet. Wij leggen uit wat ze betekenen en hoe je ze verbetert.",
      excerpt:
        "Google beoordeelt websites niet alleen op content, maar ook op hoe ze aanvoelen. Drie meetwaarden bepalen of jouw site snel genoeg is om hoog te scoren.",
      sections: [
        {
          heading: "Wat zijn Core Web Vitals?",
          body: `Core Web Vitals zijn drie meetwaarden die Google gebruikt om de gebruikerservaring van een website te beoordelen. Ze zijn onderdeel van het zogeheten Page Experience-signaal, dat meeweegt in het bepalen van je positie in de zoekresultaten.\n\nDe drie waarden zijn LCP, INP en CLS. Elk meet een ander aspect van hoe een pagina aanvoelt voor de bezoeker: hoe snel de pagina zichtbaar wordt, hoe snel hij reageert op interactie, en hoe stabiel de layout is tijdens het laden.`,
        },
        {
          heading: "LCP: Largest Contentful Paint",
          body: `LCP meet hoe lang het duurt voordat het grootste zichtbare element op de pagina volledig geladen is. Dat is vaak een grote afbeelding, een video of een grote koptekst.\n\nGoogle hanteert de volgende normen:\n- Goed: onder 2,5 seconden\n- Verbetering nodig: 2,5 tot 4 seconden\n- Slecht: meer dan 4 seconden\n\nEen trage LCP betekent dat bezoekers lang naar een lege of half-geladen pagina staren. Dat verhoogt de kans dat ze afhaken voordat ze iets hebben gezien. Onze sites scoren gemiddeld 0,9 seconden LCP door slimme preloads, geoptimaliseerde afbeeldingen en een lichtgewicht architectuur.`,
        },
        {
          heading: "INP: Interaction to Next Paint",
          body: `INP verving in 2024 de oudere FID-meting en is preciezer. Het meet hoe snel de browser reageert nadat een gebruiker iets doet, zoals klikken op een knop of een formulierveld aanraken.\n\nEen goede INP ligt onder de 200 milliseconden. Als jouw site traag reageert op klikken, voelt dat onprofessioneel, ook al laadt de pagina zelf snel. Het is vergelijkbaar met een winkelmedewerker die drie seconden wacht voordat hij antwoord geeft.\n\nEen hoge INP ontstaat vaak door te veel JavaScript dat het hoofdthread blokkeert. Wij bouwen met React en Static Site Generation (SSG), waardoor de interactieve code zo klein en snel mogelijk is.`,
        },
        {
          heading: "CLS: Cumulative Layout Shift",
          body: `CLS meet hoeveel de pagina-inhoud verschuift terwijl de pagina laadt. Ken je dat irritante moment waarop je op een knop wil klikken, maar de pagina plotseling verschuift en je op iets anders klikt? Dat is een hoge CLS.\n\nEen score onder 0,1 is goed. Boven 0,25 is slecht.\n\nCLS ontstaat door afbeeldingen zonder vaste afmetingen, advertenties die laat inladen, of lettertypen die een andere ruimte innemen dan het fallback-lettertype. Wij reserveren altijd ruimte voor afbeeldingen en lettertypen voordat ze laden, waardoor er niets verschuift.`,
        },
        {
          heading: "Waarom zijn Core Web Vitals belangrijk voor jouw bedrijf?",
          body: `Google gebruikt Core Web Vitals als ranking-signaal. Een site die slecht scoort, staat direct achter op concurrenten die beter scoren, zelfs als de inhoud vergelijkbaar is.\n\nDaarnaast heeft het een direct effect op conversie. Onderzoek van Google toont aan dat sites met een goede LCP 24% minder bezoekers verliezen dan sites met een slechte LCP. Elke seconde vertraging kost gemiddeld 7% conversie.\n\nKort gezegd: een snelle site verdient zichzelf terug.`,
        },
        {
          heading: "Hoe meet je jouw Core Web Vitals?",
          body: `Het makkelijkste startpunt is Google PageSpeed Insights. Voer je URL in en je krijgt direct een score voor zowel mobiel als desktop, met uitleg over wat er verbeterd kan worden.\n\nVoor een dieper beeld kun je de Search Console gebruiken. Onder het tabblad "Gebruikerservaring" zie je de werkelijke scores van echte bezoekers op jouw site, opgesplitst per pagina.\n\nAls je wil weten hoe jouw huidige site scoort en wat er beter kan, neem dan contact op. We kijken het gratis voor je door.`,
        },
      ],
    },
    en: {
      category: "Performance",
      imageAlt: "Performance metrics dashboard on a screen",
      title: "Core Web Vitals explained: what Google really measures",
      metaDescription:
        "LCP, INP and CLS sound like jargon, but they directly determine whether Google ranks your site high or low. We explain what they mean and how to improve them.",
      excerpt:
        "Google judges websites not just on content, but on how they feel to use. Three metrics determine whether your site is fast enough to rank well.",
      sections: [
        {
          heading: "What are Core Web Vitals?",
          body: `Core Web Vitals are three metrics Google uses to assess the user experience of a website. They are part of the so-called Page Experience signal, which factors into where your site appears in search results.\n\nThe three metrics are LCP, INP and CLS. Each one measures a different aspect of how a page feels for the visitor: how quickly the page becomes visible, how quickly it responds to interaction, and how stable the layout is while loading.`,
        },
        {
          heading: "LCP: Largest Contentful Paint",
          body: `LCP measures how long it takes for the largest visible element on the page to fully load. That is usually a large image, a video or a big heading.\n\nGoogle's benchmarks are:\n- Good: under 2.5 seconds\n- Needs improvement: 2.5 to 4 seconds\n- Poor: more than 4 seconds\n\nA slow LCP means visitors stare at an empty or half-loaded page for too long, which increases the chance they leave before seeing anything. Our sites average 0.9 seconds LCP thanks to smart preloads, optimised images and a lightweight architecture.`,
        },
        {
          heading: "INP: Interaction to Next Paint",
          body: `INP replaced the older FID measurement in 2024 and is more precise. It measures how quickly the browser responds after a user does something, such as clicking a button or tapping a form field.\n\nA good INP is under 200 milliseconds. If your site is slow to respond to clicks, it feels unprofessional, even if the page itself loads quickly. Think of a shop assistant who waits three seconds before answering a question.\n\nA high INP is often caused by too much JavaScript blocking the main thread. We build with React and Static Site Generation (SSG), keeping the interactive code as small and fast as possible.`,
        },
        {
          heading: "CLS: Cumulative Layout Shift",
          body: `CLS measures how much the page content shifts while the page is loading. You know that frustrating moment when you are about to click a button, but the page jumps and you click something else instead? That is a high CLS.\n\nA score below 0.1 is good. Above 0.25 is poor.\n\nCLS is caused by images without fixed dimensions, ads that load late, or fonts that take up different space than the fallback font. We always reserve space for images and fonts before they load, so nothing shifts.`,
        },
        {
          heading: "Why do Core Web Vitals matter for your business?",
          body: `Google uses Core Web Vitals as a ranking signal. A site that scores poorly is directly behind competitors who score better, even if the content is comparable.\n\nIt also has a direct effect on conversion. Google research shows that sites with a good LCP lose 24% fewer visitors than sites with a poor LCP. Every second of delay costs roughly 7% in conversions on average.\n\nIn short: a fast site pays for itself.`,
        },
        {
          heading: "How do you measure your Core Web Vitals?",
          body: `The easiest starting point is Google PageSpeed Insights. Enter your URL and you instantly get a score for both mobile and desktop, with an explanation of what can be improved.\n\nFor a deeper view, you can use Search Console. Under the "Experience" tab you can see real scores from actual visitors to your site, broken down per page.\n\nIf you want to know how your current site scores and what could be better, get in touch. We will review it for free.`,
        },
      ],
    },
  },
  {
    slug: "wcag-toegankelijkheid-website",
    publishedAt: "2026-05-28",
    readingTime: 5,
    image: "/blog/wcag-toegankelijkheid.webp",
    nl: {
      category: "Toegankelijkheid",
      imageAlt: "Persoon die een website gebruikt op een laptop",
      title: "WCAG-toegankelijkheid: wat betekent het voor jouw website?",
      metaDescription:
        "WCAG AA is de standaard voor toegankelijke websites. Wat houdt het in, wie profiteert ervan, en waarom is het ook goed voor SEO? Wij leggen het uit.",
      excerpt:
        "Een toegankelijke website is niet alleen voor mensen met een beperking. Het is beter voor iedereen. En Google beloont het ook.",
      sections: [
        {
          heading: "Wat is WCAG?",
          body: `WCAG staat voor Web Content Accessibility Guidelines. Het zijn internationale richtlijnen, opgesteld door het W3C, die bepalen hoe websites toegankelijk moeten zijn voor mensen met een visuele, motorische, auditieve of cognitieve beperking.\n\nEr zijn drie conformiteitsniveaus: A, AA en AAA. Niveau AA is de algemeen aanvaarde standaard en wordt in Nederland verplicht gesteld voor overheidswebsites. Wij bouwen al onze websites op WCAG AA-niveau, standaard inbegrepen.`,
        },
        {
          heading: "Wie profiteert van een toegankelijke website?",
          body: `Het meest voor de hand liggende antwoord is: mensen met een beperking. Denk aan blinden die een schermlezer gebruiken, mensen met motorische beperkingen die alleen een toetsenbord gebruiken, of mensen met kleurenblindheid.\n\nMaar de groep is veel groter dan je denkt. Mensen die tijdelijk een arm gebroken hebben. Mensen die in felle zon op hun telefoon kijken. Ouderen met kleinere lettertjes. Een toegankelijke website is een betere website voor iedereen.\n\nNaast de directe gebruikers zijn er ook zakelijke redenen. In Nederland wonen ruim 2,2 miljoen mensen met een beperking. Als jouw site voor hen niet werkt, sluit je een grote groep potentiële klanten uit.`,
        },
        {
          heading: "De vier principes van WCAG",
          body: `WCAG is gebouwd op vier principes, samengevat als POUR:\n\n**Perceivable (Waarneembaar):** alle informatie moet waarneembaar zijn. Afbeeldingen hebben alt-teksten, video's hebben ondertitels, en de tekst heeft voldoende contrast.\n\n**Operable (Bedienbaar):** alles moet bediend kunnen worden met alleen een toetsenbord. Geen tijdslimieten die te kort zijn, geen content die aanvallen kan veroorzaken door flitsen.\n\n**Understandable (Begrijpelijk):** de taal is leesbaar en voorspelbaar. Foutmeldingen zijn duidelijk en helpen de gebruiker verder.\n\n**Robust (Robuust):** de website werkt met verschillende hulptechnologieën, zoals schermlezers en braille-displays.`,
        },
        {
          heading: "Toegankelijkheid en SEO: ze gaan hand in hand",
          body: `Google's crawler is in veel opzichten vergelijkbaar met een schermlezer. Hij leest de pagina als tekst, volgt links via ankerteksten, en interpreteert afbeeldingen via alt-teksten.\n\nEen toegankelijke website is daardoor automatisch beter leesbaar voor Google. Alt-teksten bij afbeeldingen voegen zoekwoorden toe. Duidelijke kopenstructuur (H1, H2, H3) helpt Google de pagina-hiërarchie te begrijpen. Snelle laadtijden en een stabiele layout, ook WCAG-vereisten, verbeteren direct de Core Web Vitals.\n\nKort gezegd: wie investeert in toegankelijkheid, investeert tegelijkertijd in SEO.`,
        },
        {
          heading: "Wat betekent WCAG AA concreet voor jouw site?",
          body: `Een paar praktische voorbeelden van wat WCAG AA betekent in de praktijk:\n\n- Tekstcontrast moet minimaal 4,5:1 zijn ten opzichte van de achtergrond\n- Alle interactieve elementen (knoppen, formulieren) moeten met het toetsenbord bereikbaar zijn\n- Afbeeldingen moeten een beschrijvende alt-tekst hebben\n- Formulieren moeten duidelijke labels hebben, ook los van de kleur\n- De website moet werken bij 200% zoom\n\nWij controleren dit systematisch bij elk project en leveren nooit een site op die deze punten mist.`,
        },
      ],
    },
    en: {
      category: "Accessibility",
      imageAlt: "Person using a website on a laptop",
      title: "WCAG accessibility: what it means for your website",
      metaDescription:
        "WCAG AA is the standard for accessible websites. What does it involve, who benefits from it, and why is it also good for SEO? We explain it all.",
      excerpt:
        "An accessible website is not only for people with a disability. It is better for everyone. And Google rewards it too.",
      sections: [
        {
          heading: "What is WCAG?",
          body: `WCAG stands for Web Content Accessibility Guidelines. These are international guidelines, established by the W3C, that define how websites must be accessible for people with visual, motor, auditory or cognitive disabilities.\n\nThere are three conformance levels: A, AA and AAA. Level AA is the widely accepted standard and is mandatory for government websites in the Netherlands. We build all our websites to WCAG AA level as standard.`,
        },
        {
          heading: "Who benefits from an accessible website?",
          body: `The most obvious answer is: people with a disability. Think of blind users relying on a screen reader, people with motor impairments who use only a keyboard, or people with colour blindness.\n\nBut the group is much larger than you might think. People who temporarily have a broken arm. People reading their phone in bright sunlight. Older users struggling with small text. An accessible website is a better website for everyone.\n\nBeyond direct users, there are also business reasons. Over 2.2 million people in the Netherlands live with a disability. If your site does not work for them, you are excluding a large group of potential customers.`,
        },
        {
          heading: "The four principles of WCAG",
          body: `WCAG is built on four principles, summarised as POUR:\n\n**Perceivable:** all information must be perceivable. Images have alt text, videos have captions, and text has sufficient contrast.\n\n**Operable:** everything must be operable using only a keyboard. No time limits that are too short, no content that can trigger seizures through flashing.\n\n**Understandable:** language is readable and predictable. Error messages are clear and help the user move forward.\n\n**Robust:** the website works with different assistive technologies, such as screen readers and braille displays.`,
        },
        {
          heading: "Accessibility and SEO: they go hand in hand",
          body: `Google's crawler is in many ways similar to a screen reader. It reads the page as text, follows links via anchor text, and interprets images via alt text.\n\nAn accessible website is therefore automatically more readable for Google. Alt text on images adds keywords. A clear heading structure (H1, H2, H3) helps Google understand the page hierarchy. Fast load times and a stable layout, also WCAG requirements, directly improve Core Web Vitals.\n\nIn short: investing in accessibility means investing in SEO at the same time.`,
        },
        {
          heading: "What does WCAG AA mean in practice for your site?",
          body: `A few practical examples of what WCAG AA means:\n\n- Text contrast must be at least 4.5:1 against the background\n- All interactive elements (buttons, forms) must be reachable via keyboard\n- Images must have a descriptive alt text\n- Forms must have clear labels, independent of colour\n- The website must work at 200% zoom\n\nWe check this systematically on every project and never deliver a site that misses these points.`,
        },
      ],
    },
  },
  {
    slug: "ssg-vs-ssr-razendsnel-website",
    publishedAt: "2026-05-14",
    readingTime: 5,
    image: "/blog/ssg-vs-ssr.webp",
    nl: {
      category: "Techniek",
      imageAlt: "Code op een scherm met snelheidsindicatoren",
      title: "SSG vs SSR: hoe wij websites razendsnel maken",
      metaDescription:
        "SSG en SSR zijn twee technieken om websites te bouwen. Wij leggen uit wat het verschil is en waarom wij voor SSG kiezen.",
      excerpt:
        "De techniek achter een website bepaalt hoe snel hij laadt. SSG en SSR zijn twee fundamenteel verschillende aanpakken, met grote gevolgen voor snelheid en SEO.",
      sections: [
        {
          heading: "Hoe laadt een website eigenlijk?",
          body: `Wanneer je een URL intypt, stuurt jouw browser een verzoek naar een server. Die server stuurt een HTML-bestand terug, dat de browser vervolgens toont. Wat er op de server gebeurt voordat dat HTML-bestand teruggestuurd wordt, is het verschil tussen SSG en SSR.`,
        },
        {
          heading: "Wat is Server-Side Rendering (SSR)?",
          body: `Bij SSR bouwt de server de HTML-pagina op het moment dat een bezoeker hem opvraagt. De server haalt data op, combineert die met templates, en stuurt een kant-en-klare HTML-pagina naar de browser.\n\nHet voordeel: de inhoud kan altijd actueel zijn. Als een webshop nieuwe producten toevoegt, ziet de bezoeker direct de laatste stand.\n\nHet nadeel: elke paginaopvraag kost rekentijd op de server. Bij veel bezoekers tegelijk kan dat leiden tot vertraging. Bovendien moet je een server draaien die actief is.`,
        },
        {
          heading: "Wat is Static Site Generation (SSG)?",
          body: `Bij SSG worden alle pagina's van tevoren gebouwd, bij het deployen van de website. De HTML-bestanden liggen klaar op een CDN (Content Delivery Network) en worden direct naar de bezoeker gestuurd, zonder serververwerking.\n\nHet resultaat: pagina's laden razendsnel, want er is geen server die werk moet doen. Ze worden geserveerd vanuit een datacenter dichtbij de bezoeker.\n\nWij bouwen onze websites met React en Vite, gecombineerd met SSG. De pagina's worden statisch gegenereerd bij elke deploy en geserveerd via een wereldwijd CDN. Dat is waarom onze sites Lighthouse-scores van 100/100 halen.`,
        },
        {
          heading: "Wanneer kies je voor welke aanpak?",
          body: `**Kies SSG als:**\n- De inhoud van je site weinig verandert (bedrijfswebsite, portfolio, landingspagina)\n- Snelheid en SEO topprioriteit zijn\n- Je geen realtime data nodig hebt\n\n**Kies SSR als:**\n- De inhoud per gebruiker verschilt (ingelogde accounts, persoonlijke dashboards)\n- Je een grote webshop hebt met veel dynamische productpagina's\n- De data elk moment kan veranderen\n\nVoor de meeste bedrijfswebsites, portfoliosites en marketingpagina's is SSG de betere keuze. Sneller, goedkoper om te hosten, en beter voor SEO.`,
        },
        {
          heading: "Wat betekent dit voor jouw website?",
          body: `Als je een bedrijfswebsite of landingspagina wil laten bouwen, is SSG vrijwel altijd de juiste techniek. Je hoeft geen dure serverinfrastructuur te onderhouden, en de site laadt sneller dan bij SSR.\n\nBij BlueStar Development bouwen we standaard met SSG voor marketingwebsites en bedrijfssites. Voor web-applicaties die dynamische data vereisen, schakelen we over naar een hybride aanpak of SSR waar nodig.\n\nWil je weten welke aanpak voor jouw project het beste is? Neem contact op voor een vrijblijvend gesprek.`,
        },
      ],
    },
    en: {
      category: "Technology",
      imageAlt: "Code on a screen with speed indicators",
      title: "SSG vs SSR: how we make websites blazing fast",
      metaDescription:
        "Static Site Generation (SSG) and Server-Side Rendering (SSR) are two techniques for building websites. We explain the difference and why we choose SSG.",
      excerpt:
        "The technology behind a website determines how fast it loads. SSG and SSR are two fundamentally different approaches, with major consequences for speed and SEO.",
      sections: [
        {
          heading: "How does a website actually load?",
          body: `When you type a URL, your browser sends a request to a server. That server sends back an HTML file, which the browser then displays. What happens on the server before that HTML file is returned is the difference between SSG and SSR.`,
        },
        {
          heading: "What is Server-Side Rendering (SSR)?",
          body: `With SSR, the server builds the HTML page at the moment a visitor requests it. The server fetches data, combines it with templates, and sends a ready-made HTML page to the browser.\n\nThe advantage: the content can always be up to date. When a webshop adds new products, visitors see the latest state immediately.\n\nThe downside: every page request costs processing time on the server. With many simultaneous visitors this can cause delays. You also need to keep a server running at all times.`,
        },
        {
          heading: "What is Static Site Generation (SSG)?",
          body: `With SSG, all pages are built in advance, at the time the website is deployed. The HTML files sit ready on a CDN (Content Delivery Network) and are sent directly to the visitor, without any server processing.\n\nThe result: pages load blazing fast because no server has to do any work. They are served from a data centre close to the visitor.\n\nWe build our websites with React and Vite, combined with SSG. Pages are statically generated at every deploy and served via a global CDN. That is why our sites achieve Lighthouse scores of 100/100.`,
        },
        {
          heading: "When do you choose which approach?",
          body: `**Choose SSG when:**\n- Your site's content changes infrequently (business website, portfolio, landing page)\n- Speed and SEO are top priorities\n- You do not need real-time data\n\n**Choose SSR when:**\n- Content differs per user (logged-in accounts, personal dashboards)\n- You run a large webshop with many dynamic product pages\n- Data can change at any moment\n\nFor most business websites, portfolio sites and marketing pages, SSG is the better choice. Faster, cheaper to host, and better for SEO.`,
        },
        {
          heading: "What does this mean for your website?",
          body: `If you want a business website or landing page built, SSG is almost always the right technique. You do not need to maintain expensive server infrastructure, and the site loads faster than with SSR.\n\nAt BlueStar Development we build with SSG as standard for marketing websites and business sites. For web applications that require dynamic data, we switch to a hybrid approach or SSR where needed.\n\nWant to know which approach suits your project best? Get in touch for a no-obligation conversation.`,
        },
      ],
    },
  },
  {
    slug: "wat-is-een-lighthouse-score",
    publishedAt: "2026-04-30",
    readingTime: 4,
    image: "/blog/lighthouse-score.webp",
    nl: {
      category: "Prestaties",
      imageAlt: "Google Lighthouse rapport op een laptop scherm",
      title: "Wat is een Lighthouse-score en waarom maakt het uit?",
      metaDescription:
        "Google Lighthouse is het standaard gereedschap om de kwaliteit van een website te meten. Wij leggen uit wat de score betekent en hoe je hem verbetert.",
      excerpt:
        "Een Lighthouse-score van 100/100 klinkt indrukwekkend, maar wat meet het precies en waarom zou jij er als ondernemer om geven?",
      sections: [
        {
          heading: "Wat is Google Lighthouse?",
          body: `Google Lighthouse is een open-source tool van Google die de kwaliteit van webpagina's analyseert. Je vindt hem ingebouwd in de Chrome browser (via Developer Tools) en online via pagespeed.web.dev.\n\nLighthouse geeft scores op vier categorieën: Performance, Accessibility, Best Practices en SEO. Elke categorie scoort van 0 tot 100. Een score van 90 of hoger geldt als goed.`,
        },
        {
          heading: "Wat meet elke categorie?",
          body: `**Performance** meet hoe snel de pagina laadt en reageert. Dit zijn de Core Web Vitals plus aanvullende snelheidsmetrics. Een lage performance-score betekent dat bezoekers lang moeten wachten.\n\n**Accessibility** meet hoe goed de site werkt voor mensen met een beperking. Denk aan voldoende kleurcontrast, toetsenbordnavigatie en alt-teksten.\n\n**Best Practices** controleert technische kwaliteitsindicatoren: HTTPS, veilige links, moderne APIs, geen browserfouten in de console.\n\n**SEO** kijkt naar de basisfactoren die Google nodig heeft: meta-beschrijvingen, leesbare tekst, correcte robots.txt, en links met goede ankerteksten.`,
        },
        {
          heading: "Hoe halen wij 100/100?",
          body: `Een perfecte Lighthouse-score is geen toeval. Het vereist bewuste technische keuzes bij elke stap van de bouw:\n\n- Afbeeldingen worden geconverteerd naar WebP-formaat en voorzien van de juiste dimensies\n- JavaScript wordt opgesplitst zodat alleen de code die nodig is voor de huidige pagina geladen wordt\n- Lettertypen worden lokaal gehost met font-display: swap\n- Alle afbeeldingen krijgen beschrijvende alt-teksten\n- De site wordt gebouwd als statische HTML (SSG), wat de laadtijd drastisch verlaagt\n- Caching-headers zijn ingesteld zodat terugkerende bezoekers niets opnieuw hoeven te laden\n\nHet resultaat: een Lighthouse-score van 100/100 op alle vier de categorieën.`,
        },
        {
          heading: "Waarom zou jij als ondernemer om Lighthouse geven?",
          body: `Ten eerste: Google gebruikt de Performance-score als ranking-signaal. Een trage site scoort lager in de zoekresultaten dan een snelle site met vergelijkbare content.\n\nTen tweede: een trage site kost klanten. Onderzoek toont consistent aan dat 53% van de mobiele bezoekers afhaakt als een pagina langer dan 3 seconden laadt. Bij 0,9 seconden, onze gemiddelde laadtijd, haken bijna geen bezoekers af.\n\nTen derde: een hoge Accessibility-score betekent dat jouw site werkt voor meer mensen. Meer mensen die jouw site kunnen gebruiken, betekent meer potentiële klanten.`,
        },
        {
          heading: "Test jouw eigen site",
          body: `Ga naar pagespeed.web.dev, voer je URL in en kijk wat er uitkomt. Let vooral op de mobiele score, want Google indexeert tegenwoordig primair de mobiele versie van je site.\n\nZit je onder de 90? Dan is er waarschijnlijk winst te behalen. Neem contact met ons op. We kijken gratis wat de grootste verbeterpunten zijn.`,
        },
      ],
    },
    en: {
      category: "Performance",
      imageAlt: "Google Lighthouse report on a laptop screen",
      title: "What is a Lighthouse score and why does it matter?",
      metaDescription:
        "Google Lighthouse is the standard tool for measuring website quality. We explain what the score means and how you can improve it.",
      excerpt:
        "A Lighthouse score of 100/100 sounds impressive, but what exactly does it measure and why should you as a business owner care?",
      sections: [
        {
          heading: "What is Google Lighthouse?",
          body: `Google Lighthouse is an open-source tool from Google that analyses the quality of web pages. You can find it built into Chrome (via Developer Tools) and online at pagespeed.web.dev.\n\nLighthouse gives scores across four categories: Performance, Accessibility, Best Practices and SEO. Each category scores from 0 to 100. A score of 90 or above is considered good.`,
        },
        {
          heading: "What does each category measure?",
          body: `**Performance** measures how quickly the page loads and responds. This covers the Core Web Vitals plus additional speed metrics. A low performance score means visitors have to wait too long.\n\n**Accessibility** measures how well the site works for people with a disability. Think sufficient colour contrast, keyboard navigation and alt text.\n\n**Best Practices** checks technical quality indicators: HTTPS, safe links, modern APIs, no browser errors in the console.\n\n**SEO** looks at the basic factors Google needs: meta descriptions, readable text, a correct robots.txt, and links with good anchor text.`,
        },
        {
          heading: "How do we achieve 100/100?",
          body: `A perfect Lighthouse score is not an accident. It requires deliberate technical choices at every step of the build:\n\n- Images are converted to WebP format and given the correct dimensions\n- JavaScript is split so only the code needed for the current page is loaded\n- Fonts are hosted locally with font-display: swap\n- All images receive descriptive alt text\n- The site is built as static HTML (SSG), which dramatically reduces load time\n- Caching headers are set so returning visitors do not have to reload anything\n\nThe result: a Lighthouse score of 100/100 across all four categories.`,
        },
        {
          heading: "Why should you as a business owner care about Lighthouse?",
          body: `First: Google uses the Performance score as a ranking signal. A slow site ranks lower in search results than a fast site with comparable content.\n\nSecond: a slow site costs you customers. Research consistently shows that 53% of mobile visitors leave if a page takes longer than 3 seconds to load. At 0.9 seconds, our average load time, almost no visitors drop off.\n\nThird: a high Accessibility score means your site works for more people. More people who can use your site means more potential customers.`,
        },
        {
          heading: "Test your own site",
          body: `Go to pagespeed.web.dev, enter your URL and see what comes back. Pay particular attention to the mobile score, because Google now primarily indexes the mobile version of your site.\n\nScoring below 90? There is probably room for improvement. Get in touch with us. We will take a free look at what the biggest wins are.`,
        },
      ],
    },
  },
  {
    slug: "waarom-wij-react-gebruiken",
    publishedAt: "2026-04-15",
    readingTime: 5,
    image: "/blog/waarom-react.webp",
    nl: {
      category: "Techniek",
      imageAlt: "Code editor met React code op een scherm",
      title: "Waarom wij React gebruiken voor onze websites",
      metaDescription:
        "React is het meest gebruikte JavaScript-framework voor moderne websites. Wij leggen uit waarom wij voor React kiezen en wat dat voor jou als klant betekent.",
      excerpt:
        "Er zijn tientallen manieren om een website te bouwen. Wij kiezen bewust voor React, niet omdat het populair is, maar omdat het de beste resultaten geeft voor onze klanten.",
      sections: [
        {
          heading: "Wat is React?",
          body: `React is een JavaScript-bibliotheek, oorspronkelijk ontwikkeld door Facebook (nu Meta), voor het bouwen van gebruikersinterfaces. Het is niet een volledig framework maar een gerichte tool die zich richt op het renderen van de interface.\n\nReact wordt gebruikt door bedrijven als Airbnb, Netflix, Atlassian en duizenden andere grote en kleine organisaties wereldwijd. Het is inmiddels de meest gebruikte UI-bibliotheek voor het web.`,
        },
        {
          heading: "Component-gebaseerd denken",
          body: `Het kernidee van React is het component. Een component is een herbruikbaar bouwblok van de interface. Denk aan een knop, een navigatiebalk, een contactformulier.\n\nWanneer we een website bouwen in React, denken we in componenten. De navigatiebalk is één component. De FAQ-sectie is één component. Elk blok is op zichzelf staand, testbaar en herbruikbaar.\n\nHet voordeel voor jou als klant: aanpassingen zijn precies en voorspelbaar. Als we de navigatiebalk aanpassen, verandert die overal tegelijk. Er is geen risico dat we ergens iets missen.`,
        },
        {
          heading: "React in combinatie met SSG",
          body: `React op zichzelf levert een applicatie die client-side rendert: de browser bouwt de pagina op uit JavaScript. Dat is snel voor interacties, maar slecht voor SEO. Google ziet namelijk een lege pagina als de HTML niet vooraf gegenereerd is.\n\nWij combineren React daarom met Static Site Generation (SSG). Bij het bouwen van de site wordt React gebruikt om alle pagina's als statische HTML te genereren. Die HTML wordt direct naar de bezoeker gestuurd, zonder te wachten op JavaScript.\n\nHet resultaat: razendsnel voor bezoekers, perfect leesbaar voor Google, en toch alle voordelen van moderne React-interactiviteit zodra de pagina geladen is.`,
        },
        {
          heading: "Onderhoud en toekomstbestendigheid",
          body: `Een website is geen eenmalig product. Na de lancering komen er updates, nieuwe functies, aanpassingen aan de content. React maakt dat eenvoudig.\n\nOmdat de code gestructureerd is in componenten, is het voor elke React-ontwikkelaar snel te begrijpen. Je bent niet afhankelijk van één persoon die de enige is die de code begrijpt. De codebase is overdraagbaar.\n\nBovendien is React actief onderhouden. Er zijn geen zorgen over een framework dat over twee jaar verouderd is en niet meer ondersteund wordt.`,
        },
        {
          heading: "Waarom niet WordPress of Webflow?",
          body: `WordPress is het meest gebruikte CMS ter wereld, maar dat is tegelijk het probleem. Het is ontworpen voor content-beheer, niet voor performance. Een standaard WordPress-site haalt zelden een Lighthouse-score boven de 70 zonder extensieve optimalisatie.\n\nWebflow is beter dan WordPress op het gebied van performance, maar beperkt in maatwerk. Zodra je iets wil wat buiten het Webflow-systeem valt, loop je tegen muren aan.\n\nMet React bouwen we precies wat jij nodig hebt, niets meer en niets minder. Geen onnodige plugins, geen overhead, geen beperkingen.`,
        },
      ],
    },
    en: {
      category: "Technology",
      imageAlt: "Code editor with React code on a screen",
      title: "Why we use React for our websites",
      metaDescription:
        "React is the most widely used JavaScript library for modern websites. We explain why we choose React and what that means for you as a client.",
      excerpt:
        "There are dozens of ways to build a website. We deliberately choose React, not because it is popular, but because it delivers the best results for our clients.",
      sections: [
        {
          heading: "What is React?",
          body: `React is a JavaScript library, originally developed by Facebook (now Meta), for building user interfaces. It is not a full framework but a focused tool aimed specifically at rendering the interface.\n\nReact is used by companies like Airbnb, Netflix, Atlassian and thousands of other large and small organisations worldwide. It is now the most widely used UI library for the web.`,
        },
        {
          heading: "Component-based thinking",
          body: `The core idea of React is the component. A component is a reusable building block of the interface. Think of a button, a navigation bar, a contact form.\n\nWhen we build a website in React, we think in components. The navigation bar is one component. The FAQ section is one component. Every block is self-contained, testable and reusable.\n\nThe benefit for you as a client: changes are precise and predictable. If we update the navigation bar, it changes everywhere at once. There is no risk of missing something somewhere.`,
        },
        {
          heading: "React combined with SSG",
          body: `React on its own delivers an application that renders client-side: the browser builds the page from JavaScript. That is fast for interactions, but bad for SEO. Google sees an empty page when the HTML is not generated in advance.\n\nWe therefore combine React with Static Site Generation (SSG). When building the site, React is used to generate all pages as static HTML. That HTML is sent directly to the visitor, without waiting for JavaScript.\n\nThe result: blazing fast for visitors, perfectly readable for Google, and still all the benefits of modern React interactivity once the page has loaded.`,
        },
        {
          heading: "Maintenance and future-proofing",
          body: `A website is not a one-time product. After launch come updates, new features, content changes. React makes all of that straightforward.\n\nBecause the code is structured in components, any React developer can understand it quickly. You are not dependent on one person who is the only one who understands the code. The codebase is transferable.\n\nReact is also actively maintained. There is no concern about a framework becoming outdated in two years and losing support.`,
        },
        {
          heading: "Why not WordPress or Webflow?",
          body: `WordPress is the most widely used CMS in the world, but that is precisely the problem. It was designed for content management, not for performance. A standard WordPress site rarely achieves a Lighthouse score above 70 without extensive optimisation.\n\nWebflow is better than WordPress on performance, but limited in customisation. The moment you want something outside the Webflow system, you hit walls.\n\nWith React we build exactly what you need, nothing more and nothing less. No unnecessary plugins, no overhead, no limitations.`,
        },
      ],
    },
  },
];

// Helper: geeft gelokaliseerde posts terug
/** Titel voor de browser en Google: met merknaam als die binnen ~60 tekens past, anders alleen de titel. */
export const postMetaTitle = (title) => (`${title} | BlueStar`.length <= 60 ? `${title} | BlueStar` : title);

export function getLocalizedPosts(lang = "nl") {
  return postData.map((p) => ({
    slug: p.slug,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    image: p.image,
    ...(p[lang] ?? p.nl),
  }));
}

export function getLocalizedPostBySlug(slug, lang = "nl") {
  const p = postData.find((p) => p.slug === slug);
  if (!p) return null;
  return {
    slug: p.slug,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    image: p.image,
    ...(p[lang] ?? p.nl),
  };
}

export function getLatestLocalizedPosts(n = 3, lang = "nl") {
  return getLocalizedPosts(lang).slice(0, n);
}

// Backward-compat exports (SSG prerender gebruikt deze)
export const posts = getLocalizedPosts("nl");
export function getPostBySlug(slug) { return getLocalizedPostBySlug(slug, "nl"); }
export function getLatestPosts(n = 3) { return getLatestLocalizedPosts(n, "nl"); }
