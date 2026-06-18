import { renderToStaticMarkup } from 'react-dom/server'
import { StrictMode } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { MenuProvider } from './lib/menu'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Eager version of App — no React.lazy so all sections render to HTML.
function ServerApp() {
  return (
    <>
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
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

export function render() {
  return renderToStaticMarkup(
    <StrictMode>
      <LanguageProvider>
        <MenuProvider>
          <ServerApp />
        </MenuProvider>
      </LanguageProvider>
    </StrictMode>
  )
}
