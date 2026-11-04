import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowsClockwise,
  ArrowsLeftRight,
  ArrowUpRight,
  Browser,
  Calculator,
  Check,
  CloudCheck,
  Code,
  Gauge,
  Lifebuoy,
  Scales,
  ShieldCheck,
  Signpost,
  SlidersHorizontal,
  Tag,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import { getServicePage, getServicePages } from "../data/servicePages";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import { sendIntent } from "../lib/intent";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Laptop from "../components/Laptop";
import Pricing, { PriceTag } from "../components/Pricing";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import PageIntro from "../components/PageIntro";
import Prose from "../components/Prose";
import usePageMeta from "../lib/usePageMeta";

const ICONS = { website: Browser, webapp: Code, maintenance: Wrench, pricing: Tag };

/*
 * Eén sjabloon voor alle dienstpagina's. De inhoud komt uit
 * data/servicePages.js; `blocks` bepaalt welke secties een pagina krijgt en in
 * welke volgorde. De achtergronden wisselen vanzelf af (wit, bone, wit, …),
 * zodat elke pagina hetzelfde ritme heeft als de homepage.
 */

function PageHeader({ page, ui }) {
  const Icon = ICONS[page.icon];
  const price = page.panel.price;

  return (
    <PageIntro
      crumbs={page.serviceType ? [{ label: ui.services, href: "/#diensten" }] : []}
      current={page.breadcrumb}
      heading={page.heading}
      lead={page.lead}
      chevron
      actions={
        <>
          <a href="#contact" onClick={() => sendIntent(page.intent)} className="btn btn-primary btn-large">
            {ui.cta}
          </a>
          <Link to={page.secondary.href} className="text-link inline-flex items-center gap-1.5">
            {page.secondary.label}
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </Link>
        </>
      }
      aside={
        <aside className="rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-lift">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-inner bg-brand text-white">
              <Icon size={22} aria-hidden="true" />
            </span>
            <p className="text-[0.9375rem] font-semibold text-ink-soft">{ui.panelLabel}</p>
          </div>
          <div className="mt-6">
            <PriceTag plan={{ from: price.from, price: price.value, unit: price.unit }} from={ui.from} />
          </div>
          <ul className="register mt-7">
            {page.panel.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-3 py-3 text-[0.9375rem]">
                <Check size={16} weight="bold" aria-hidden="true" className="shrink-0 text-brand" />
                {fact}
              </li>
            ))}
          </ul>
        </aside>
      }
    />
  );
}

function Included({ page }) {
  const inc = page.included;
  return (
    <section className="section">
      <div className="wrap">
        <div className="max-w-[54rem]">
          <Heading parts={inc.heading} />
          <p className="lead mt-4">{inc.lead}</p>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {inc.items.map((item) => (
            <li key={item.title} className="relative border-t border-line pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-[3px] w-12 bg-brand" />
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TOPIC_ICONS = {
  users: UsersThree,
  gauge: Gauge,
  tag: Tag,
  lifebuoy: Lifebuoy,
  signpost: Signpost,
  compare: ArrowsLeftRight,
  calculator: Calculator,
  shield: ShieldCheck,
  cloud: CloudCheck,
  sliders: SlidersHorizontal,
  cycle: ArrowsClockwise,
  scales: Scales,
};

// Eén onderwerp als kaart. `featured` is het indigo hoofdvlak met diagonale
// banen; `wide` legt kop en tekst op desktop naast elkaar.
function TopicCard({ topic, Icon, featured = false, wide = false }) {
  return (
    <article
      id={topic.id}
      className={`relative scroll-mt-[calc(var(--header-height)+1.5rem)] overflow-hidden rounded-card p-[clamp(1.5rem,3.5vw,2.75rem)] ${
        featured ? "bg-brand text-white shadow-lift" : "border border-line bg-ground shadow-soft"
      } ${wide ? "lg:col-span-2 lg:grid lg:grid-cols-[5fr_7fr] lg:gap-12" : ""}`}
    >
      {featured && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-[30%] top-[52%] h-40 w-[160%] -rotate-[22deg] bg-white/[0.07]" />
          <span className="absolute -left-[30%] top-[86%] h-20 w-[160%] -rotate-[22deg] bg-white/[0.05]" />
        </span>
      )}
      <div className="relative">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-inner ${
            featured ? "bg-white text-brand" : "bg-bone text-brand"
          }`}
        >
          <Icon size={24} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-normal">{topic.heading}</h2>
      </div>
      <div className={`relative mt-5 ${wide ? "lg:mt-0" : ""}`}>
        <Prose body={topic.body} dark={featured} />
      </div>
    </article>
  );
}

// De verdieping als bento: het eerste onderwerp breed in indigo, de rest in
// witte kaarten per twee. Blijft er één over, dan wordt die ook breed.
function Sections({ page }) {
  const icon = (i) => TOPIC_ICONS[page.sectionIcons?.[i]] ?? Check;
  const [first, ...rest] = page.sections;
  return (
    <section className="section">
      <div className="wrap grid gap-5 lg:grid-cols-2">
        <TopicCard topic={first} Icon={icon(0)} featured wide />
        {rest.map((topic, i) => (
          <TopicCard
            key={topic.heading}
            topic={topic}
            Icon={icon(i + 1)}
            wide={rest.length % 2 === 1 && i === rest.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function CaseStudy({ ui, t }) {
  const project = projects[0];
  const copy = t.portfolio.projects[0];
  return (
    <section className="section">
      <div className="wrap grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
        <Laptop src={project.image} fullSrc={project.scrollImage} alt={`${t.portfolio.screenshotAlt} ${copy.title}`} />
        <div>
          <p className="text-[0.9375rem] font-semibold text-accent-text">{ui.caseLabel}</p>
          <h2 className="mt-3">
            <span className="accent">{copy.title}</span>
          </h2>
          <p className="lead mt-4">{copy.description}</p>
          <ul className="register mt-7">
            {copy.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 py-3">
                <Check size={16} weight="bold" aria-hidden="true" className="shrink-0 text-brand" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
              {ui.caseVisit}
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </a>
            <a href="/#portfolio" className="text-link inline-flex items-center gap-1.5">
              {ui.caseMore}
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Related({ page, lang, ui }) {
  const others = getServicePages(lang).filter((p) => p.slug !== page.slug);
  return (
    <section className="section">
      <div className="wrap">
        <Heading parts={ui.relatedHeading} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <article
                key={p.slug}
                className="group relative flex flex-col rounded-card bg-ground p-6 shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1 lg:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-inner bg-bone text-brand">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">
                  <Link
                    to={`/${p.slug}`}
                    className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-brand"
                  >
                    {p.card.title}
                  </Link>
                </h3>
                <p className="mb-6 mt-2 text-[0.9375rem] text-ink-soft">{p.card.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-4 text-[0.9375rem] font-semibold text-brand">
                  {ui.readMore}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * @param {string} [slug] - een slug uit data/servicePages.js; in de browser komt
 *   hij uit de route, bij het voorrenderen geeft entry-server hem mee.
 */
export default function ServicePage({ slug: slugProp }) {
  const params = useParams();
  const { lang, t } = useLanguage();
  const ui = t.servicePage;
  const page = getServicePage(slugProp ?? params.slug, lang);
  usePageMeta(page && `/${page.slug}`, page?.metaTitle, page?.metaDescription);

  if (!page) return <Navigate to="/" replace />;

  const render = {
    included: () => <Included page={page} />,
    sections: () => <Sections page={page} />,
    case: () => <CaseStudy ui={ui} t={t} />,
    pricing: () => <Pricing plain heading={page.pricing.heading} subheading={page.pricing.lead} />,
    process: () => <Process />,
    faq: () => <FAQ heading={page.faq.heading} items={page.faq.items} />,
    related: () => <Related page={page} lang={lang} ui={ui} />,
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader page={page} ui={ui} />
        {page.blocks.map((block, i) => (
          // De header is bone; daarna wisselen wit en bone af. De merkpijl
          // staat één keer per pagina, onder de header.
          <div key={block} className={i % 2 === 1 ? "band" : ""}>
            {render[block]()}
          </div>
        ))}
        <Contact above={page.blocks.length % 2 === 0 ? "bone" : "white"} />
      </main>
      <Footer />
    </>
  );
}
