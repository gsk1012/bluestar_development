import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { getCase, getCases } from "../data/sitePages";
import { useLanguage } from "../i18n/LanguageContext";
import usePageMeta from "../lib/usePageMeta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import PageIntro from "../components/PageIntro";
import Laptop from "../components/Laptop";
import Prose from "../components/Prose";
import Contact from "../components/Contact";

/**
 * /portfolio/:slug — één project: de kop met de feiten, de site groot in een
 * MacBook, en daaronder doel, opbouw en wat we bouwden.
 *
 * @param {string} [slug] - bij het voorrenderen; in de browser komt hij uit de route
 */
export default function CasePage({ slug: slugProp }) {
  const params = useParams();
  const { lang, t } = useLanguage();
  const ui = t.pages;
  const item = getCase(slugProp ?? params.slug, lang);
  usePageMeta(item && `/portfolio/${item.slug}`, item?.metaTitle, item?.metaDescription);

  if (!item) return <Navigate to="/portfolio" replace />;

  const [goal, built, how] = item.sections;
  const other = getCases(lang).find((c) => c.slug !== item.slug);
  const host = item.project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <Navbar />
      <main>
        <PageIntro
          crumbs={[{ label: ui.portfolio, href: "/portfolio" }]}
          current={item.breadcrumb}
          heading={item.heading}
          lead={item.lead}
          updated={item.updatedAt}
          chevron
          aside={
            <aside className="rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-lift">
              <dl className="register">
                {[
                  [ui.caseType, item.kind],
                  [ui.caseClient, item.client],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5 border-t border-line-strong py-3.5">
                    <dt className="text-sm text-ink-soft">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5 border-y border-line-strong py-3.5">
                  <dt className="text-sm text-ink-soft">{ui.caseLive}</dt>
                  <dd>
                    <a
                      href={item.project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link inline-flex items-center gap-1.5"
                    >
                      {host}
                      <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          }
        />

        <section className="section">
          <div className="wrap">
            <div className="mx-auto max-w-[56rem]">
              <Laptop src={item.project.image} fullSrc={item.project.scrollImage} alt={`${t.portfolio.screenshotAlt} ${item.breadcrumb}`} />
            </div>
          </div>
        </section>

        <div className="band">
          <section className="section">
            <div className="wrap grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                {[goal, how].map((s) => (
                  <article key={s.heading} className="rounded-card border border-line bg-ground p-[clamp(1.5rem,3.5vw,2.75rem)] shadow-soft">
                    <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-normal">{s.heading}</h2>
                    <div className="mt-5">
                      <Prose body={s.body} />
                    </div>
                  </article>
                ))}
              </div>
              <article className="relative overflow-hidden rounded-card bg-brand p-[clamp(1.5rem,3.5vw,2.75rem)] text-white shadow-lift">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="absolute -left-[30%] top-[60%] h-40 w-[160%] -rotate-[22deg] bg-white/[0.07]" />
                </span>
                <h2 className="relative text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-normal">{built.heading}</h2>
                <div className="relative mt-5">
                  <Prose body={built.body} dark />
                </div>
                <a
                  href={item.project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light relative mt-8"
                >
                  {ui.caseVisit}
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </article>
            </div>
          </section>
        </div>

        {other && (
          <section className="section">
            <div className="wrap grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16">
              <div>
                <Heading parts={["", ui.caseMore]} />
                <p className="lead mt-4">{other.lead}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link to={`/portfolio/${other.slug}`} className="btn btn-primary">
                    {other.breadcrumb}
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </Link>
                  <Link to="/portfolio" className="text-link inline-flex items-center gap-1.5">
                    {ui.allWork}
                    <ArrowRight size={15} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <Link to={`/portfolio/${other.slug}`} aria-hidden="true" tabIndex={-1}>
                <Laptop src={other.project.image} alt="" />
              </Link>
            </div>
          </section>
        )}

        <Contact above={other ? "white" : "bone"} />
      </main>
      <Footer />
    </>
  );
}
