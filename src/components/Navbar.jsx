import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";

function NavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center px-1 py-2 text-sm font-medium text-white/80 transition-colors duration-150 hover:text-white"
    >
      {label}
      <span className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent-bright transition-transform duration-150 ease-out group-hover:scale-x-100" />
    </a>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-medium">
      {["nl", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-150 ${
            lang === l
              ? "bg-accent text-white"
              : "text-white/50 hover:text-white"
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const closeMenu = () => setOpen(false);
  const solid = scrolled || open;

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#diensten" },
    { label: t.nav.work, href: "#portfolio" },
    { label: t.nav.approach, href: "#aanpak" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink/80 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
        <a
          href="#home"
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
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle lang={lang} setLang={setLang} />
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
          aria-expanded={open}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-rsm text-white transition-colors duration-150 hover:bg-white/10"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute"
              >
                <X size={22} weight="regular" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute"
              >
                <List size={22} weight="regular" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-4 top-[76px] z-50 w-[calc(100%-2rem)] max-w-xs rounded-rmd border border-white/10 bg-ink/95 p-3 shadow-xl shadow-black/40 backdrop-blur md:hidden overflow-hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, delay: 0.06 + i * 0.045, ease: [0.23, 1, 0.32, 1] }}
                  className="flex min-h-[44px] items-center rounded-rsm px-3 text-sm font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: 0.06 + navLinks.length * 0.045, ease: [0.23, 1, 0.32, 1] }}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
              >
                {t.nav.cta}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
