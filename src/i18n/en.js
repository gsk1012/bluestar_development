// Headings with emphasis are arrays: every odd part (index 1, 3, …) becomes
// the one bold indigo phrase. See components/Heading.jsx.
const en = {
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    approach: "Approach",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contact",
    pricing: "Pricing",
    cta: "Schedule a call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    logoAria: "BlueStar Development, go to homepage",
    langLabel: "Language",
  },
  hero: {
    line1: "Websites that",
    line2: "make your",
    // See nl.js — fixed prefix plus one rotating word, full stop included.
    line3prefix: "business ",
    line3words: ["grow.", "stand out.", "sell."],
    sub1: "Looking for a website? Fast, findable websites and web applications built to order.",
    sub2: "Built around your brand and your customers, from first sketch to live site.",
    cta: "Schedule a call",
    secondary: "View our work",
    callPrefix: "Rather call directly?",
  },
  services: {
    heading: ["Everything for your ", "online presence"],
    subheading:
      "A good website is more than a nice design. It has to load fast, be found on Google and get visitors to do what you want: call, email or request a quote. That's why we handle everything under one roof, from design and build to hosting and maintenance. You have one point of contact and nothing to worry about.",
    termLabel: "Turnaround",
    readMore: "Read more",
    items: {
      website: {
        title: "Custom website",
        desc: "Fast, findable and built around your brand.",
        term: "4 to 8 weeks",
      },
      webapp: {
        title: "Web application",
        desc: "Custom browser software, built around your workflow.",
        term: "Depends on scope",
      },
      maintenance: {
        title: "Maintenance & support",
        desc: "Updates, backups and help, so your site stays safe.",
        term: "Ongoing, monthly",
      },
      hosting: {
        title: "Hosting",
        desc: "Fast and secure online, included as standard.",
        term: "From launch day",
      },
    },
  },
  why: {
    heading: ["Why ", "BlueStar", "?"],
    body:
      "Having a website built often feels like a gamble: what will it cost, how long will it take and who is actually working on it? With us you agree up front what you get and when, with one point of contact from first sketch to well after launch.",
    imageAlt: "Homepage of Prince Schilder, a business website built by BlueStar Development.",
    imageCaption: "Prince Schilder: its own design, no template.",
    facts: [
      { value: "4–8 weeks", label: "until your custom site is live" },
      { value: "30 days", label: "free support after launch" },
      { value: "100/100", label: "Lighthouse score, as standard" },
      { value: "1", label: "dedicated point of contact" },
    ],
  },
  pricing: {
    heading: ["Clear prices, ", "known up front"],
    subheading:
      "The cost depends on what you need. If you want to get online quickly and simply, a basic website starts at €495. A custom website and custom software are priced after a short conversation about your needs, so you never pay for something you won't use. No hidden costs: you know exactly where you stand in advance.",
    from: "from",
    termLabel: "Turnaround",
    intentMessage: "I'd like a quote for",
    excludedLabel: "Not included",
    plans: [
      {
        key: "basic",
        title: "Basic website",
        suits: "For starters who want to get online quickly and simply.",
        from: true,
        price: "€495",
        unit: "one-off",
        term: "Short project",
        features: [
          "One page (one-pager)",
          "Simple design in your brand style",
          "Responsive on every screen",
          "One contact form",
          "Hosting and SSL certificate",
        ],
        excluded: "extra pages, search engine optimisation and support after launch",
        cta: "Start with a basic website",
      },
      {
        key: "website",
        featured: true,
        title: "Custom website",
        suits: "For businesses that want more than a business card: findable, complete and fully custom.",
        from: false,
        price: "By arrangement",
        unit: "custom quote",
        term: "4 to 8 weeks",
        features: [
          "Unique design around your brand",
          "As many pages as you need",
          "Findable in Google",
          "Lightning fast on mobile and desktop",
          "Expandable with a blog or second language",
          "One fixed point of contact",
          "30 days of support after launch",
          "Hosting with daily backups",
        ],
        cta: "Schedule a call",
      },
      {
        key: "webapp",
        title: "Web application",
        suits: "For businesses that need custom software.",
        from: false,
        price: "On request",
        unit: "tailored quote",
        term: "Depends on scope",
        features: [
          "Customer portals",
          "Planning tools",
          "Internal dashboards",
          "Built around your workflow",
        ],
        cta: "Request a quote",
      },
    ],
    maintenanceTitle: "Maintenance & support",
    maintenancePrice: "from €49 per month",
    maintenanceBody: "Software updates, security patches, backup checks and technical help with questions. Hosting with SSL is included with every site; hosting on its own is possible on request.",
    maintenanceCta: "Request maintenance",
    extrasTitle: "Optional extras",
    extras: ["Multilingual (NL + EN)", "Blog or knowledge base", "Custom animations"],
    moreLink: "All about pricing",
    vatNote: "All prices exclude VAT.",
  },
  portfolio: {
    heading: ["Work we're ", "proud", " of"],
    subheading:
      "Every project starts with the business behind it: who are the customers, what are they looking for and what should they be able to do? We design the site around that, always with its own design instead of a template. Hover over a screenshot to scroll through the whole page.",
    readCase: "Read the case",
    viewProject: "View project",
    imageUnavailable: "Image not available",
    viewTabAriaPrefix: "View",
    viewTabAriaSuffix: "in a new tab",
    screenshotAlt: "Screenshot of the website",
    scrollHint: "Hover to scroll",
    projects: [
      {
        title: "Prince Schilder",
        kind: "Business website",
        description: "Professional business website for a painting company in Amsterdam.",
        highlights: [
          "Mobile-first design",
          "Quote request form",
          "Services & work overview",
          "Animated stats & testimonial",
        ],
      },
      {
        title: "GSK Portfolio",
        kind: "Portfolio",
        description: "A sleek, modern portfolio site to showcase work and skills.",
        highlights: [
          "Dark futuristic theme",
          "Live GitHub activity",
          "Smooth scroll animations",
          "Responsive on all screen sizes",
        ],
      },
    ],
  },
  process: {
    heading: ["How we ", "work"],
    subheading:
      "A new website shouldn't be a gamble. That's why we work in four clear steps, with firm agreements on what you get and when. You see the design before we start building, and you can steer at every step. After launch we stay available for updates, questions and changes.",
    steps: [
      {
        title: "Introduction",
        description: "We discuss your goals, brand and what your customers need.",
      },
      {
        title: "Design",
        description: "A clear design that fits your brand and guides your visitors.",
      },
      {
        title: "Build",
        description: "We build a fast, findable site that works on every screen.",
      },
      {
        title: "Launch & maintenance",
        description: "Going live, and then we keep looking after updates and support.",
      },
    ],
  },
  testimonials: {
    heading: ["What clients ", "say about us"],
    subheading:
      "We build for business owners who want a site that simply works, without hassle. What counts is the result: more enquiries, a professional first impression and a collaboration without surprises. Here's what clients say about it.",
    items: [
      {
        quote:
          "Since the new site we get far more enquiries. Customers find us more easily and the first impression is immediately professional.",
        name: "Gurdeep Singh",
        role: "Owner, Prince Schilder",
        photoNote: "Illustrative photo, not the client.",
      },
      {
        quote:
          "The design is sharp and modern, exactly what I was looking for. Everything I wanted to showcase is there just as I envisioned it.",
        name: "Gurpreet Singh",
        role: "Client, GSK Portfolio",
        photoNote: "Illustrative photo, not the client.",
      },
    ],
  },
  contact: {
    heading: ["Ready for a ", "new website", "?"],
    body: "Tell us about your plans. We're happy to think along and send you a no-obligation proposal.",
    directLabel: "Or get in touch directly",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "name@company.com",
    messagePlaceholder:
      "Tell us about your project. What kind of site are you looking for, what's your deadline, and do you already have a brand identity?",
    messageLabel: "Message",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Thanks for your message!",
    successBody: "We confirm receipt the same working day and reply within 24 hours.",
    error: "Something went wrong. Send your message to",
    errorSuffix: "or call us directly.",
    emailSubject: "New message via bluestardevelopment.nl",
  },
  faq: {
    heading: ["Frequently asked ", "questions"],
    subheading:
      "Still in doubt, or want to know how it works first? These are the questions business owners ask us most, about price, planning and what happens after launch.",
    notFound: "Can't find your question?",
    notFoundLink: "Get in touch",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "The price depends on the scope and complexity of the project. A basic website (one-pager) starts at €495 (excl. VAT). A custom website and a web application are priced by arrangement. Contact us for a no-obligation custom quote.",
      },
      {
        question: "How quickly can BlueStar Development build a website?",
        answer:
          "The turnaround time depends on the scope. A custom website is usually live within four to eight weeks; we agree on the exact schedule together. Schedule a call for a concrete timeline.",
      },
      {
        question: "Do you work with small businesses and freelancers?",
        answer:
          "Absolutely. We work with entrepreneurs of all sizes, from freelancers and small businesses to growing SMEs. We scale the solution to match your needs and budget.",
      },
      {
        question: "Are you available after launch?",
        answer:
          "Yes. We offer maintenance and support after delivery. Think updates, backups, technical help and adjustments as your business grows.",
      },
      {
        question: "Which area do you work in?",
        answer:
          "We work for entrepreneurs throughout the Netherlands. We manage most projects remotely, but a personal meeting is always possible.",
      },
    ],
  },
  blog: {
    heading: ["From our ", "blog"],
    subheading:
      "How fast should a website be? What exactly does Google measure, and what does accessibility mean for your site? Our blog explains it in plain language, so you make better choices for your own website.",
    pageHeading: ["Web development ", "tips"],
    pageSubheading:
      "Technical insights on how modern websites are built, how Google evaluates them, and why that matters for you.",
    read: "Read",
    readMore: "Read more",
    readingTime: "min read",
    filterLabel: "Filter by topic",
    filterAll: "All",
    viewAll: "View all posts",
    back: "Back to blog",
    more: "More articles",
    ctaHeading: ["Ready for a ", "fast website", "?"],
    ctaBody:
      "We build sites that score on speed, accessibility and findability. Schedule a no-obligation call.",
    ctaButton: "Schedule a call",
  },
  servicePage: {
    breadcrumbLabel: "Breadcrumb",
    updated: "Updated on",
    home: "Home",
    services: "Services",
    cta: "Schedule a call",
    panelLabel: "Price indication",
    from: "from",
    caseLabel: "From practice",
    caseVisit: "Visit the website",
    caseMore: "More work",
    relatedHeading: ["More ", "services"],
    readMore: "Read more",
  },
  pages: {
    portfolio: "Portfolio",
    caseType: "Type",
    caseClient: "Client",
    caseLive: "Live website",
    caseVisit: "Visit the website",
    caseMore: "More work",
    allWork: "See all our work",
    legalPdf: "Download as PDF",
    legalArticle: "Article",
    legalOnlyDutch: "This document is only available in Dutch.",
    aboutFacts: "In short",
  },
  notFound: {
    metaTitle: "Page not found | BlueStar Development",
    label: "ERROR 404",
    line1: "This building",
    line2: "isn't here.",
    body: "The page you're looking for doesn't exist (anymore) or has moved. No worries: you'll find your way back below.",
    home: "Go to the homepage",
    contact: "Get in touch",
    popularLabel: "Or go straight to",
    links: [
      { label: "Custom websites", href: "/website-laten-maken" },
      { label: "Pricing", href: "/prijzen" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
    ],
  },
  footer: {
    tagline: "Fast, findable websites and web applications built to order for entrepreneurs.",
    services: "Services",
    navigation: "Navigation",
    contact: "Contact",
    copyright: "All rights reserved.",
    terms: "Terms and conditions",
    privacy: "Privacy policy",
    disclaimer: "Disclaimer",
    navLinks: [
      { label: "Services", href: "#diensten" },
      { label: "Work", href: "/portfolio", external: true },
      { label: "Approach", href: "#aanpak" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "/blog", external: true },
      { label: "About us", href: "/over-ons", external: true },
      { label: "Contact", href: "/contact", external: true },
    ],
  },
  cookie: {
    bannerText:
      "We use cookies to keep the website running properly and to improve your experience. Read our",
    privacyLabel: "privacy policy",
    bannerTextSuffix: "for more information. You can change your choice at any time.",
    acceptAll: "Accept all",
    necessaryOnly: "Necessary only",
    customise: "Customise settings",
    saveChoice: "Save choice",
    settingsTitle: "Cookie settings",
    alwaysActive: "Always active",
    close: "Close",
    fabAria: "Adjust cookie settings",
    fabTitle: "Cookie settings",
    dialogBanner: "Cookie notice",
    dialogSettings: "Cookie settings",
    categories: [
      {
        id: "necessary",
        label: "Necessary",
        description:
          "Required for the basic functionality of the website, such as security and session management. Cannot be disabled.",
      },
      {
        id: "functional",
        label: "Functional",
        description:
          "Remember your preferences such as language settings and form data for a better user experience.",
      },
      {
        id: "analytics",
        label: "Analytics",
        description:
          "Anonymously measure how visitors use the website so we can improve content and performance (e.g. Google Analytics).",
      },
      {
        id: "marketing",
        label: "Marketing",
        description:
          "Used for personalised advertising and tracking campaigns on external platforms like Google and Meta.",
      },
    ],
  },
};

export default en;
