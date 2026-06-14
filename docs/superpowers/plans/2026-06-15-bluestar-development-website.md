# BlueStar Development Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bouw een professionele Nederlandse one-page React-website voor BlueStar Development (webdevelopment), met hero, diensten, portfolio, over ons, reviews en een werkend contactformulier.

**Architecture:** Vite + React met losse sectie-componenten in `src/components/`. Content (diensten, projecten, reviews) staat data-gedreven in `src/data/` zodat het zonder code-wijzigingen aanpasbaar is. Styling via Tailwind CSS met de logo-kleuren als thema. Contactformulier verstuurt naar Formspree (geen eigen backend).

**Tech Stack:** Vite, React 18, Tailwind CSS, Formspree, Vitest (voor de form-validatielogica).

---

## File Structure

```
bluestar-development/   (= projectroot, deze map)
├─ index.html                  (meta tags, title, lang="nl", OG-tags, fonts)
├─ vite.config.js
├─ tailwind.config.js          (logo-kleuren + fonts als thema)
├─ postcss.config.js
├─ package.json
├─ public/
│  └─ logo.png                 (BlueStar-logo)
├─ src/
│  ├─ main.jsx                 (React entrypoint)
│  ├─ App.jsx                  (zet alle secties op volgorde)
│  ├─ index.css                (Tailwind directives + base styles)
│  ├─ data/
│  │  ├─ services.js           (5 diensten)
│  │  ├─ projects.js           (portfolio-projecten)
│  │  └─ testimonials.js       (reviews)
│  ├─ lib/
│  │  ├─ validation.js         (contactform-validatie, getest)
│  │  └─ validation.test.js
│  └─ components/
│     ├─ Navbar.jsx
│     ├─ Hero.jsx
│     ├─ Services.jsx
│     ├─ Portfolio.jsx
│     ├─ About.jsx
│     ├─ Testimonials.jsx
│     ├─ Contact.jsx
│     └─ Footer.jsx
```

---

## Task 1: Scaffold Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold project in current directory**

Run (in projectroot, met bestaande `docs/` en `.git`):
```bash
npm create vite@latest . -- --template react
```
Kies bij prompt: huidige map gebruiken / niet overschrijven van bestaande bestanden. Verwijder daarna de demo-inhoud van `src/App.jsx`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Run dev server to verify scaffold works**

Run: `npm run dev`
Expected: Vite draait op `http://localhost:5173` zonder fouten. Stop daarna met Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React project"
```

---

## Task 2: Install & configure Tailwind with brand theme

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Install Tailwind**

```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Configure theme in `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1A2F",
        "accent-light": "#3B9EFF",
        "accent-dark": "#0B5FD8",
        "section-alt": "#F5F8FC",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3B9EFF 0%, #0B5FD8 100%)",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Replace `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
body { @apply font-body text-ink bg-white; }
```

- [ ] **Step 4: Add a temporary Tailwind test to App.jsx and run dev**

Tijdelijk in `src/App.jsx`: `<h1 className="text-accent-dark font-heading text-4xl">Test</h1>`
Run: `npm run dev` → controleer dat de tekst blauw en in Poppins-achtige stijl verschijnt (Poppins laadt pas na Task 3; kleur moet wel kloppen). Stop daarna.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add and configure Tailwind with brand theme"
```

---

## Task 3: HTML head — SEO, fonts, logo

**Files:**
- Modify: `index.html`
- Create: `public/logo.png` (logo door gebruiker aangeleverd / placeholder)

- [ ] **Step 1: Replace `index.html` head**

```html
<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Website laten maken | BlueStar Development</title>
    <meta name="description" content="BlueStar Development bouwt websites op maat, webshops en web-applicaties. Snel, professioneel en geoptimaliseerd. Vraag vrijblijvend een offerte aan." />
    <meta property="og:title" content="Website laten maken | BlueStar Development" />
    <meta property="og:description" content="Websites op maat, webshops en web-applicaties door BlueStar Development." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Add logo to `public/logo.png`**

Plaats het BlueStar-logo als `public/logo.png` (gebruiker levert; anders tijdelijke placeholder).

- [ ] **Step 3: Run dev, verify title + fonts load**

Run: `npm run dev` → tabtitel toont "Website laten maken | BlueStar Development"; geen 404 op fonts/logo. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SEO meta tags, fonts and logo to index.html"
```

---

## Task 4: Content data files

**Files:**
- Create: `src/data/services.js`, `src/data/projects.js`, `src/data/testimonials.js`

- [ ] **Step 1: Create `src/data/services.js`**

```js
export const services = [
  {
    title: "Website op maat",
    keyword: "website laten maken",
    description:
      "Een unieke website die past bij jouw bedrijf — snel, mobielvriendelijk en gebouwd om bezoekers in klanten om te zetten.",
  },
  {
    title: "Webshop",
    keyword: "webshop laten maken",
    description:
      "Een complete webshop waarmee je online verkoopt: gebruiksvriendelijk, veilig en eenvoudig te beheren.",
  },
  {
    title: "Web-applicatie",
    keyword: "maatwerk software",
    description:
      "Maatwerk web-applicaties en software die jouw processen automatiseren en je werk makkelijker maken.",
  },
  {
    title: "Onderhoud & support",
    keyword: "website onderhoud",
    description:
      "We houden je website snel, veilig en up-to-date, zodat jij je geen zorgen hoeft te maken.",
  },
  {
    title: "Hosting",
    keyword: "webhosting",
    description:
      "Betrouwbare, snelle hosting voor je website of webshop — alles in één hand bij BlueStar.",
  },
];
```

- [ ] **Step 2: Create `src/data/projects.js`**

```js
export const projects = [
  {
    title: "Prince Schilder",
    description: "Professionele bedrijfswebsite voor een schildersbedrijf.",
    url: "https://prince-schilder.vercel.app/",
    image: "https://prince-schilder.vercel.app/og.png",
  },
  {
    title: "GSK Portfolio",
    description: "Persoonlijke portfolio-website met modern, strak design.",
    url: "https://gurpreetsingh-gsk.vercel.app/",
    image: "https://gurpreetsingh-gsk.vercel.app/og.png",
  },
];
```

- [ ] **Step 3: Create `src/data/testimonials.js`**

```js
export const testimonials = [
  {
    name: "Tevreden klant",
    role: "Ondernemer",
    quote:
      "BlueStar leverde precies wat we voor ogen hadden. Snelle communicatie en een prachtig resultaat.",
  },
  {
    name: "Tevreden klant",
    role: "Webshop-eigenaar",
    quote:
      "Onze nieuwe webshop draait perfect en ziet er professioneel uit. Echt een aanrader.",
  },
  {
    name: "Tevreden klant",
    role: "ZZP'er",
    quote:
      "Van idee tot live website binnen no-time. Top service en goed meegedacht.",
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add content data for services, projects and testimonials"
```

---

## Task 5: Contact form validation (TDD)

**Files:**
- Create: `src/lib/validation.js`, `src/lib/validation.test.js`
- Modify: `package.json` (test script), install Vitest

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```
Voeg toe aan `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 2: Write failing test `src/lib/validation.test.js`**

```js
import { describe, it, expect } from "vitest";
import { validateContactForm } from "./validation.js";

describe("validateContactForm", () => {
  it("returns no errors for valid input", () => {
    const errors = validateContactForm({ name: "Jan", email: "jan@mail.com", message: "Hallo, ik wil een website." });
    expect(errors).toEqual({});
  });

  it("flags empty name", () => {
    const errors = validateContactForm({ name: "", email: "jan@mail.com", message: "Bericht" });
    expect(errors.name).toBeTruthy();
  });

  it("flags invalid email", () => {
    const errors = validateContactForm({ name: "Jan", email: "geen-email", message: "Bericht" });
    expect(errors.email).toBeTruthy();
  });

  it("flags empty message", () => {
    const errors = validateContactForm({ name: "Jan", email: "jan@mail.com", message: "" });
    expect(errors.message).toBeTruthy();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — "validateContactForm is not a function / cannot find module".

- [ ] **Step 4: Implement `src/lib/validation.js`**

```js
export function validateContactForm({ name, email, message }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Vul je naam in.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  if (!message || !message.trim()) errors.message = "Vul een bericht in.";
  return errors;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS — 4 tests groen.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add tested contact form validation"
```

---

## Task 6: Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Navbar.jsx`**

```jsx
import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#diensten", label: "Diensten" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="BlueStar Development logo" className="h-9 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-ink/80 hover:text-accent-dark transition-colors font-medium">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="bg-brand-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition">Offerte aanvragen</a>
          </li>
        </ul>
        <button className="md:hidden text-ink" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span className="block w-6 h-0.5 bg-ink mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-ink mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-ink"></span>
        </button>
      </nav>
      {open && (
        <ul className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block text-ink/80 hover:text-accent-dark font-medium">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={() => setOpen(false)} className="inline-block bg-brand-gradient text-white px-5 py-2 rounded-full font-semibold">Offerte aanvragen</a>
          </li>
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Render it in `src/App.jsx`**

```jsx
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
    </>
  );
}
```

- [ ] **Step 3: Run dev, verify navbar shows + hamburger works on narrow window**

Run: `npm run dev` → sticky navbar met logo en links; op smal scherm verschijnt hamburger die het menu opent. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add sticky responsive navbar"
```

---

## Task 7: Hero section

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Hero.jsx`**

```jsx
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gradient opacity-10 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight text-ink max-w-3xl">
          Websites laten maken <span className="text-transparent bg-clip-text bg-brand-gradient">op maat</span>
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-xl">
          BlueStar Development bouwt snelle, professionele websites, webshops en web-applicaties die jouw bedrijf laten groeien.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="bg-brand-gradient text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition">Offerte aanvragen</a>
          <a href="#portfolio" className="border border-ink/15 text-ink px-7 py-3 rounded-full font-semibold hover:border-accent-dark hover:text-accent-dark transition">Bekijk ons werk</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Hero />` under `<Navbar />` in `src/App.jsx`**

- [ ] **Step 3: Run dev, verify hero renders met verloop-accent in H1**

Run: `npm run dev`. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero section"
```

---

## Task 8: Services section

**Files:**
- Create: `src/components/Services.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Services.jsx`**

```jsx
import { services } from "../data/services.js";

export default function Services() {
  return (
    <section id="diensten" className="bg-section-alt">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink text-center">Onze diensten</h2>
        <p className="mt-4 text-center text-ink/70 max-w-2xl mx-auto">Alles wat je nodig hebt om online te groeien — van bouw tot onderhoud.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-brand-gradient mb-5" />
              <h3 className="font-heading font-semibold text-xl text-ink">{s.title}</h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Services />` to `src/App.jsx`**

- [ ] **Step 3: Run dev, verify 5 dienst-kaarten in een grid**

Run: `npm run dev`. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add services section"
```

---

## Task 9: Portfolio section

**Files:**
- Create: `src/components/Portfolio.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Portfolio.jsx`**

```jsx
import { projects } from "../data/projects.js";

export default function Portfolio() {
  return (
    <section id="portfolio">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink text-center">Ons werk</h2>
        <p className="mt-4 text-center text-ink/70 max-w-2xl mx-auto">Een greep uit de projecten die we hebben gerealiseerd.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
              <div className="aspect-video bg-section-alt overflow-hidden">
                <img src={p.image} alt={`Screenshot van ${p.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-ink group-hover:text-accent-dark transition">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.description}</p>
                <span className="mt-3 inline-block text-accent-dark font-semibold">Bekijk project →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Portfolio />` to `src/App.jsx`**

- [ ] **Step 3: Run dev, verify projectkaarten + links openen in nieuw tabblad**

Run: `npm run dev`. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add portfolio section"
```

---

## Task 10: About section

**Files:**
- Create: `src/components/About.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/About.jsx`**

```jsx
const points = [
  "Persoonlijke aanpak en korte lijnen",
  "Snelle, mobielvriendelijke websites",
  "Eerlijke prijzen, geen verrassingen",
  "Van eerste idee tot live én onderhoud",
];

export default function About() {
  return (
    <section id="over-ons" className="bg-section-alt">
      <div className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink">Over BlueStar Development</h2>
          <p className="mt-5 text-ink/70 leading-relaxed">
            BlueStar Development is een webdevelopment-bedrijf dat ondernemers helpt online te groeien. We bouwen websites, webshops en web-applicaties die er niet alleen goed uitzien, maar ook resultaat opleveren. Of je nu net begint of je huidige site wilt vernieuwen — wij denken met je mee.
          </p>
        </div>
        <ul className="space-y-4">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-1 w-5 h-5 rounded-full bg-brand-gradient flex-shrink-0" />
              <span className="text-ink/80">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<About />` to `src/App.jsx`**

- [ ] **Step 3: Run dev, verify about-sectie rendert**

Run: `npm run dev`. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add about section"
```

---

## Task 11: Testimonials section

**Files:**
- Create: `src/components/Testimonials.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Testimonials.jsx`**

```jsx
import { testimonials } from "../data/testimonials.js";

export default function Testimonials() {
  return (
    <section id="reviews">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink text-center">Wat klanten zeggen</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <p className="text-ink/80 leading-relaxed">“{t.quote}”</p>
              <div className="mt-5">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Testimonials />` to `src/App.jsx`**

- [ ] **Step 3: Run dev, verify 3 review-kaarten**

Run: `npm run dev`. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add testimonials section"
```

---

## Task 12: Contact section with Formspree

**Files:**
- Create: `src/components/Contact.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Contact.jsx`**

```jsx
import { useState } from "react";
import { validateContactForm } from "../lib/validation.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-section-alt">
      <div className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink">Neem contact op</h2>
          <p className="mt-4 text-ink/70">Vertel ons over je project en ontvang vrijblijvend een offerte.</p>
          <div className="mt-8 space-y-3 text-ink/80">
            <p><span className="font-semibold">E-mail:</span> <a href="mailto:gsinghkaur1012@gmail.com" className="text-accent-dark">gsinghkaur1012@gmail.com</a></p>
            <p><span className="font-semibold">Telefoon:</span> <a href="tel:0686477249" className="text-accent-dark">06 8647 7249</a> / <a href="tel:0653356007" className="text-accent-dark">06 5335 6007</a></p>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Je naam" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent-dark" />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Je e-mailadres" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent-dark" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Vertel over je project..." className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent-dark" />
            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
          </div>
          <button type="submit" disabled={status === "sending"} className="bg-brand-gradient text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-60">
            {status === "sending" ? "Versturen..." : "Verstuur bericht"}
          </button>
          {status === "success" && <p className="text-green-600">Bedankt! We nemen snel contact met je op.</p>}
          {status === "error" && <p className="text-red-600">Er ging iets mis. Probeer het later opnieuw of mail ons direct.</p>}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Contact />` to `src/App.jsx`**

- [ ] **Step 3: Run dev, verify validatie + lege velden tonen foutmeldingen**

Run: `npm run dev` → klik "Verstuur" met lege velden → foutmeldingen verschijnen. (Echte verzending werkt pas met geldige Formspree-ID.) Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add contact section with Formspree integration"
```

---

## Task 13: Footer + final assembly

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <img src="/logo.png" alt="BlueStar Development logo" className="h-10 w-auto bg-white rounded-lg p-1" />
          <p className="mt-4 text-white/70 text-sm">Websites, webshops en web-applicaties op maat.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Navigatie</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#diensten" className="hover:text-accent-light">Diensten</a></li>
            <li><a href="#portfolio" className="hover:text-accent-light">Portfolio</a></li>
            <li><a href="#over-ons" className="hover:text-accent-light">Over ons</a></li>
            <li><a href="#contact" className="hover:text-accent-light">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="mailto:gsinghkaur1012@gmail.com" className="hover:text-accent-light">gsinghkaur1012@gmail.com</a></li>
            <li><a href="tel:0686477249" className="hover:text-accent-light">06 8647 7249</a></li>
            <li><a href="tel:0653356007" className="hover:text-accent-light">06 5335 6007</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} BlueStar Development. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Finalize `src/App.jsx`**

```jsx
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Portfolio from "./components/Portfolio.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Run full page, scroll through, check responsive**

Run: `npm run dev` → scroll door alle secties; menu-links springen naar de juiste sectie; check op mobiele breedte. Stop daarna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add footer and assemble full page"
```

---

## Task 14: Final verification — build, tests, push

**Files:** geen

- [ ] **Step 1: Run tests**

Run: `npm test`
Expected: alle validatietests PASS.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build slaagt zonder fouten; output in `dist/`.

- [ ] **Step 3: Preview production build**

Run: `npm run preview` → controleer dat de site correct laadt. Stop daarna.

- [ ] **Step 4: Push to GitHub**

```bash
git push
```

---

## Open punten voor de eigenaar (na bouw)

- **Formspree-ID:** maak gratis account op formspree.nl/io, vervang `REPLACE_WITH_YOUR_ID` in `Contact.jsx`. Tot dan tonen we validatie maar verstuurt het formulier niet echt.
- **Logo:** plaats het definitieve logo als `public/logo.png`.
- **Portfolio-afbeeldingen:** als de `og.png`-previews niet laden, vervang `image`-URLs in `src/data/projects.js` door eigen screenshots.
- **Reviews:** vervang placeholder-testimonials door echte quotes.
- **Deploy:** koppel de repo aan Vercel voor automatische deploys.
