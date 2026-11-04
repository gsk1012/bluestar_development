import { ChatCircleText, Eye, Gauge, Lifebuoy, ListChecks, PenNib } from "@phosphor-icons/react";
import { getAboutPage } from "../data/sitePages";
import { useLanguage } from "../i18n/LanguageContext";
import usePageMeta from "../lib/usePageMeta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import PageIntro from "../components/PageIntro";
import Prose from "../components/Prose";
import Process from "../components/Process";
import Contact from "../components/Contact";

const ICONS = { pen: PenNib, gauge: Gauge, eye: Eye, chat: ChatCircleText, list: ListChecks, lifebuoy: Lifebuoy };

/** /over-ons: wie we zijn in uitgangspunten, waarmee we bouwen en hoe we werken. */
export default function AboutPage() {
  const { lang, t } = useLanguage();
  const page = getAboutPage(lang);
  usePageMeta(page.path, page.metaTitle, page.metaDescription);

  return (
    <>
      <Navbar />
      <main>
        <PageIntro
          current={page.breadcrumb}
          heading={page.heading}
          lead={page.lead}
          chevron
          aside={
            <aside className="rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-lift">
              <h2 className="text-xl font-bold tracking-[-0.012em]">{t.pages.aboutFacts}</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {t.why.facts.map((fact) => (
                  <div key={fact.label} className="rounded-inner bg-bone p-4">
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="tabular text-[1.625rem] font-bold leading-none tracking-[-0.02em] text-brand">{fact.value}</dd>
                    <dd className="mt-2 text-sm text-ink-soft">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          }
        />

        <section className="section">
          <div className="wrap">
            <div className="max-w-[54rem]">
              <Heading parts={page.principles.heading} />
              <p className="lead mt-4">{page.principles.lead}</p>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.principles.items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.title} className="rounded-card border border-line bg-ground p-6 shadow-soft lg:p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-inner bg-brand text-white">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl">{item.title}</h3>
                    <p className="mt-2 text-ink-soft">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <div className="band">
          <section className="section">
            <div className="wrap grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
              <div>
                <Heading parts={page.stack.heading} />
                <div className="mt-6">
                  <Prose body={page.stack.body} />
                </div>
              </div>
              <ul className="flex flex-wrap gap-2.5 rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-soft">
                {page.stack.tools.map((tool) => (
                  <li key={tool} className="rounded-full border border-line-strong px-4 py-2 text-[0.9375rem] font-semibold">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
