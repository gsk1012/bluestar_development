import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useMenu } from "../lib/menu";
import BrandMark from "./BrandMark";

function NavItem({ link, className, onClick, style }) {
  return link.external ? (
    <Link to={link.href} onClick={onClick} className={className} style={style}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} onClick={onClick} className={className} style={style}>
      {link.label}
    </a>
  );
}

function LangToggle({ lang, setLang, label, onDark = false }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border p-0.5 text-sm font-semibold ${
        onDark ? "border-white/40" : "border-line-strong"
      }`}
    >
      {["nl", "en"].map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`h-8 w-10 rounded-full uppercase transition-colors duration-150 ${
              active
                ? onDark
                  ? "bg-white text-brand"
                  : "bg-brand text-white"
                : onDark
                ? "text-white hover:bg-white/15"
                : "text-ink hover:text-brand"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const { menuOpen: open, setMenuOpen: setOpen } = useMenu();

  // Het volschermmenu bedekt de pagina; die scrolt er dan niet onder mee.
  useEffect(() => {
    document.documentElement.classList.toggle("has-open-menu", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const closeMenu = () => setOpen(false);
  const anchor = (hash) => (onHome ? hash : `/${hash}`);
  // Het contactformulier staat onder bijna elke pagina; alleen de blog en de
  // juridische pagina's hebben het niet.
  const noContact =
    pathname.startsWith("/blog") || ["/privacybeleid", "/algemene-voorwaarden", "/disclaimer"].includes(pathname);
  const contactHref = noContact ? "/#contact" : "#contact";
  const navLinks = [
    { label: t.nav.services, href: anchor("#diensten") },
    { label: t.nav.work, href: "/portfolio", external: true },
    // Op smallere desktops past de balk niet met alle links; Aanpak wijkt dan.
    { label: t.nav.approach, href: anchor("#aanpak"), wideOnly: true },
    { label: t.nav.pricing, href: "/prijzen", external: true },
    { label: t.nav.faq, href: anchor("#faq") },
    { label: t.nav.blog, href: "/blog", external: true },
    { label: t.nav.contact, href: "/contact", external: true },
  ];

  return (
    // Zwevende balk: een witte pil die los van de bovenrand over de pagina hangt.
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <nav className="site-nav wrap relative z-[2]">
        <div className="site-nav__pill">
          <BrandMark onClick={closeMenu} ariaLabel={t.nav.logoAria} />

          <div className="ml-auto hidden h-full items-stretch lg:flex">
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} className={`nav-link ${link.wideOnly ? "!hidden xl:!inline-flex" : ""}`} />
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <LangToggle lang={lang} setLang={setLang} label={t.nav.langLabel} />
            <a href={contactHref} className="btn btn-primary">
              {t.nav.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ground text-ink transition-colors duration-150 hover:border-line-strong lg:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Volschermmenu: een indigo vlak over de hele pagina. De witte pil met
          logo en kruisje blijft erboven staan dankzij de hogere z-index. */}
      <div
        id="mobile-menu"
        inert={!open ? true : undefined}
        className={`mobile-nav fixed inset-0 z-[1] flex flex-col items-center justify-center gap-10 overflow-y-auto bg-brand px-[var(--gutter)] pb-12 pt-28 lg:hidden ${
          open ? "is-open" : ""
        }`}
      >
        <ul className="flex flex-col items-center gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <NavItem
                link={link}
                onClick={closeMenu}
                style={{ animationDelay: `${80 + i * 45}ms` }}
                className="mobile-nav__item block px-5 py-2 text-[1.75rem] font-semibold text-white underline-offset-8 hover:underline"
              />
            </li>
          ))}
        </ul>
        <div className="flex w-full max-w-xs flex-col items-center gap-6 border-t border-white/30 pt-8">
          <a href={contactHref} onClick={closeMenu} className="btn btn-light w-full">
            {t.nav.cta}
          </a>
          <LangToggle lang={lang} setLang={setLang} label={t.nav.langLabel} onDark />
        </div>
      </div>
    </header>
  );
}
