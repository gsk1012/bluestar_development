import { lazy, Suspense } from "react";
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
const Contact      = lazy(() => import("./components/Contact"));
const Footer       = lazy(() => import("./components/Footer"));

function App() {
  return (
    <>
      {/* Continuous ambient background so sections blend without hard seams */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0A1A2E] to-night" />
        <div className="absolute left-[-15%] top-[18%] h-[55vh] w-[55vh] rounded-full bg-accent/10 blur-[160px]" />
        <div className="absolute right-[-15%] top-[62%] h-[55vh] w-[55vh] rounded-full bg-accent-bright/[0.07] blur-[170px]" />
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
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
      <CookieBanner />
    </>
  );
}

export default App;
