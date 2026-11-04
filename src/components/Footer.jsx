import { Link, useLocation } from "react-router-dom";
import { getServicePages } from "../data/servicePages";
import { useLanguage } from "../i18n/LanguageContext";
import BrandMark from "./BrandMark";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [{ label: "06 8647 7249", tel: "0686477249" }];

const linkCls =
  "inline-flex min-h-[44px] items-center text-ink-soft transition-colors duration-150 hover:text-brand md:min-h-0 md:py-1";

export default function Footer() {
  const { lang, t } = useLanguage();
  const { pathname } = useLocation();
  const f = t.footer;
  // Ankers als #faq bestaan alleen op de homepage.
  const anchor = (href) => (pathname === "/" ? href : `/${href}`);

  return (
    <footer className="bg-bone">
      <div className="wrap py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <BrandMark ariaLabel={t.nav.logoAria} />
            <p className="mt-5 max-w-xs text-ink-soft">{f.tagline}</p>
          </div>

          <nav aria-label={f.services}>
            <h2 className="text-[0.9375rem] font-semibold tracking-normal">{f.services}</h2>
            <ul className="mt-3 flex flex-col">
              {getServicePages(lang).map((page) => (
                <li key={page.slug}>
                  <Link to={`/${page.slug}`} className={linkCls}>
                    {page.card.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.navigation}>
            <h2 className="text-[0.9375rem] font-semibold tracking-normal">{f.navigation}</h2>
            <ul className="mt-3 flex flex-col">
              {f.navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <Link to={link.href} className={linkCls}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={anchor(link.href)} className={linkCls}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.9375rem] font-semibold tracking-normal">{f.contact}</h2>
            <ul className="mt-3 flex flex-col">
              <li>
                <a href={`mailto:${EMAIL}`} className={linkCls}>
                  {EMAIL}
                </a>
              </li>
              {PHONES.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className={`tabular ${linkCls}`}>
                    {phone.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line-strong pt-8 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-soft">
            &copy; {new Date().getFullYear()} BlueStar Development. {f.copyright}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {[
              ["/algemene-voorwaarden", f.terms],
              ["/privacybeleid", f.privacy],
              ["/disclaimer", f.disclaimer],
            ].map(([href, label]) => (
              <Link key={href} to={href} className="text-ink-soft transition-colors duration-150 hover:text-brand">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
