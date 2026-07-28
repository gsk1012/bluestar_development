import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

// Vijf panelen die samen één band vormen. Het paneel waar je op staat opent
// zich en toont zijn omschrijving; de rest schuift mee opzij. Geen losse
// kaarten, geen aparte knoppenbalk — het beeld is de bediening.
const ITEMS = [
  { key: "website", img: "/services/website.webp" },
  { key: "webshop", img: "/services/webshop.webp" },
  { key: "webapp", img: "/services/webapp.webp" },
  { key: "maintenance", img: "/services/onderhoud.webp" },
  { key: "hosting", img: "/services/hosting.webp" },
];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);

  return (
    <section id="diensten" className="relative isolate overflow-hidden py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(38vh 38vh at 100% 18%, rgba(11,95,216,0.14), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 max-w-xl lg:mb-14"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {s.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            {s.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="flex flex-col overflow-hidden rounded-rmd ring-1 ring-inset ring-white/10 lg:h-[460px] lg:flex-row"
        >
          {ITEMS.map(({ key, img }, i) => {
            const isActive = active === i;
            return (
              <button
                key={key}
                type="button"
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  flexGrow: isActive ? 2.6 : 1,
                  transition: reduce ? "none" : "flex-grow 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="group relative isolate min-h-[220px] flex-1 basis-0 overflow-hidden border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-bright max-lg:border-t max-lg:first:border-t-0 lg:min-h-0 lg:border-l lg:first:border-l-0"
              >
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 40vw, calc(100vw - 3rem)"
                  className={`absolute inset-0 -z-10 h-full w-full object-cover saturate-[0.55] transition-opacity duration-500 ease-out ${
                    isActive ? "opacity-90" : "opacity-65"
                  }`}
                />
                {/* Lichte blauwe waas: net genoeg om vijf losse foto's één
                    materiaal te laten worden, zonder ze dicht te schilderen. */}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-accent/12" />
                {/* Verloop naar beneden: draagt de tekst, houdt het beeld erboven vrij. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/5"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-white lg:text-xl">
                    {s.items[key].title}
                  </h3>
                  {/* Op desktop klapt de omschrijving van een gesloten paneel
                      helemaal dicht, zodat alle titels op dezelfde hoogte staan
                      en alleen het open paneel zijn tekst omhoog duwt. */}
                  <p
                    className={`max-w-sm overflow-hidden text-sm leading-relaxed text-white/75 transition-all duration-500 ease-out ${
                      isActive
                        ? "mt-2 translate-y-0 opacity-100 lg:h-auto"
                        : "mt-2 opacity-100 lg:mt-0 lg:h-0 lg:translate-y-2 lg:opacity-0"
                    }`}
                  >
                    {s.items[key].desc}
                  </p>
                </div>

                {/* Alleen op desktop: een streepje dat markeert welk paneel open staat. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 hidden h-[3px] origin-left bg-accent-bright transition-transform duration-500 ease-out lg:block ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
