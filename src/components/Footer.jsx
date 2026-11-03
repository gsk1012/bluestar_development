import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import BrandMark from "./BrandMark";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [{ label: "06 8647 7249", tel: "0686477249" }];

const linkCls =
  "inline-flex min-h-[44px] items-center text-ink-soft transition-colors duration-150 hover:text-brand md:min-h-0 md:py-1";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-bone">
      <div className="wrap py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
          <div>
            <BrandMark ariaLabel={t.nav.logoAria} />
            <p className="mt-5 max-w-xs text-ink-soft">{f.tagline}</p>
          </div>

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
                    <a href={link.href} className={linkCls}>
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
              ["/algemene_voorwaarden_bluestar.pdf", f.terms],
              ["/privacybeleid_bluestar.pdf", f.privacy],
              ["/disclaimer_bluestar.pdf", f.disclaimer],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft transition-colors duration-150 hover:text-brand"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
