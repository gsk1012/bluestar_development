# BlueStar Development — Website Design Spec

**Datum:** 2026-06-15
**Status:** Goedgekeurd (ontwerp), klaar voor implementatieplan

## Doel

Een professionele **one-page React-website** voor BlueStar Development, een
webdevelopment-/softwarebedrijf. De site is in het **Nederlands** en dient drie
doelen tegelijk:

1. **Leads binnenhalen** — bezoekers laten contact opnemen / offerte aanvragen
2. **Portfolio tonen** — vertrouwen wekken met gemaakt werk
3. **Professioneel visitekaartje** — strakke, zakelijke online aanwezigheid

## Technische aanpak

- **Build:** Vite + React (JSX)
- **Styling:** Tailwind CSS, met de logo-kleuren als thema in `tailwind.config.js`
- **Contactformulier:** Formspree (geen eigen backend nodig) → e-mails naar
  `gsinghkaur1012@gmail.com`. Placeholder form-ID die de eigenaar later invult.
- **Hosting-doel:** statische build, geschikt voor Vercel/Netlify.

Reden: lichte, snelle build → goede Core Web Vitals, wat de SEO-doelen onder­steunt.
Next.js is overkill voor één pagina.

## Design system

Afgeleid van het BlueStar-logo (wit, blauw, zwart/donkerblauw).

| Token | Waarde | Gebruik |
|-------|--------|---------|
| Achtergrond | `#FFFFFF` | Hoofdachtergrond |
| Sectie-alt | `#F5F8FC` | Afwisselende secties |
| Tekst donker | `#0A1A2F` | Koppen en bodytekst |
| Accent licht | `#3B9EFF` | Verloop-start, hover |
| Accent donker | `#0B5FD8` | Verloop-eind, knoppen, links |

- **Fonts:** Poppins (koppen), Inter (bodytekst).
- **Stijl:** veel witruimte, ronde hoeken, subtiele schaduwen, blauwe verloop-accenten,
  soepele scroll en hover-animaties. Volledig responsive (mobile-first).

## Pagina-opbouw (één pagina, scroll-navigatie)

1. **Navbar (sticky):** logo links; menu rechts (Home · Diensten · Portfolio ·
   Over ons · Contact) + blauwe "Offerte aanvragen"-knop. Soepele scroll naar
   secties. Hamburgermenu op mobiel.
2. **Hero:** H1 *"Websites laten maken op maat"*, pakkende subtekst, 2 knoppen
   (Offerte aanvragen / Bekijk werk), blauw verloop-accent op de achtergrond.
3. **Diensten:** 5 kaarten (icoon + titel + korte tekst), zie diensten hieronder.
4. **Portfolio:** projectkaarten met preview-afbeelding + link. Start met twee
   echte projecten; data-gedreven zodat projecten makkelijk toe te voegen zijn.
5. **Over ons:** korte tekst over BlueStar + "waarom wij"-punten.
6. **Reviews:** 2-3 testimonial-kaarten (placeholder, later te vervangen).
7. **Contact:** Formspree-formulier (naam, e-mail, bericht) + zichtbare gegevens.
8. **Footer:** logo, snelle links, contactgegevens, © BlueStar Development.

## Diensten (op SEO-prioriteit)

Bepaald via keyword-/zoekintentie-onderzoek voor de Nederlandse markt.

| # | Dienst | Doelzoekwoord | Reden |
|---|--------|---------------|-------|
| 1 | Website laten maken | `website laten maken`, `website op maat` | Hoogste volume + koopintentie → hoofd-H1 |
| 2 | Webshop / e-commerce | `webshop laten maken` | Hoog volume, hoge projectwaarde |
| 3 | Web-applicatie / maatwerk software | `webapplicatie laten maken`, `maatwerk software` | Weinig concurrentie, hoge waarde, onderscheidend |
| 4 | Onderhoud & support | `website onderhoud` | Terugkerende inkomsten |
| 5 | Hosting | `webhosting`, `website hosting` | Cross-sell naast bouw + onderhoud |

## SEO-eisen

- `lang="nl"` op `<html>`.
- Eén `<h1>` per pagina (Hero), logische `h2`/`h3` per sectie/dienst.
- Title tag: `Website laten maken | BlueStar Development` (~55 tekens).
- Meta description met kernwoord + CTA.
- Open Graph-tags voor delen op social.
- Alt-teksten op logo en portfolio-afbeeldingen.
- Snelle, mobielvriendelijke build (Core Web Vitals).
- Contactgegevens (NAP) duidelijk zichtbaar voor lokale vindbaarheid.

## Contactgegevens

- **E-mail:** gsinghkaur1012@gmail.com
- **Telefoon:** 0686477249 / 0653356007

## Portfolio-projecten (start)

- https://prince-schilder.vercel.app/
- https://gurpreetsingh-gsk.vercel.app/

## Bestandsstructuur

```
bluestar-development/
├─ index.html            (meta tags, title, lang="nl", SEO)
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx            (zet alle secties op volgorde)
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Services.jsx
│  │  ├─ Portfolio.jsx
│  │  ├─ About.jsx
│  │  ├─ Testimonials.jsx
│  │  ├─ Contact.jsx
│  │  └─ Footer.jsx
│  ├─ data/              (diensten, projecten, reviews — los van code)
│  └─ index.css          (Tailwind + thema)
├─ tailwind.config.js    (logo-kleuren als thema)
└─ package.json
```

Elke sectie is een eigen component; teksten/data staan in losse data-bestanden
zodat content aanpasbaar is zonder de code in te duiken.

## Foutafhandeling

- Contactformulier: client-side validatie op lege/ongeldige velden, duidelijke
  foutmelding, en een bevestigingsmelding na succesvol verzenden.
- Portfolio-afbeeldingen: fallback wanneer een preview niet laadt.

## Buiten scope (YAGNI)

- Geen meertaligheid (alleen Nederlands).
- Geen CMS/blog.
- Geen eigen backend (Formspree volstaat).
- Geen prijzenpagina.
