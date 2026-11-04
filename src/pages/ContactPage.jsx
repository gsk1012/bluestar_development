import { ArrowDown, Clock, Envelope, MapPin, Phone } from "@phosphor-icons/react";
import { getContactPage } from "../data/sitePages";
import { useLanguage } from "../i18n/LanguageContext";
import usePageMeta from "../lib/usePageMeta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageIntro from "../components/PageIntro";
import Contact from "../components/Contact";

const ICONS = { mail: Envelope, phone: Phone, clock: Clock, map: MapPin };

/** /contact: de kop met de directe contactgegevens, daaronder het formulier. */
export default function ContactPage() {
  const { lang } = useLanguage();
  const page = getContactPage(lang);
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
          arrow={false}
          actions={
            <a href="#contact" className="btn btn-primary btn-large">
              {page.cta}
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>
          }
          aside={
            <aside className="rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-lift">
              <h2 className="text-xl font-bold tracking-[-0.012em]">{page.panelTitle}</h2>
              <ul className="register mt-5">
                {page.rows.map((row) => {
                  const Icon = ICONS[row.icon];
                  return (
                    <li key={row.label} className="flex items-center gap-4 py-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner bg-bone text-brand">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm text-ink-soft">{row.label}</span>
                        {row.href ? (
                          <a href={row.href} className="truncate font-semibold text-ink transition-colors duration-150 hover:text-brand">
                            {row.value}
                          </a>
                        ) : (
                          <span className="font-semibold">{row.value}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-[0.9375rem] text-ink-soft">{page.note}</p>
            </aside>
          }
        />
        <Contact above="bone" />
      </main>
      <Footer />
    </>
  );
}
