import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";

// Below-fold sections: split into separate chunks so the initial JS bundle
// only includes what's needed above the fold.
const Portfolio    = lazy(() => import("./components/Portfolio"));
const Process      = lazy(() => import("./components/Process"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ          = lazy(() => import("./components/FAQ"));
const Contact      = lazy(() => import("./components/Contact"));
const Footer       = lazy(() => import("./components/Footer"));

function App() {
  return (
    <>
      {/* Continuous ambient background so sections blend without hard seams */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0A1A2E] to-night" />
        {/* Ambient accent glows baked as radial-gradients instead of huge
            blur() filters. A blurred fixed layer behind a scrolling page forces
            constant re-rasterisation (mobile scroll jank); a gradient is painted
            once and composited for free. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45vh 45vh at 4% 28%, rgba(11,95,216,0.13), transparent 70%), radial-gradient(48vh 48vh at 96% 66%, rgba(59,158,255,0.09), transparent 70%)",
          }}
        />
      </div>
      <Navbar />
      <main className="text-white">
        <Hero />
        <Services />
        <Stats />
        <Suspense>
          <Portfolio />
          <Process />
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
      <CookieBanner />
      <Analytics />
    </>
  );
}

export default App;
