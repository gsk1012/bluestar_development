/* eslint-disable react-refresh/only-export-components */
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { StrictMode } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { MenuProvider } from './lib/menu'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Why from './components/Why'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import BlogPreview from './components/BlogPreview'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ServicePage from './pages/ServicePage'
import { SERVICE_SLUGS } from './data/servicePages'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'
import CasePage from './pages/CasePage'
import LegalPage from './pages/LegalPage'
import { LEGAL_SLUGS } from './data/legalPages'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Why />
        <Pricing moreLink />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <BlogPreview />
        <Contact above="bone" />
      </main>
      <Footer />
    </>
  )
}

function ServerApp({ url }) {
  let content
  if (url === '/blog') {
    content = <Blog />
  } else if (url.startsWith('/blog/')) {
    content = <BlogPost slug={url.slice('/blog/'.length)} />
  } else if (url === '/contact') {
    content = <ContactPage />
  } else if (url === '/over-ons') {
    content = <AboutPage />
  } else if (url === '/portfolio') {
    content = <PortfolioPage />
  } else if (url.startsWith('/portfolio/')) {
    content = <CasePage slug={url.slice('/portfolio/'.length)} />
  } else if (LEGAL_SLUGS.includes(url.slice(1))) {
    content = <LegalPage slug={url.slice(1)} />
  } else if (SERVICE_SLUGS.includes(url.slice(1))) {
    content = <ServicePage slug={url.slice(1)} />
  } else {
    content = <HomePage />
  }

  return (
    <StaticRouter location={url}>
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
