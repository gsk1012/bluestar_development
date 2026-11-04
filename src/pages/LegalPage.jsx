import { Navigate, useParams } from "react-router-dom";
import { FilePdf } from "@phosphor-icons/react";
import { getLegalPage } from "../data/legalPages";
import { useLanguage } from "../i18n/LanguageContext";
import usePageMeta from "../lib/usePageMeta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageIntro from "../components/PageIntro";
import Prose from "../components/Prose";

/**
 * Privacybeleid, algemene voorwaarden en disclaimer: rustige leestekst op één
 * kolom, met de PDF als download. Alleen in het Nederlands.
 *
 * @param {string} [slug] - bij het voorrenderen; in de browser uit de route
 */
export default function LegalPage({ slug: slugProp }) {
  const params = useParams();
  const { t } = useLanguage();
  const ui = t.pages;
  const page = getLegalPage(slugProp ?? params.slug);
  usePageMeta(page && `/${page.slug}`, page?.metaTitle, page?.metaDescription);

  if (!page) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      <main>
        <PageIntro
          current={page.title}
          heading={page.heading}
          lead={page.updated}
          actions={
            <a href={page.pdf} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
              <FilePdf size={18} aria-hidden="true" />
              {ui.legalPdf}
            </a>
          }
        />

        <section className="section">
          <div lang="nl" className="wrap max-w-[calc(50rem+2*var(--gutter))]">
            {ui.legalOnlyDutch && (
              <p lang="en" className="mb-10 rounded-inner bg-bone px-5 py-4 text-[0.9375rem]">
                {ui.legalOnlyDutch}
              </p>
            )}
            {page.intro && (
              <div className="mb-12">
                <Prose body={page.intro} />
              </div>
            )}
            {page.sections.map((s, i) => (
              <div key={s.heading} className={i > 0 ? "mt-10 border-t border-line pt-10" : ""}>
                {page.articles && (
                  <p className="text-[0.9375rem] font-semibold text-brand">
                    {ui.legalArticle} {i + 1}
                  </p>
                )}
                <h2 className="mt-1 text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-semibold tracking-[-0.012em]">{s.heading}</h2>
                <div className="mt-4">
                  <Prose body={s.body} plain />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
