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

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Why />
        <Pricing />
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
