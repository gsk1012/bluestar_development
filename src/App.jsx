import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
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
          <Pricing />
          <Portfolio />
          <Process />
          <Testimonials />
          <FAQ />
          <BlogPreview />
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
