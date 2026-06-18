/* eslint-disable react-refresh/only-export-components */
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
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
import BlogPreview from './components/BlogPreview'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0A1A2E] to-night" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45vh 45vh at 4% 28%, rgba(11,95,216,0.13), transparent 70%), radial-gradient(48vh 48vh at 96% 66%, rgba(59,158,255,0.09), transparent 70%)",
        }}
      />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="text-white">
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

function ServerApp({ url }) {
  let content
  if (url === '/blog') {
    content = <Blog />
  } else if (url.startsWith('/blog/')) {
    content = <BlogPost />
  } else {
    content = <HomePage />
  }

  return (
    <StaticRouter location={url}>
      <Background />
      {content}
    </StaticRouter>
  )
}

export function render(url = '/') {
  return renderToStaticMarkup(
    <StrictMode>
      <LanguageProvider>
        <MenuProvider>
          <ServerApp url={url} />
        </MenuProvider>
      </LanguageProvider>
    </StrictMode>
  )
}
