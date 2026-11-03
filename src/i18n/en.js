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
    ctaPrefix: "Discuss your",
    intentMessage: "I'd like to know more about",
    // Text inside the small illustrations: sample UI, not real data.
    demo: {
      url: "yourbusiness.com",
      cta: "Quote",
      appTitle: "Planning this week",
      log: ["Updates installed", "Backup checked", "Security patch"],
      logMeta: "just now",
      status: "Online",
      ssl: "SSL active",
      backup: "Last night's backup",
    },
    items: {
      website: {
        title: "Custom website",
        desc: "Fast, findable and built around your brand.",
        term: "2 to 4 weeks",
        ctaNoun: "website",
      },
      webapp: {
        title: "Web application",
        desc: "Custom browser software, built around your workflow.",
        term: "Depends on scope",
        ctaNoun: "web application",
      },
      maintenance: {
        title: "Maintenance & support",
        desc: "Updates, backups and help, so your site stays safe.",
        term: "Ongoing, monthly",
        ctaNoun: "maintenance",
      },
      hosting: {
        title: "Hosting",
        desc: "Fast and secure online, included as standard.",
        term: "From launch day",
        ctaNoun: "hosting",
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
      { value: "2–4 weeks", label: "until your site is live" },
      { value: "30 days", label: "free support after launch" },
      { value: "100/100", label: "Lighthouse score, as standard" },
      { value: "1", label: "dedicated point of contact" },
    ],
  },
  pricing: {
    heading: ["What does a ", "website", " cost?"],
    subheading:
      "The cost depends on what you need. A custom business website starts at €495; custom software is priced after a short conversation about your needs, so you never pay for something you won't use. Every price includes a unique design, a Lighthouse score of 100/100, accessibility to WCAG AA, SSL and 30 days of support after launch. No hidden costs: you know exactly where you stand up front.",
    from: "from",
    termLabel: "Turnaround",
    intentMessage: "I'd like a quote for",
    plans: [
      {
        key: "maintenance",
        title: "Maintenance & support",
        suits: "For business owners who want to keep their site safe and current.",
        from: true,
        price: "€49",
        unit: "per month",
        term: "Ongoing, monthly",
        features: [
          "Software updates",
          "Security patches",
          "Backup checks",
          "Technical help with questions",
        ],
        cta: "Request maintenance",
      },
      {
        key: "website",
        featured: true,
        title: "Custom website",
        suits: "For freelancers, small businesses and SMEs that want a professional presence.",
        from: true,
        price: "€495",
        unit: "one-off",
        term: "2 to 4 weeks",
        features: [
          "Unique design, no templates",
          "Responsive on every screen",
          "Lighthouse score 100/100",
          "Optimised for search engines",
          "Accessible to WCAG AA",
          "SSL certificate and daily backups",
          "30 days support after launch",
          "Full handover of files",
        ],
        cta: "Request a quote",
      },
      {
        key: "webapp",
        title: "Web application",
        suits: "For businesses that need custom software.",
        from: false,
        price: "On request",
        unit: "tailored quote",
        term: "After a scoping call",
        features: [
          "Customer portals",
          "Planning tools",
          "Internal dashboards",
          "Built around your workflow",
        ],
        cta: "Book a scoping call",
      },
    ],
    hostingTitle: "Hosting is always included",
    hostingBody: "Every site runs on a fast CDN with SSL and daily backups. Hosting on its own is also possible, on request.",
    extrasTitle: "Optional extras",
    extras: ["Multilingual (NL + EN)", "Blog or knowledge base", "Custom animations"],
    vatNote: "All prices exclude VAT.",
  },
  portfolio: {
    heading: ["Work we're ", "proud", " of"],
    subheading:
      "Every project starts with the business behind it: who are the customers, what are they looking for and what should they be able to do? We design the site around that, always with its own design instead of a template. Hover over a screenshot to scroll through the whole page.",
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
          "The price depends on the scope and complexity of the project. A custom business website starts at €495 (excl. VAT); a web application is priced on request. Contact us for a no-obligation custom quote.",
      },
      {
        question: "How quickly can BlueStar Development build a website?",
        answer:
          "The turnaround time depends on the scope. A simple business website is often live within two to four weeks. Schedule a call for a concrete timeline.",
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
    viewAll: "View all posts",
    back: "Back to blog",
    more: "More articles",
    ctaHeading: ["Ready for a ", "fast website", "?"],
    ctaBody:
      "We build sites that score on speed, accessibility and findability. Schedule a no-obligation call.",
    ctaButton: "Schedule a call",
  },
  footer: {
    tagline: "Fast, findable websites and web applications built to order for entrepreneurs.",
    navigation: "Navigation",
    contact: "Contact",
    copyright: "All rights reserved.",
    terms: "Terms and conditions",
    privacy: "Privacy policy",
    disclaimer: "Disclaimer",
    navLinks: [
      { label: "Services", href: "#diensten" },
      { label: "Work", href: "#portfolio" },
      { label: "Approach", href: "#aanpak" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "/blog", external: true },
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
