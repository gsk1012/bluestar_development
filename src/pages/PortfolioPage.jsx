import { Link } from "react-router-dom";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { getCases, getPortfolioPage } from "../data/sitePages";
import { useLanguage } from "../i18n/LanguageContext";
import usePageMeta from "../lib/usePageMeta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageIntro from "../components/PageIntro";
import Laptop from "../components/Laptop";
import Contact from "../components/Contact";

/** /portfolio: elk project als rij met de site in een MacBook, om en om links en rechts. */
export default function PortfolioPage() {
  const { lang, t } = useLanguage();
  const page = getPortfolioPage(lang);
  const cases = getCases(lang);
  usePageMeta(page.path, page.metaTitle, page.metaDescription);

  return (
    <>
      <Navbar />
      <main>
        <PageIntro current={page.breadcrumb} heading={page.heading} lead={page.lead} chevron />

        <section className="section">
          <div className="wrap flex flex-col gap-[clamp(4rem,8vw,7rem)]">
            {cases.map((c, i) => (
              <article key={c.slug} className="grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Laptop src={c.project.image} fullSrc={c.project.scrollImage} alt={`${t.portfolio.screenshotAlt} ${c.breadcrumb}`} />
                </div>
                <div>
                  <p className="text-[0.9375rem] font-semibold text-accent-text">{c.kind}</p>
                  <h2 className="mt-3">
                    <Link to={`/portfolio/${c.slug}`} className="transition-colors duration-150 hover:text-brand">
                      <span className="accent">{c.breadcrumb}</span>
                    </Link>
                  </h2>
                  <p className="lead mt-4">{c.lead}</p>
                  {/* Het doel van het project: eigen tekst per case, ook voor Google. */}
                  <p className="mt-4 text-ink-soft">{c.sections[0].body}</p>
                  <ul className="register mt-7">
                    {c.project.highlights.map((h, j) => (
                      <li key={h} className="flex items-center gap-3 py-3">
                        <Check size={16} weight="bold" aria-hidden="true" className="shrink-0 text-brand" />
                        {t.portfolio.projects[i]?.highlights[j] ?? h}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/portfolio/${c.slug}`} className="btn btn-primary mt-8">
                    {page.viewCase}
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
