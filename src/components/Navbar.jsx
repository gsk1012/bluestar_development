import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Diensten", href: "#diensten" },
  { label: "Werk", href: "#portfolio" },
  { label: "Aanpak", href: "#aanpak" },
  { label: "Contact", href: "#contact" },
];

const CTA_LABEL = "Plan een gesprek";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const closeMenu = () => setOpen(false);
  // When the mobile menu is open over the dark hero, treat the bar as "solid" for contrast.
  const solid = scrolled || open;

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
          aria-label="BlueStar Development, naar boven"
        >
          <img
            src="/logo-mark.png"
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

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
          >
            {CTA_LABEL}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-rsm text-white transition-colors duration-150 hover:bg-white/10 active:scale-[0.97] md:hidden"
        >
          {open ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-4 top-[76px] z-50 w-[calc(100%-2rem)] max-w-xs origin-top-right rounded-rmd border border-white/10 bg-ink/95 p-3 shadow-lg shadow-black/30 backdrop-blur md:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[44px] items-center rounded-rsm px-3 text-sm font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
              >
                {CTA_LABEL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
