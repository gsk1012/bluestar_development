import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useMenu } from "../lib/menu";

function NavLink({ href, label, onClick, external }) {
  const cls = "group relative inline-flex items-center px-1 py-2 text-sm font-medium text-white/80 transition-colors duration-150 hover:text-white";
  const underline = <span className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent-bright transition-transform duration-150 ease-out group-hover:scale-x-100" />;
  if (external) {
    return (
      <Link to={href} onClick={onClick} className={cls}>
        {label}{underline}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className={cls}>
      {label}{underline}
    </a>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="relative flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-medium">
      {/* Sliding pill — GPU-accelerated transform, no layout shift */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0.5 left-0.5 w-8 rounded-full bg-accent transition-transform duration-[180ms] ease-out"
        style={{ transform: lang === "en" ? "translateX(100%)" : "translateX(0)" }}
      />
      {["nl", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 w-8 rounded-full py-1 text-center uppercase tracking-wide transition-colors duration-150 ${
            lang === l ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  // Menu-open lives in shared context so the Hero can pause its star video
  // while the menu is open (see lib/menu).
  const { menuOpen: open, setMenuOpen: setOpen } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  // Plain passive scroll listener instead of motion's useScroll — the menu is
  // intentionally free of the animation library (see the panel below), so the
  // whole Navbar does zero JS-animation work.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  // When the menu is open, always use a solid background — never backdrop-blur.
  // The menu panel sits over the header, and a backdrop-filter re-samples the
  // blurred backdrop every animation frame. Frosted blur only when scrolled AND
  // the menu is closed (there it sits over static page content, so it's cheap).
  const headerBg = open
    ? "border-white/10 bg-ink"
    : scrolled
    ? "border-white/10 bg-ink/80 backdrop-blur"
    : "border-transparent bg-transparent";

  const anchor = (hash) => onHome ? hash : `/${hash}`;
  const navLinks = [
    { label: t.nav.home, href: anchor("#home") },
    { label: t.nav.services, href: anchor("#diensten") },
    { label: t.nav.work, href: anchor("#portfolio") },
    { label: t.nav.approach, href: anchor("#aanpak") },
    { label: t.nav.faq, href: anchor("#faq") },
    { label: t.nav.blog, href: "/blog", external: true },
    { label: t.nav.contact, href: anchor("#contact") },
  ];

  return (
    <>
      {/* Tap-outside-to-close backdrop — sits behind the header (z-30 < z-40)
          so any tap below the menu panel closes it. */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 md:hidden [@media(orientation:landscape)_and_(max-height:600px)]:block"
          onClick={closeMenu}
        />
      )}
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${headerBg}`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
          aria-label={t.nav.logoAria}
        >
          <img
            src="/logo-mark.webp"
            alt="BlueStar Development logo"
            className="h-9 w-9 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold text-white">
              BlueStar
            </span>
            <span className="text-xs uppercase tracking-wide text-white/60">
              Development
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
          <LangToggle lang={lang} setLang={setLang} />
          <a
            href={anchor("#contact")}
            className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden [@media(orientation:landscape)_and_(max-height:600px)]:flex">
          <LangToggle lang={lang} setLang={setLang} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-rsm text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-90"
          >
            {/* Both icons stay mounted and cross-fade with CSS — no AnimatePresence. */}
            <span
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${
                open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-45 scale-50"
              }`}
            >
              <X size={22} weight="regular" />
            </span>
            <span
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${
                open ? "opacity-0 -rotate-45 scale-50" : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <List size={22} weight="regular" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu — CSS-only open/close. The previous version animated with the
          motion library, whose AnimatePresence + staggered children fired a ~50ms
          main-thread scripting burst at the moment of opening (measured under CPU
          throttle), which dropped the first few frames. Here the panel stays
          mounted and animates opacity + transform via plain CSS transitions/
          keyframes — the compositor handles it with no JS on open. `inert` keeps
          the links out of tab order and pointer events while closed; reduced-
          motion is handled globally in index.css. */}
      <div
        id="mobile-menu"
        inert={!open ? true : undefined}
        className={`absolute right-4 top-[76px] z-50 w-[calc(100%-2rem)] max-w-xs origin-top overflow-hidden rounded-rmd border border-white/10 bg-night p-3 shadow-lg shadow-black/40 transition-[opacity,transform] duration-200 ease-out will-change-[opacity,transform] md:hidden [@media(orientation:landscape)_and_(max-height:600px)]:block [@media(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100svh-88px)] [@media(orientation:landscape)_and_(max-height:600px)]:overflow-y-auto ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          {navLinks.map((link, i) => {
            const cls = `flex min-h-[44px] items-center rounded-rsm px-3 text-sm font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white ${open ? "animate-menu-item" : ""}`;
            const style = open ? { animationDelay: `${60 + i * 45}ms` } : undefined;
            return link.external ? (
              <Link key={link.href} to={link.href} onClick={closeMenu} style={style} className={cls}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={closeMenu} style={style} className={cls}>
                {link.label}
              </a>
            );
          })}
          <a
            href={anchor("#contact")}
            onClick={closeMenu}
            style={open ? { animationDelay: `${60 + navLinks.length * 45}ms` } : undefined}
            className={`mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97] ${
              open ? "animate-menu-item" : ""
            }`}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
    </>
  );
}
