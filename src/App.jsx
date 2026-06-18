import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";

const Portfolio    = lazy(() => import("./components/Portfolio"));
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
  );
}

function HomePage() {
  return (
    <>
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
      <Background />
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
