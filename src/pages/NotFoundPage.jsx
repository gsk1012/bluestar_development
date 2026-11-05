import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Footer from "../components/Footer";
import Skyline from "../components/Skyline";

/**
 * 404: dezelfde avondlucht en grachtengevels als de homepage, maar het pand
 * dat je zocht staat er niet. Met de weg terug naar de pagina's die het
 * vaakst gezocht worden. Bewust zonder navbar: de knoppen en links wijzen
 * de weg, zonder afleiding. Wordt als dist/404.html voorgerenderd; Vercel toont
 * die voor elk onbekend adres, met een echte 404-status.
 */
export default function NotFoundPage() {
  const { t } = useLanguage();
  const nf = t.notFound;

  // Niet indexeren, ook niet als iemand hier via de app (zonder paginalading) belandt.
  useEffect(() => {
    const prev = document.title;
    document.title = nf.metaTitle;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = prev;
      robots.remove();
    };
  }, [nf.metaTitle]);

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="notfound-title">
          <div className="hero__content wrap">
            <p className="text-[0.9375rem] font-semibold tracking-[0.08em] text-accent-soft lg:text-center">{nf.label}</p>
            <h1 id="notfound-title" className="hero__title mt-4 max-w-4xl lg:mx-auto">
              <span className="block">{nf.line1}</span>
              <span className="block font-bold">{nf.line2}</span>
            </h1>
            <p className="mt-6 max-w-[40rem] text-lg leading-normal text-white/90 lg:mx-auto lg:text-center">{nf.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 lg:justify-center">
              <Link to="/" className="btn btn-light sm:min-h-[3.625rem] sm:px-[1.875rem]">
                {nf.home}
              </Link>
              <Link
                to="/contact"
                className="btn border border-white/60 text-white hover:border-white hover:bg-white/10 sm:min-h-[3.625rem] sm:px-[1.875rem]"
              >
                {nf.contact}
              </Link>
            </div>
            <nav aria-label={nf.popularLabel} className="mt-10 lg:text-center">
              <p className="text-sm text-white/75">{nf.popularLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 lg:justify-center">
                {nf.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-150 hover:decoration-white"
                    >
                      {link.label}
                      <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Skyline />
        </section>
      </main>
      <Footer />
    </>
  );
}
