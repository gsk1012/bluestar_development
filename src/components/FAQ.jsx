import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, CheckCircle, Star } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

function FAQItem({ item, index, open, onToggle }) {
  return (
    <motion.div variants={fadeUp} className="border-b border-white/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-white sm:text-lg">
          {item.question}
        </span>
        <span className="shrink-0 text-accent-bright">
          {open ? <Minus size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/60 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IncludedCard({ card }) {
  return (
    <div className="relative overflow-hidden rounded-rlg border border-white/10 bg-white/5 p-8">
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-bright/30 bg-accent/10">
            <Star size={20} weight="fill" className="text-accent-bright" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {card.eyebrow}
          </p>
        </div>

        <h3 className="mt-5 font-heading text-xl font-bold leading-snug text-white">
          {card.heading}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {card.body}
        </p>

        <ul className="mt-7 flex flex-col gap-3.5">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={18}
                weight="fill"
                className="mt-0.5 shrink-0 text-accent-bright"
              />
              <span className="text-sm leading-relaxed text-white/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const faq = t.faq;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">

          {/* Left: heading + accordion */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vpOnce}
            >
              <h2 className="font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
                {faq.heading}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-white/60">
                {faq.subheading}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={vpOnce}
              className="mt-10"
            >
              {faq.items.map((item, i) => (
                <FAQItem
                  key={item.question}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>

          {/* Right: sticky included-card */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vpOnce}
            >
              <IncludedCard card={faq.includedCard} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
