import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

/**
 * Vier stappen naast elkaar. Als de rij in beeld komt tekenen de terracotta
 * bovenlijnen zich één voor één, van links naar rechts: de volgorde van het
 * traject, in beweging gezet.
 */
export default function Process() {
  const { t } = useLanguage();
  const pr = t.process;
  const panelRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="aanpak" className="section">
      <div className="wrap">
        <div className="max-w-[54rem]">
          <Heading parts={pr.heading} />
          <p className="lead mt-4">{pr.subheading}</p>
        </div>

        <ol
          ref={panelRef}
          className={`mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 ${
            inView ? "is-inview" : ""
          }`}
        >
          {pr.steps.map((step, i) => (
            <li key={step.title} className="relative pt-6">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-line" />
              <span
                aria-hidden="true"
                style={{ "--i": i }}
                className="step-line absolute inset-x-0 top-0 h-[3px] bg-accent"
              />
              {/* De <ol> leest de volgorde al voor; het nummer is voor het oog. */}
              <p aria-hidden="true" className="tabular text-[0.9375rem] font-semibold text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl text-brand">{step.title}</h3>
              <p className="mt-2 text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
