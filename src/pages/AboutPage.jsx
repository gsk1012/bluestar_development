import {
  Atom,
  ChatCircleText,
  Files,
  GlobeHemisphereWest,
  Lifebuoy,
  ListChecks,
  PaintBrush,
  PenNib,
  ShieldCheck,
} from "@phosphor-icons/react";
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

const ICONS = {
  pen: PenNib,
  chat: ChatCircleText,
  list: ListChecks,
  lifebuoy: Lifebuoy,
};

const TOOL_ICONS = {
  react: Atom,
  pages: Files,
  design: PaintBrush,
  globe: GlobeHemisphereWest,
  shield: ShieldCheck,
};

/**
 * /over-ons: wie erachter zit (foto en verhaal), de uitgangspunten, waarmee we
 * bouwen en hoe we werken.
 */
export default function AboutPage() {
  const { lang, t } = useLanguage();
  const page = getAboutPage(lang);
  usePageMeta(page.path, page.metaTitle, page.metaDescription);
  const founder = page.founder;

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
              <h2 className="text-xl font-bold tracking-[-0.012em]">
                {t.pages.aboutFacts}
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {t.why.facts.map((fact) => (
                  <div key={fact.label} className="rounded-inner bg-bone p-4">
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="tabular text-[1.625rem] font-bold leading-none tracking-[-0.02em] text-brand">
                      {fact.value}
                    </dd>
                    <dd className="mt-2 text-sm text-ink-soft">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          }
        />

        <section className="section" aria-labelledby="founder-title">
          <div className="wrap grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[5fr_7fr]">
            {/* Het merkaccent: een indigo vlak dat rechtsonder achter de foto uitsteekt. */}
            <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0">
              <span
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 h-[70%] w-[70%] rounded-card bg-brand"
              />
              <img
                src={founder.photo}
                alt={founder.photoAlt}
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-card object-cover shadow-lift"
              />
            </div>
            <div>
              <p className="text-[0.9375rem] font-semibold text-accent-text">
                {founder.label}
              </p>
              <Heading
                id="founder-title"
                parts={founder.heading}
                className="mt-3"
              />
              <div className="mt-6">
                <Prose body={founder.body} />
              </div>
              <dl className="register mt-8">
                {founder.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line-strong py-3.5 last:border-b"
                  >
                    <dt className="text-ink-soft">{fact.label}</dt>
                    <dd className="font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div className="band">
          <section className="section">
            <div className="wrap">
              <div className="max-w-[54rem]">
                <Heading parts={page.principles.heading} />
                <p className="lead mt-4">{page.principles.lead}</p>
              </div>
              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {page.principles.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <li
                      key={item.title}
                      className="rounded-card border border-line bg-ground p-6 shadow-soft lg:p-7"
                    >
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
        </div>


        <div>
          <section className="section">
            <div className="wrap grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
              <div>
                <Heading parts={page.stack.heading} />
                <div className="mt-6">
                  <Prose body={page.stack.body} />
                </div>
              </div>
              <ul className="rounded-card bg-ground px-[clamp(1.25rem,3vw,2.25rem)] py-2 shadow-soft">
                {page.stack.tools.map((tool) => {
                  const Icon = TOOL_ICONS[tool.icon];
                  return (
                    <li key={tool.name} className="flex items-center gap-4 border-b border-line py-4 last:border-b-0">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-inner bg-bone text-brand">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{tool.name}</span>
                        <span className="block text-[0.9375rem] text-ink-soft">{tool.desc}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>

        {/* Wit en bone wisselen af: oprichter wit, uitgangspunten bone, techniek wit, werkwijze bone. */}
        <div className="band">
          <Process />
        </div>
        <Contact above="bone" />
      </main>
      <Footer />
    </>
  );
}
