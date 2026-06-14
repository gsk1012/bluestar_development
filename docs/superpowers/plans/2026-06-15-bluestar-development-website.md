# BlueStar Development Website Implementation Plan (taste-driven)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Every section MUST respect the LOCKED DESIGN SYSTEM below and the ANTI-SLOP RULES. Synthesised from taste-skill + impeccable + emil-design-eng + ui-ux-pro-max.

**Goal:** Een opvallende, professionele Nederlandse one-page React-website voor BlueStar Development (webdevelopment-bureau), waarbij elke sectie een eigen layout-familie heeft, met verzorgde micro-animaties en echte beelden.

**Architecture:** Vite + React. Losse sectie-componenten in `src/components/`. Content data-gedreven in `src/data/`. Eén vergrendeld designsysteem (tokens) in `tailwind.config.js` + `src/index.css`. Animaties via Motion (`motion/react`), grafiek via Recharts, iconen via Phosphor, fonts self-hosted via @fontsource.

**Tech Stack:** Vite, React 18, Tailwind CSS v3, motion (Framer Motion), recharts, @phosphor-icons/react, @fontsource/space-grotesk, @fontsource/inter, Vitest.

---

## LOCKED DESIGN SYSTEM (single source of truth — every section uses these, no deviation)

**Theme:** Light mode only (whole page). Never invert a section.

**Color (one accent, locked across the entire page):**
| Token | Hex | OKLCH | Gebruik |
|-------|-----|-------|---------|
| `bg` (wit) | `#FFFFFF` | oklch(1 0 0) | Hoofdachtergrond |
| `surface` | `#F4F8FD` | oklch(0.975 0.008 245) | Afwisselende secties / panelen |
| `ink` | `#0B1B30` | oklch(0.23 0.05 250) | Koppen + bodytekst (contrast ≥ 4.5:1 op wit) |
| `ink-soft` | `#3A4A60` | oklch(0.42 0.04 250) | Secundaire tekst (≥ 4.5:1 op wit) |
| `accent` | `#0B5FD8` | oklch(0.53 0.19 255) | DE merkkleur. Knoppen, links, highlights |
| `accent-bright` | `#3B9EFF` | oklch(0.70 0.16 250) | Alleen voor grote vlakken/illustratie-accenten, NIET voor tekst op wit |
| `line` | `#E2E9F2` | oklch(0.93 0.01 250) | Randen/dividers |

- **Eén accent** (`accent`) over de hele pagina. Geen tweede accentkleur introduceren.
- Geen pure zwart, geen AI-paars. Brand-blauw is bewust gekozen (logo).

**Radius (één schaal):** `--r-sm: 8px`, `--r-md: 14px`, `--r-lg: 22px`, knoppen = pill (`9999px`). Gebruik consistent.

**Typography (max 3 families):**
- Display/koppen: **Space Grotesk** (600/700). `tracking-tight`, `text-balance`, letter-spacing floor -0.03em.
- Body: **Inter** (400/500). `leading-relaxed`, body-kleur = `ink`/`ink-soft`, max 65-75ch.
- Display ceiling: `clamp()` max ~`text-6xl` (≈ 60-72px). Niet groter (geen geschreeuw).
- Hiërarchie via grootte + gewicht (ratio ≥ 1.25), niet via kleur.

**Spacing rhythm:** 4/8px schaal. Sectie-padding desktop `py-24`–`py-28`, mobiel `py-16`. Container `max-w-6xl mx-auto px-6`.

**Z-index scale:** nav `z-40`, dropdown/mobile-menu `z-50`, (geen willekeurige 9999).

**Motion tokens (emil-design-eng):**
- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (entering). Vermijd `ease-in`.
- Duur: button press 120ms, hover 160ms, dropdown 200ms, scroll-reveal 500-600ms.
- Alleen `transform` + `opacity` animeren. Nooit scale-from-0 (start 0.95).
- Stagger lijsten 40-70ms per item.
- Button `:active` → `scale(0.97)`.
- **Reduced motion verplicht:** alles via Motion `useReducedMotion()` of `@media (prefers-reduced-motion: reduce)` → val terug op statisch/crossfade. Content nooit verbergen achter een animatie die niet afspeelt.

---

## ANTI-SLOP RULES (hard, gelden voor elke sectie)

1. **ZERO em-dashes (`—`) of en-dash-separators (`–`)** waar dan ook (koppen, body, knoppen, alt). Gebruik gewone punt/komma/`-`.
2. **Geen gradient-text** (`background-clip:text`). Nadruk via gewicht/grootte, één effen kleur.
3. **Geen eyebrow boven elke sectie.** Max 1 kleine uppercase-label per 3 secties. Liever helemaal weglaten.
4. **Geen genummerde sectiemarkers** (01/02/03) tenzij het écht een geordende reeks is (stappen).
5. **Geen 3 identieke feature-kaarten op een rij.** Elke sectie een andere layout-familie; minstens 4 verschillende families over de pagina.
6. **Geen nep-screenshots uit divs.** Gebruik echte screenshots van de portfolio-sites.
7. **Geen verzonnen, nep-precieze cijfers.** Cijfers in de grafiek zijn illustratief en worden als zodanig gelabeld.
8. **Kaarten spaarzaam** (impeccable: "cards are the lazy answer"). Groepeer waar kan met witruimte/dividers. Geen geneste kaarten.
9. **Geen scroll-cues** ("scroll", pijltjes), geen locatie/tijd/weer-strips, geen versielabels.
10. **Contrast ≥ 4.5:1** voor alle tekst; knop-tekst leesbaar op knop-achtergrond; geen placeholder-as-label.
11. Iconen alleen uit **@phosphor-icons/react** (één set, consistente `weight`). Geen handgetekende SVG-iconen, geen emoji.

---

## File Structure

```
(projectroot = deze map)
├─ index.html               (SEO meta, OG, lang="nl")
├─ tailwind.config.js       (LOCKED tokens)
├─ postcss.config.js
├─ vite.config.js
├─ package.json
├─ public/
│  ├─ logo.png
│  └─ work/
│     ├─ prince-schilder.png   (echte screenshot)
│     └─ gsk-portfolio.png     (echte screenshot)
├─ src/
│  ├─ main.jsx              (font imports + render)
│  ├─ App.jsx               (sectievolgorde)
│  ├─ index.css             (Tailwind + tokens + base + reduced-motion)
│  ├─ lib/
│  │  ├─ motion.js          (gedeelde Motion variants: fadeUp, stagger)
│  │  ├─ validation.js
│  │  └─ validation.test.js
│  ├─ data/
│  │  ├─ services.js
│  │  ├─ projects.js
│  │  ├─ stats.js
│  │  └─ testimonials.js
│  └─ components/
│     ├─ Navbar.jsx
│     ├─ Hero.jsx
│     ├─ Services.jsx
│     ├─ Stats.jsx
│     ├─ Portfolio.jsx
│     ├─ Process.jsx
│     ├─ Testimonials.jsx
│     ├─ Contact.jsx
│     └─ Footer.jsx
```

---

## SECTION DESIGN BRIEFS (elk een andere layout-familie)

1. **Navbar** — sticky, glas-licht (subtiele `backdrop-blur` op wit/90), 1 regel desktop, ≤ 72px hoog. Logo links, links midden/rechts, één primaire CTA "Plan een gesprek" (pill, `accent`). Mobiel: hamburger → `motion` dropdown (scale 0.97→1 + fade, transform-origin top-right). Active-link onderlijn-indicator die meebeweegt op hover.
2. **Hero** — **asymmetrische split** (links tekst 55%, rechts visueel 45%). Links: H1 (≤ 2 regels, geen gradient-text), subtekst (≤ 20 woorden), 1 primaire + 1 secundaire CTA. Rechts: **echte screenshot** van de beste portfolio-site in een strak, minimalistisch browser-frame (echte afbeelding, geen nep-div), met zachte schaduw + subtiele float-animatie (≤ 6px, reduced-motion uit). Achtergrond: heel subtiel blauw radiaal licht (geen mesh-blob-cliché). `min-h-[100dvh]` niet verplicht; hero past in viewport, `pt` ≤ `pt-24`.
3. **Services** — **bento-grid** (asymmetrisch, 5 items → 5 cellen, bijv. 1 grote + 4 kleinere). Minstens 2-3 cellen met visuele variatie (getinte achtergrond/illustratief icoon-vlak in `accent`), niet 5× wit-op-wit. Phosphor-iconen. Scroll-reveal stagger.
4. **Stats — "BlueStar in cijfers"** — **split met grafiek** (Recharts). Links korte claim, rechts een geanimeerde grafiek (bv. een bar/area-chart die laadtijd of prestatie illustreert; cijfers expliciet illustratief). Grafiek heeft toegankelijke kleuren, tooltip, en `aria-label`/tekstsamenvatting; respecteert reduced-motion (data direct leesbaar). Plus 2-3 grote kerncijfers in platte layout (geen kaart-cliché), `tabular-nums`.
5. **Portfolio** — **alternerende showcase** (geen kaart-grid): per project een brede rij met echte screenshot + korte tekst + link, links/rechts afgewisseld (max 2 op rij van dezelfde split). Hover: zachte zoom op beeld (`scale 1.03`, transform). Opent in nieuw tabblad.
6. **Process — "Zo werken we"** — **genummerde stappen** (hier zijn nummers wél legitiem: echte volgorde). Horizontale tijdlijn op desktop (3-4 stappen), verticaal op mobiel. Subtiele lijn die "getekend" wordt op scroll (clip-path/scaleX, reduced-motion → direct zichtbaar).
7. **Testimonials** — **carousel/marquee** óf 2-koloms editorial quotes (≤ 3 regels per quote, echte typografische aanhalingstekens, attributie naam + rol). Max 1 marquee op de hele pagina. Andere layout-familie dan Services.
8. **Contact** — **split**: links waardepropositie + contactgegevens (mailto/tel links), rechts formulier-UI (label boven input, helper/error onder input, focus-ring `accent`). **Form hoeft niet te versturen** (UI only): knop toont een nette "binnenkort"-status of is puur visueel; client-side validatie mag, maar geen Formspree-call. Geen placeholder-as-label.
9. **Footer** — donker paneel (`ink`) als enige donkere blok, met logo (op licht vlakje), navigatie, contact, ©jaar. Tekstcontrast op donker ≥ 4.5:1.

---

## Tasks

### Task 1: Scaffold + LOCKED design system foundation

**Files:** `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/lib/motion.js`

- [ ] **Step 1:** Scaffold in huidige map (behoud `docs/`, `.git`, `.gitignore`): `npm create vite@latest . -- --template react`, demo-content uit `App.jsx` halen.
- [ ] **Step 2:** Installeer deps:
```bash
npm install
npm install motion recharts @phosphor-icons/react @fontsource/space-grotesk @fontsource/inter
npm install -D tailwindcss@^3 postcss autoprefixer vitest
npx tailwindcss init -p
```
- [ ] **Step 3:** `tailwind.config.js` met de LOCKED tokens (kleuren, radius, fontFamily heading/body). `content: ["./index.html","./src/**/*.{js,jsx}"]`.
- [ ] **Step 4:** `src/index.css`: Tailwind directives + CSS-vars voor radius + motion easing + base (`html{scroll-behavior:smooth}`, body font/inkt) + globale `@media (prefers-reduced-motion: reduce)` reset (animaties/transities uit). `text-wrap: balance` op h1-h3.
- [ ] **Step 5:** `src/main.jsx`: importeer `@fontsource/space-grotesk/600.css`,`/700.css` en `@fontsource/inter/400.css`,`/500.css` + `index.css`, render `<App/>`.
- [ ] **Step 6:** `src/lib/motion.js`: exporteer gedeelde variants `fadeUp` (`{opacity:0,y:24}`→`{opacity:1,y:0}`, ease-out, 0.5s) en `staggerContainer` (staggerChildren 0.06). Gebruik overal voor consistentie.
- [ ] **Step 7:** `App.jsx`: lege shell met `<main>` placeholder. `npm run dev` draait foutloos.
- [ ] **Step 8:** Commit: `chore: scaffold Vite + locked design system foundation`.

### Task 2: SEO head + content data

**Files:** `index.html`, `src/data/*.js`

- [ ] **Step 1:** `index.html`: `lang="nl"`, `<title>Website laten maken | BlueStar Development</title>`, meta description (kernwoord + CTA), OG-tags (title/description/type/image=`/logo.png`), favicon `/logo.png`, viewport. GEEN Google-Fonts `<link>` (fonts komen via @fontsource).
- [ ] **Step 2:** `src/data/services.js`: 5 diensten (Website op maat, Webshop, Web-applicatie, Onderhoud & support, Hosting) elk `{ title, description, icon }` waar `icon` een Phosphor-icoonnaam is.
- [ ] **Step 3:** `src/data/projects.js`: 2 projecten met `{ title, description, url, image }` → `/work/prince-schilder.png` en `/work/gsk-portfolio.png`.
- [ ] **Step 4:** `src/data/stats.js`: illustratieve, als-zodanig-gelabelde cijfers voor de grafiek (bv. laadtijd typische site vs BlueStar) + 2-3 kerncijfers.
- [ ] **Step 5:** `src/data/testimonials.js`: 2-3 quotes (≤ 3 regels), naam + rol (realistische NL namen, geen "Jan Doe").
- [ ] **Step 6:** Commit: `feat: SEO head and content data`.

> **Asset-stap (controller doet dit, geen subagent):** echte screenshots van de twee portfolio-sites opslaan in `public/work/`.

### Task 3: Navbar  — zie brief #1.
- [ ] Bouw `src/components/Navbar.jsx` volgens brief + design system + anti-slop. Mobiel hamburger met Motion-dropdown. Render in `App.jsx`. Verifieer in dev (sticky, 1 regel desktop, hamburger werkt, contrast). Commit.

### Task 4: Hero — zie brief #2.
- [ ] Bouw `src/components/Hero.jsx`: asymmetrische split, H1 zonder gradient-text, echte screenshot in browser-frame met subtiele float (reduced-motion safe). Entry-animatie via `fadeUp`. Render. Verifieer hero past in viewport + CTA zichtbaar. Commit.

### Task 5: Services — zie brief #3.
- [ ] Bouw `src/components/Services.jsx`: bento-grid (5 cellen, exact), visuele variatie in 2-3 cellen, Phosphor-iconen, scroll-reveal stagger. Render. Verifieer geen 3-gelijke-kaarten-cliché, mobiel 1-koloms. Commit.

### Task 6: Stats + grafiek — zie brief #4.
- [ ] Bouw `src/components/Stats.jsx` met Recharts (responsive container, toegankelijke kleuren uit tokens, tooltip, `aria-label`/tekstsamenvatting, reduced-motion). Kerncijfers `tabular-nums`, platte layout. Render. Verifieer grafiek rendert + responsive. Commit.

### Task 7: Portfolio — zie brief #5.
- [ ] Bouw `src/components/Portfolio.jsx`: alternerende brede rijen met echte screenshots, hover-zoom (transform), externe links `rel="noopener noreferrer"`, `onError` image-fallback. Render. Verifieer afwisseling + mobiel stack. Commit.

### Task 8: Process — zie brief #6.
- [ ] Bouw `src/components/Process.jsx`: genummerde stappen (echte reeks), horizontale tijdlijn desktop / verticaal mobiel, lijn-teken-animatie (reduced-motion safe). Render. Commit.

### Task 9: Testimonials — zie brief #7.
- [ ] Bouw `src/components/Testimonials.jsx`: editorial quotes of carousel (max 1 marquee op pagina), ≤ 3 regels, echte quotes, attributie. Render. Commit.

### Task 10: Contact (UI only) — zie brief #8.
**Files:** `src/components/Contact.jsx`, `src/lib/validation.js`, `src/lib/validation.test.js`
- [ ] **Step 1:** Schrijf falende test `validation.test.js` voor `validateContactForm` (geldig → `{}`; lege naam/ongeldige email/leeg bericht → fout). Run `npm test` → faalt.
- [ ] **Step 2:** Implementeer `validation.js` (regex email, trim checks, NL foutteksten). Run `npm test` → slaagt.
- [ ] **Step 3:** Bouw `Contact.jsx`: split-layout, label-boven-input, error-onder-input, focus-ring `accent`, contactgegevens (mailto `gsinghkaur1012@gmail.com`, tel `0686477249`/`0653356007`). Knop valideert client-side maar **verstuurt niet** (toon nette status "We nemen telefonisch of per mail contact op" / of disabled met uitleg). Render. Commit.

### Task 11: Footer + assembly — zie brief #9.
- [ ] Bouw `src/components/Footer.jsx` (donker `ink`-paneel, logo, nav, contact, ©jaar, contrast ok). Finaliseer `App.jsx` volgorde: Navbar → Hero → Services → Stats → Portfolio → Process → Testimonials → Contact → Footer. Verifieer hele pagina scrollt, ankerlinks springen goed, mobiel ok. Commit.

### Task 12: Polish + verify (impeccable polish pass)
- [ ] **Step 1:** Loop de hele pagina na op: uitlijning/spacing-ritme, consistente radius, één accent, geen em-dashes, geen dubbele CTA-intentie, eyebrow-telling ≤ ceil(secties/3), reduced-motion, mobiel 375px, contrast. Fix inline.
- [ ] **Step 2:** `npm test` (validatietests groen), `npm run build` (geen fouten), `npm run preview` check.
- [ ] **Step 3:** Commit + `git push`.

---

## Open punten voor de eigenaar (na bouw)
- **Logo met transparante achtergrond** aanleveren voor scherpste weergave (huidige heeft achtergrond).
- **Contactformulier laten versturen:** later Formspree of mailto koppelen.
- **Reviews:** placeholder-quotes vervangen door echte.
- **Cijfers in grafiek:** vervangen door echte data wanneer beschikbaar (nu illustratief gelabeld).
- **Deploy:** repo aan Vercel koppelen.
