import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

/**
 * De kop van elke subpagina: een bone band met kruimelpad, h1 en inleiding,
 * en onderaan de merkpijl naar de eerste sectie (één keer per pagina).
 *
 * @param {{label: string, href?: string}[]} crumbs - tussen Home en de huidige pagina
 * @param {string} current - naam van de huidige pagina in het kruimelpad
 * @param {string[]} heading - h1 in Heading-delen
 * @param {React.ReactNode} [actions] - knoppen onder de inleiding
 * @param {React.ReactNode} [aside] - vlak rechts naast de tekst (desktop)
 * @param {boolean} [chevron] - indigo merkchevron tegen de rechterrand, achter het vlak
 * @param {boolean} [arrow] - merkpijl onderaan; uit als er direct een donker blok volgt
 */
export default function PageIntro({
  crumbs = [],
  current,
  heading,
  lead,
  actions,
  aside,
  chevron = false,
  arrow = true,
  children,
}) {
  const { t } = useLanguage();
  const ui = t.servicePage;

  return (
    <header className={`band pt-[var(--header-height)] ${arrow ? "band--arrow" : ""}`}>
      <div className="band__lanes" aria-hidden="true">
        <span className="band__lane band__lane--one" />
      </div>
      {chevron && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[26%] bg-brand lg:block"
          style={{ clipPath: "polygon(38% 0, 100% 0, 100% 100%, 38% 100%, 0 50%)" }}
        />
      )}

      <div className="wrap relative pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(1.75rem,4vw,3rem)]">
        <nav aria-label={ui.breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.9375rem] text-ink-soft">
            {[{ label: ui.home, href: "/" }, ...crumbs].map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {/* Ankers als /#diensten zijn een gewone link; paginalinks gaan via de router. */}
                {crumb.href.includes("#") ? (
                  <a href={crumb.href} className="transition-colors duration-150 hover:text-brand">
                    {crumb.label}
                  </a>
                ) : (
                  <Link to={crumb.href} className="transition-colors duration-150 hover:text-brand">
                    {crumb.label}
                  </Link>
                )}
                <CaretRight size={13} weight="bold" aria-hidden="true" />
              </li>
            ))}
            <li aria-current="page" className="font-semibold text-ink">
              {current}
            </li>
          </ol>
        </nav>

        <div
          className={`mt-8 grid gap-10 lg:mt-10 ${
            aside ? "lg:grid-cols-[7fr_4.5fr] lg:items-center lg:gap-16" : ""
          }`}
        >
          <div>
            <Heading as="h1" parts={heading} className="max-w-[52rem] text-[clamp(2.375rem,1.5rem+3vw,4rem)]" />
            {lead && <p className="lead mt-6 max-w-[42rem]">{lead}</p>}
            {actions && <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">{actions}</div>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </header>
  );
}
