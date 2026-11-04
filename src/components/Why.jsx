import { Check } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";
import Laptop from "./Laptop";

/**
 * "Waarom BlueStar?": links opgeleverd werk in een MacBook als bewijs, rechts
 * de belofte en de vier vaste afspraken als vinklijst.
 */
export default function Why() {
  const { t } = useLanguage();
  const w = t.why;

  return (
    <section id="waarom" className="section">
      <div className="wrap grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
        <figure>
          <Laptop src="/work/prince-schilder.webp" fullSrc="/work/prince-schilder-full.webp" alt={w.imageAlt} />
          <figcaption className="mt-5 text-[0.9375rem] lg:text-center text-ink-soft">{w.imageCaption}</figcaption>
        </figure>

        <div>
          <Heading parts={w.heading} />
          <p className="lead mt-5">{w.body}</p>

          <ul className="register mt-8">
            {w.facts.map((fact) => (
              <li key={fact.label} className="flex items-center gap-3 py-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check size={14} weight="bold" aria-hidden="true" />
                </span>
                <span>
                  <strong className="tabular font-bold">{fact.value}</strong> {fact.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
