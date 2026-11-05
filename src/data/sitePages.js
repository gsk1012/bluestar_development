// Contact, Over ons, het portfolio-overzicht en de cases — NL+EN, net als
// servicePages.js. Tekst in `body` volgt dezelfde opmaak (zie Prose.jsx).
// Feiten hier komen uit de rest van de site; voeg niets toe wat niet klopt.

import { projects } from "./projects.js";

const BASE = "https://bluestardevelopment.nl";

export const EMAIL = "info@bluestardevelopment.nl";
export const PHONE = { label: "06 8647 7249", tel: "0686477249" };

export const contactPage = {
  path: "/contact",
  updatedAt: "2026-11-05",
  nl: {
    breadcrumb: "Contact",
    metaTitle: "Contact | BlueStar Development",
    metaDescription:
      "Neem contact op met BlueStar Development voor een website of webapplicatie op maat. Mail, bel of stuur een bericht: we reageren binnen 24 uur.",
    heading: ["Neem ", "contact", " op"],
    lead:
      "Een vraag over een nieuwe website, een webapplicatie of het onderhoud van je huidige site? Stuur een bericht, mail of bel. We bevestigen je bericht dezelfde werkdag en reageren binnen 24 uur.",
    cta: "Stuur een bericht",
    panelTitle: "Direct contact",
    rows: [
      { icon: "mail", label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
      { icon: "phone", label: "Telefoon", value: PHONE.label, href: `tel:${PHONE.tel}` },
      { icon: "clock", label: "Reactietijd", value: "Binnen 24 uur" },
      { icon: "map", label: "Werkgebied", value: "Heel Nederland" },
    ],
    note: "We begeleiden projecten grotendeels op afstand, maar een persoonlijk gesprek is altijd mogelijk.",
  },
  en: {
    breadcrumb: "Contact",
    metaTitle: "Contact | BlueStar Development",
    metaDescription:
      "Get in touch with BlueStar Development about a custom website or web application. Email, call or send a message: we reply within 24 hours.",
    heading: ["Get in ", "touch"],
    lead:
      "A question about a new website, a web application or maintenance of your current site? Send a message, email or call. We confirm your message the same working day and reply within 24 hours.",
    cta: "Send a message",
    panelTitle: "Direct contact",
    rows: [
      { icon: "mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { icon: "phone", label: "Phone", value: PHONE.label, href: `tel:${PHONE.tel}` },
      { icon: "clock", label: "Response time", value: "Within 24 hours" },
      { icon: "map", label: "Service area", value: "All of the Netherlands" },
    ],
    note: "We mostly guide projects remotely, but a face-to-face meeting is always possible.",
  },
};

export const aboutPage = {
  path: "/over-ons",
  updatedAt: "2026-11-05",
  nl: {
    breadcrumb: "Over ons",
    metaTitle: "Over ons | BlueStar Development",
    metaDescription:
      "BlueStar Development bouwt snelle, vindbare websites en webapplicaties op maat voor ondernemers in heel Nederland. Lees hoe we werken en waar we voor staan.",
    heading: ["Over ", "BlueStar Development"],
    lead:
      "We bouwen websites en webapplicaties voor ondernemers die online professioneel willen overkomen en daar resultaat van willen zien. Geen templates en geen vage offertes, maar een eigen ontwerp, vooraf duidelijke afspraken en één vast aanspreekpunt van de eerste schets tot ver na de lancering.",
    principles: {
      heading: ["Waar we voor ", "staan"],
      lead:
        "Zes uitgangspunten die voor elk project gelden, klein of groot. Ze zitten in de prijs en zijn niet onderhandelbaar.",
      items: [
        {
          icon: "pen",
          title: "Een eigen ontwerp",
          text: "Elke site begint bij het bedrijf erachter: wie zijn de klanten en wat moeten ze kunnen doen? Daar ontwerpen we omheen, nooit vanuit een template.",
        },
        {
          icon: "gauge",
          title: "Snelheid is standaard",
          text: "Elke website haalt een Lighthouse-score van 100/100. Niet als extra, maar als uitgangspunt.",
        },
        {
          icon: "eye",
          title: "Toegankelijk voor iedereen",
          text: "We bouwen volgens WCAG AA, zodat je site ook werkt met een schermlezer of alleen een toetsenbord.",
        },
        {
          icon: "chat",
          title: "Eén vast aanspreekpunt",
          text: "Je hebt steeds hetzelfde aanspreekpunt, dat je project en je site kent. Geen doorverwijzingen.",
        },
        {
          icon: "list",
          title: "Duidelijke afspraken",
          text: "Vooraf weet je wat je krijgt, wat het kost en wanneer het klaar is. Er komt achteraf niets bij.",
        },
        {
          icon: "lifebuoy",
          title: "Ook na de lancering",
          text: "30 dagen gratis support na de livegang. Daarna houden we je site bij als je dat wilt, vanaf €49 per maand.",
        },
      ],
    },
    stack: {
      heading: ["Waarmee we ", "bouwen"],
      body: `We bouwen met React en vooraf opgebouwde, statische pagina's. De browser krijgt direct een complete pagina en hoeft weinig code te laden, daardoor is je site snel en goed leesbaar voor Google. In ons blog lees je [waarom we voor React kiezen](/blog/waarom-wij-react-gebruiken) en wat [het verschil tussen SSG en SSR](/blog/ssg-vs-ssr-razendsnel-website) is.\n\nJe site draait op een snel CDN met een SSL-certificaat en dagelijkse back-ups. Na de oplevering dragen we alle bestanden aan je over.`,
      tools: ["React", "Vite", "Static Site Generation", "Tailwind CSS", "CDN-hosting", "SSL", "Dagelijkse back-ups"],
    },
  },
  en: {
    breadcrumb: "About us",
    metaTitle: "About us | BlueStar Development",
    metaDescription:
      "BlueStar Development builds fast, findable custom websites and web applications for businesses across the Netherlands. Read how we work and what we stand for.",
    heading: ["About ", "BlueStar Development"],
    lead:
      "We build websites and web applications for businesses that want to come across professionally online and see results from it. No templates and no vague quotes, but a design of your own, clear agreements up front and one fixed point of contact from the first sketch until well after launch.",
    principles: {
      heading: ["What we ", "stand for"],
      lead: "Six principles that apply to every project, small or large. They are included in the price and not up for negotiation.",
      items: [
        { icon: "pen", title: "A design of your own", text: "Every site starts with the business behind it: who are the customers and what do they need to do? We design around that, never from a template." },
        { icon: "gauge", title: "Speed is standard", text: "Every website achieves a Lighthouse score of 100/100. Not as an extra, but as the starting point." },
        { icon: "eye", title: "Accessible to everyone", text: "We build to WCAG AA, so your site also works with a screen reader or just a keyboard." },
        { icon: "chat", title: "One fixed point of contact", text: "You always deal with the same point of contact, who knows your project and your site. No handoffs." },
        { icon: "list", title: "Clear agreements", text: "You know in advance what you get, what it costs and when it's ready. Nothing is added afterwards." },
        { icon: "lifebuoy", title: "Also after launch", text: "30 days of free support after going live. After that we keep your site up to date if you want, from €49 per month." },
      ],
    },
    stack: {
      heading: ["What we ", "build with"],
      body: `We build with React and prebuilt, static pages. The browser receives a complete page straight away and has little code to load, which makes your site fast and easy for Google to read. Our blog explains [why we choose React](/blog/waarom-wij-react-gebruiken) and [the difference between SSG and SSR](/blog/ssg-vs-ssr-razendsnel-website).\n\nYour site runs on a fast CDN with an SSL certificate and daily backups. After delivery we hand over all files to you.`,
      tools: ["React", "Vite", "Static Site Generation", "Tailwind CSS", "CDN hosting", "SSL", "Daily backups"],
    },
  },
};

export const portfolioPage = {
  path: "/portfolio",
  updatedAt: "2026-11-05",
  nl: {
    breadcrumb: "Portfolio",
    metaTitle: "Portfolio | Websites van BlueStar Development",
    metaDescription:
      "Bekijk websites die BlueStar Development ontwierp en bouwde: snelle, vindbare sites met een eigen ontwerp, van bedrijfswebsite tot portfolio.",
    heading: ["", "Websites", " die we bouwden"],
    lead:
      "Elk project begint bij het bedrijf erachter: wie zijn de klanten, wat zoeken ze en wat moeten ze kunnen doen? Daar ontwerpen we de site omheen, steeds met een eigen ontwerp in plaats van een template. Hier lees je per project wat we bouwden en waarom.",
    viewCase: "Bekijk de case",
  },
  en: {
    breadcrumb: "Portfolio",
    metaTitle: "Portfolio | Websites by BlueStar Development",
    metaDescription:
      "See websites designed and built by BlueStar Development: fast, findable sites with a design of their own, from business website to portfolio.",
    heading: ["", "Websites", " we built"],
    lead:
      "Every project starts with the business behind it: who are the customers, what are they looking for and what do they need to do? We design the site around that, always with a design of its own instead of a template. Here you can read per project what we built and why.",
    viewCase: "View the case",
  },
};

const caseData = [
  {
    slug: "prince-schilder",
    updatedAt: "2026-11-05",
    project: projects[0],
    nl: {
      breadcrumb: "Prince Schilder",
      metaTitle: "Case: website voor Prince Schilder | BlueStar Development",
      metaDescription:
        "Hoe BlueStar Development een mobiel-first bedrijfswebsite bouwde voor Prince Schilder, een schildersbedrijf in Amsterdam, met offerteformulier.",
      kind: "Bedrijfswebsite",
      client: "Schildersbedrijf in Amsterdam",
      heading: ["", "Prince Schilder", ": een website voor een schildersbedrijf"],
      lead:
        "Een professionele bedrijfswebsite voor een schildersbedrijf in Amsterdam. Gemaakt voor bezoekers die op hun telefoon een schilder zoeken en snel een offerte willen aanvragen.",
      sections: [
        {
          heading: "Het doel",
          body: `Een schildersbedrijf wordt vooral gevonden door mensen die op dat moment een klus hebben. Ze willen snel zien wat het bedrijf doet, of het werk er goed uitziet en hoe ze een offerte aanvragen. De site moest die drie vragen beantwoorden, en dat vooral goed doen op de telefoon.`,
        },
        {
          heading: "Wat we bouwden",
          body: `- **Mobiel-first ontwerp**: eerst ontworpen voor de telefoon, daarna voor grotere schermen\n- **Offerte-aanvraagformulier**: bezoekers vragen direct vanaf de site een offerte aan\n- **Diensten- en werkenoverzicht**: wat het bedrijf doet en eerder werk, overzichtelijk bij elkaar\n- **Geanimeerde cijfers en een klantreview**: vertrouwen in één oogopslag`,
        },
        {
          heading: "Hoe de site is gebouwd",
          body: `Net als al onze websites heeft deze site een eigen ontwerp in plaats van een template, en is hij gebouwd op snelheid, vindbaarheid en toegankelijkheid. Wil je zelf zo'n site? Lees wat je krijgt bij [website laten maken](/website-laten-maken).`,
        },
      ],
    },
    en: {
      breadcrumb: "Prince Schilder",
      metaTitle: "Case: website for Prince Schilder | BlueStar Development",
      metaDescription:
        "How BlueStar Development built a mobile-first business website for Prince Schilder, a painting company in Amsterdam, with a quote form.",
      kind: "Business website",
      client: "Painting company in Amsterdam",
      heading: ["", "Prince Schilder", ": a website for a painting company"],
      lead:
        "A professional business website for a painting company in Amsterdam. Made for visitors who look for a painter on their phone and want to request a quote quickly.",
      sections: [
        {
          heading: "The goal",
          body: `A painting company is mostly found by people who have a job to do right then. They want to see quickly what the company does, whether the work looks good and how to request a quote. The site had to answer those three questions, and do it well on a phone above all.`,
        },
        {
          heading: "What we built",
          body: `- **Mobile-first design**: designed for the phone first, then for larger screens\n- **Quote request form**: visitors request a quote straight from the site\n- **Services and work overview**: what the company does and previous work, clearly together\n- **Animated figures and a customer review**: trust at a glance`,
        },
        {
          heading: "How the site is built",
          body: `Like all our websites, this site has a design of its own instead of a template, and it's built for speed, findability and accessibility. Want a site like this? Read what you get with [a custom website](/website-laten-maken).`,
        },
      ],
    },
  },
  {
    slug: "gsk-portfolio",
    updatedAt: "2026-11-05",
    project: projects[1],
    nl: {
      breadcrumb: "GSK Portfolio",
      metaTitle: "Case: portfolio-website GSK Portfolio | BlueStar Development",
      metaDescription:
        "Hoe BlueStar Development een strakke, moderne portfolio-website bouwde met een donker futuristisch thema, live GitHub-activiteit en soepele scroll-animaties.",
      kind: "Portfolio",
      client: "Persoonlijke portfolio-website",
      heading: ["", "GSK Portfolio", ": een portfolio met een eigen gezicht"],
      lead:
        "Een strakke, moderne portfolio-website om werk en vaardigheden te presenteren, met een donker, futuristisch thema en live activiteit van GitHub.",
      sections: [
        {
          heading: "Het doel",
          body: `Een portfolio moet in een paar seconden laten zien wie je bent en wat je kunt. Deze site doet dat met een uitgesproken donker ontwerp en echte, actuele activiteit, in plaats van alleen een lijst met vaardigheden.`,
        },
        {
          heading: "Wat we bouwden",
          body: `- **Donker futuristisch thema**: een uitgesproken ontwerp dat meteen opvalt\n- **Live GitHub-activiteit**: actueel werk, direct uit GitHub\n- **Soepele scroll-animaties**: de pagina komt tot leven tijdens het scrollen\n- **Responsief**: werkt op elk schermformaat`,
        },
        {
          heading: "Hoe de site is gebouwd",
          body: `Ook deze site heeft een eigen ontwerp in plaats van een template en is gebouwd op snelheid en toegankelijkheid. Benieuwd wat dat voor jouw bedrijf kan betekenen? Lees meer over [website laten maken](/website-laten-maken).`,
        },
      ],
    },
    en: {
      breadcrumb: "GSK Portfolio",
      metaTitle: "Case: GSK Portfolio website | BlueStar Development",
      metaDescription:
        "How BlueStar Development built a sleek, modern portfolio website with a dark futuristic theme, live GitHub activity and smooth scroll animations.",
      kind: "Portfolio",
      client: "Personal portfolio website",
      heading: ["", "GSK Portfolio", ": a portfolio with its own face"],
      lead:
        "A sleek, modern portfolio website to present work and skills, with a dark, futuristic theme and live activity from GitHub.",
      sections: [
        {
          heading: "The goal",
          body: `A portfolio has to show who you are and what you can do within a few seconds. This site does that with an outspoken dark design and real, current activity, instead of just a list of skills.`,
        },
        {
          heading: "What we built",
          body: `- **Dark futuristic theme**: an outspoken design that stands out straight away\n- **Live GitHub activity**: current work, straight from GitHub\n- **Smooth scroll animations**: the page comes to life as you scroll\n- **Responsive**: works on every screen size`,
        },
        {
          heading: "How the site is built",
          body: `This site also has a design of its own instead of a template and is built for speed and accessibility. Curious what that could mean for your business? Read more about [a custom website](/website-laten-maken).`,
        },
      ],
    },
  },
];

export const CASE_SLUGS = caseData.map((c) => c.slug);

function localize(item, lang) {
  const { nl, en, ...rest } = item;
  return { ...rest, ...(lang === "en" ? en : nl) };
}

export const getContactPage = (lang = "nl") => localize(contactPage, lang);
export const getAboutPage = (lang = "nl") => localize(aboutPage, lang);
export const getPortfolioPage = (lang = "nl") => localize(portfolioPage, lang);
export const getCases = (lang = "nl") => caseData.map((c) => localize(c, lang));
export function getCase(slug, lang = "nl") {
  const item = caseData.find((c) => c.slug === slug);
  return item ? localize(item, lang) : null;
}

/** Gedeelde JSON-LD voor een subpagina: WebPage (of subtype) met kruimelpad. */
export function pageJsonLd({ path, type = "WebPage", name, description, crumbs, extra = [], updatedAt }) {
  const url = `${BASE}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "nl-NL",
        ...(updatedAt && { dateModified: updatedAt }),
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${BASE}${c.path}`,
          })),
        },
      },
      ...extra,
    ],
  };
}
