import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

function FAQItem({ item, index, open, onToggle }) {
  return (
    <div
      className={`rounded-card border transition-colors duration-200 ${
        open ? "border-line-strong bg-ground" : "border-line hover:border-line-strong"
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

      {/* Grid-truc: animeert de hoogte zonder JS-meting. */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[60ch] px-6 pb-6 text-ink-soft sm:px-7">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const faq = t.faq;
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
