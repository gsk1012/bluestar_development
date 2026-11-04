import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./components/Hero";
import Services from "./components/Services";

const Portfolio    = lazy(() => import("./components/Portfolio"));
const Why          = lazy(() => import("./components/Why"));
const Pricing      = lazy(() => import("./components/Pricing"));
const Process      = lazy(() => import("./components/Process"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ          = lazy(() => import("./components/FAQ"));
const BlogPreview  = lazy(() => import("./components/BlogPreview"));
const Contact      = lazy(() => import("./components/Contact"));
const Footer       = lazy(() => import("./components/Footer"));
const Blog         = lazy(() => import("./pages/Blog"));
const BlogPost     = lazy(() => import("./pages/BlogPost"));
const ServicePage  = lazy(() => import("./pages/ServicePage"));
const ContactPage  = lazy(() => import("./pages/ContactPage"));
const AboutPage    = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const CasePage     = lazy(() => import("./pages/CasePage"));
const LegalPage    = lazy(() => import("./pages/LegalPage"));

// ── Scrollgedrag ───────────────────────────────────────────────────────────
// Een nieuwe pagina opent bovenaan, een anker scrolt naar zijn sectie, en met
// terug/vooruit kom je terug waar je was. Posities worden per
// geschiedenisitem bewaard in sessionStorage, zodat dat ook werkt als de vorige
// pagina een volledige paginalading was (bv. /#contact vanaf de blog).

const POSITIONS_KEY = "scroll-positions";
const positions = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(POSITIONS_KEY)) || {};
  } catch {
    return {};
  }
})();
const persistPositions = () => {
  try {
    sessionStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // sessionStorage niet beschikbaar: alleen binnen deze sessie onthouden
  }
};

// Kwam de bezoeker via terug/vooruit binnen? Bij de eerste lading zegt de
// navigatie-API dat (een refresh begint bewust bovenaan, zie main.jsx); daarna
// zet elke popstate het, behalve als die van een klik op een #anker komt.
let viaHistory = performance.getEntriesByType?.("navigation")[0]?.type === "back_forward";
let anchorClicked = false;
document.addEventListener(
  "click",
  (e) => {
    anchorClicked = !!e.target.closest?.('a[href^="#"]');
  },
  true
);
window.addEventListener("popstate", () => {
  viaHistory = !anchorClicked;
  anchorClicked = false;
});

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const entry = `${key}:${pathname}${hash}`;

  // Eén scroll-luisteraar schrijft naar het item dat nu in beeld is. De ref
  // wisselt in een layout-effect, vóór de browser het scroll-event van de
  // nieuwe pagina afvuurt, zodat de vorige positie niet wordt overschreven.
  const entryRef = useRef(entry);
  useLayoutEffect(() => {
    entryRef.current = entry;
  }, [entry]);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        positions[entryRef.current] = Math.round(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", persistPositions);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", persistPositions);
    };
  }, []);

  // De pagina waarop de bezoeker al staat. Pas bijgewerkt als het springen
  // klaar is (niet bij de opruimstap), zodat StrictMode's dubbele effect in
  // dev een binnenkomst niet voor een ankerklik op dezelfde pagina aanziet.
  const settledPath = useRef(null);
  useEffect(() => {
    if (navType !== "POP") viaHistory = false;
    persistPositions();
    const saved = viaHistory ? positions[entry] : undefined;

    if (saved === undefined && !hash) {
      settledPath.current = pathname;
      // Direct, niet soepel: html heeft scroll-behavior: smooth voor ankerlinks,
      // maar een nieuwe pagina hoort gewoon bovenaan te openen.
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Een ankerklik op dezelfde pagina laat de browser zelf soepel scrollen.
    if (saved === undefined && settledPath.current === pathname) return;

    // De secties onder de hero laden lazy, dus de pagina groeit nog even.
    // Terug/vooruit: wacht tot de pagina lang genoeg is en zet de oude positie
    // terug. Anker: wacht tot de doelpositie even stilstaat, scrol er dan
    // soepel heen en stuur bij als er onderweg nog iets verschuift. Beide
    // stoppen zodra de bezoeker zelf scrolt.
    const id = decodeURIComponent(hash.slice(1));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    const started = performance.now();
    let frame;
    let dest = null;
    let stableSince = 0;
    let aimedAt = null;
    let reachedAt = 0;
    let stopped = false;
    const cancel = () => {
      stopped = true;
      cancelAnimationFrame(frame);
    };
    const finish = () => {
      cancel();
      settledPath.current = pathname;
    };
    const opts = { passive: true, once: true };
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach((e) => window.addEventListener(e, finish, opts));

    const restore = (now) => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      if (maxY < saved && now - started < 4000) return false;
      if (Math.abs(window.scrollY - saved) > 1) window.scrollTo({ top: saved, behavior: "instant" });
      reachedAt ||= now;
      return now - reachedAt > 400;
    };
    const toAnchor = (now) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const root = document.documentElement;
      const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const maxY = root.scrollHeight - window.innerHeight;
      const next = Math.round(Math.min(el.getBoundingClientRect().top + window.scrollY - pad, maxY));
      if (next !== dest) {
        dest = next;
        stableSince = now;
      }
      if (aimedAt === null ? now - stableSince > 250 : Math.abs(dest - aimedAt) > 1) {
        window.scrollTo({ top: dest, behavior });
        aimedAt = dest;
      }
      return aimedAt !== null && Math.abs(window.scrollY - dest) <= 1;
    };
    const tick = (now) => {
      if (stopped) return;
      if ((saved !== undefined ? restore : toAnchor)(now)) return finish();
      if (now - started < 8000) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancel();
      ["wheel", "touchstart", "keydown", "pointerdown"].forEach((e) => window.removeEventListener(e, finish));
    };
  }, [pathname, hash, entry, navType]);
  return null;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Suspense>
          <Why />
          <Pricing moreLink />
          <Portfolio />
          <Process />
          <Testimonials />
          <FAQ />
          <BlogPreview />
          <Contact above="bone" />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/over-ons" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<CasePage />} />
          {/* Juridisch (data/legalPages.js). Vaste paden, zodat die tekst niet in de hoofdbundel belandt. */}
          {["privacybeleid", "algemene-voorwaarden", "disclaimer"].map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<LegalPage slug={slug} />} />
          ))}
          {/* Dienstpagina's (data/servicePages.js); onbekende slugs gaan terug naar home. */}
          <Route path="/:slug" element={<ServicePage />} />
        </Routes>
      </Suspense>
      {/* Op elke pagina, zodat het cookie-icoon en de voorkeuren overal bereikbaar zijn. */}
      <CookieBanner />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
