import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

// useLayoutEffect waarschuwt tijdens de prerender; op de server is er niets te meten.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Opent en sluit met een hoogte in pixels via de Web Animations API. Een
 * transitie op grid-template-rows laat Safari elke frame de grid opnieuw
 * uitrekenen, wat op iPhone merkbaar hapert; een px-hoogte is goedkope
 * block-layout. Na afloop staat de hoogte weer op auto, dus herschalen en
 * taalwissel blijven kloppen.
 */
function useCollapse(ref, open) {
  const mounted = useRef(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!el.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const full = `${el.scrollHeight}px`;
    el.animate(
      { height: open ? ["0px", full] : [full, "0px"], opacity: open ? [0, 1] : [1, 0] },
      { duration: open ? 280 : 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }, [open]);
}

function FAQItem({ item, index, open, onToggle }) {
  const panelRef = useRef(null);
  useCollapse(panelRef, open);

  return (
    <div
      // Altijd een wit vlak, ook dicht: op een bone sectie (dienstpagina's)
      // zouden de gesloten vragen anders grijs ogen.
      className={`rounded-card border bg-ground transition-colors duration-200 ${
        open ? "border-line-strong" : "border-line hover:border-line-strong"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-card px-6 py-5 text-left text-[1.0625rem] font-semibold sm:px-7"
        >
          {item.question}
          <CaretDown
            size={20}
            aria-hidden="true"
            className={`shrink-0 text-brand transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      <div
        ref={panelRef}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="overflow-hidden"
        style={{ height: open ? "auto" : 0 }}
      >
        <p className="max-w-[60ch] px-6 pb-6 text-ink-soft sm:px-7">{item.answer}</p>
      </div>
    </div>
  );
}

/**
 * Zonder props de algemene FAQ van de homepage; een dienstpagina geeft eigen
 * `heading` en `items` mee (de rest valt terug op i18n).
 */
export default function FAQ({ heading, subheading, items }) {
  const { t } = useLanguage();
  const faq = { ...t.faq, ...(heading && { heading }), ...(subheading && { subheading }), ...(items && { items }) };
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* De vraag blijft in beeld terwijl de antwoorden langslopen. */}
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          <Heading parts={faq.heading} />
          <p className="lead mt-4">{faq.subheading}</p>
          <p className="mt-6 text-ink-soft">
            {faq.notFound}{" "}
            <a href="#contact" className="text-link">
              {faq.notFoundLink}
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
