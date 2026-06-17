import { renderToStaticMarkup } from 'react-dom/server'
import { StrictMode } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Eager version of App — no React.lazy so all sections render to HTML.
function ServerApp() {
  return (
    <>
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
        <Portfolio />
        <Process />
        <Testimonials />
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
        <ServerApp />
      </LanguageProvider>
    </StrictMode>
  )
}
