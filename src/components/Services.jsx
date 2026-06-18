import { useReducedMotion } from "motion/react";
import { Browser, ShoppingCart, Code, Wrench, CloudArrowUp } from "@phosphor-icons/react";
import { useReveal } from "../lib/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

// Decoratieve tegel-achtergronden — geoptimaliseerd (resized + WebP) en lokaal
// geserveerd. Oorspronkelijk 1–2 MB PNG's per stuk; nu < 60 KB per tegel.
const IMG_WEBSITE = "/services/website.webp";
const IMG_WEBSHOP = "/services/webshop.webp";
const IMG_WEBAPP = "/services/webapp.webp";
const IMG_ONDERHOUD = "/services/onderhoud.webp";
const IMG_HOSTING = "/services/hosting.webp";

function ImageTile({ img, title, desc, icon: Icon, className = "", index }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`reveal-item group relative overflow-hidden rounded-rmd ${className}`}
      style={{ '--i': index }}
    >
      <img
        src={img}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover opacity-55 ${
          reduce ? "" : "transition-transform duration-700 group-hover:scale-105"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
      <div className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-accent-bright/0 blur-3xl transition-all duration-500 group-hover:bg-accent-bright/20" />
      <div className="absolute inset-0 rounded-rmd ring-1 ring-white/10 transition-all duration-300 group-hover:ring-accent-bright/30" />
      <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
        <Icon
          size={26}
          weight="duotone"
          className="mb-3 text-accent-bright transition-colors duration-300 group-hover:text-white"
        />
        <h3 className="font-heading text-xl font-bold tracking-tight text-white lg:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/55">{desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const [headingRef, headingVisible] = useReveal({ threshold: 0.4 });
  const [gridRef, gridVisible] = useReveal();

  const tiles = [
    { img: IMG_WEBSITE, key: "website", icon: Browser, className: "min-h-[260px] sm:col-span-2 md:col-span-2" },
    { img: IMG_WEBSHOP, key: "webshop", icon: ShoppingCart, className: "min-h-[260px] sm:col-span-1 md:col-span-1" },
    { img: IMG_WEBAPP, key: "webapp", icon: Code, className: "min-h-[220px] sm:col-span-1 md:col-span-1" },
    { img: IMG_ONDERHOUD, key: "maintenance", icon: Wrench, className: "min-h-[220px] sm:col-span-1 md:col-span-1" },
    { img: IMG_HOSTING, key: "hosting", icon: CloudArrowUp, className: "min-h-[220px] sm:col-span-2 md:col-span-1" },
  ];

  return (
    <section id="diensten" className="relative isolate overflow-hidden py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(38vh 38vh at 100% 18%, rgba(11,95,216,0.14), transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={headingRef}
          className={`reveal mb-10 max-w-xl lg:mb-12${headingVisible ? ' in-view' : ''}`}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {s.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            {s.subheading}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`reveal-group grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[320px_220px] lg:gap-4${gridVisible ? ' in-view' : ''}`}
        >
          {tiles.map(({ img, key, icon, className }, i) => (
            <ImageTile
              key={key}
              img={img}
              title={s.items[key].title}
              desc={s.items[key].desc}
              icon={icon}
              className={className}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
