import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function Process() {
  const { t } = useLanguage();
  const pr = t.process;
  const reduceMotion = useReducedMotion();
  const stepsRef = useRef(null);

  // Eén scroll-progress drijft beide lijnen aan: verticaal (mobiel, scaleY) en
  // horizontaal (desktop, scaleX). GPU-composited transform, geen per-frame
  // repaint — de stappen zelf faden één keer in met een whileInView-stagger.
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="aanpak" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {pr.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/70">
            {pr.subheading}
          </p>
        </motion.div>

        <motion.div
          key={pr.heading}
          ref={stepsRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="relative mt-12 lg:mt-16"
        >
          {/* Mobiel: scroll-gedreven verticale lijn door de cirkels */}
          <div
            aria-hidden="true"
            className="block md:hidden absolute left-[27px] top-3 bottom-3 w-px bg-white/10"
          >
            {reduceMotion ? (
              <span className="absolute inset-0 bg-accent-bright/40" />
            ) : (
              <motion.span
                className="absolute inset-0 origin-top bg-accent-bright/40"
                style={{ scaleY: lineScale }}
              />
            )}
          </div>

          {/* Desktop: dezelfde scroll-gedreven lijn, horizontaal door de cirkels */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-7 right-7 top-7 h-px bg-white/10"
          >
            {reduceMotion ? (
              <span className="absolute inset-0 bg-accent-bright/40" />
            ) : (
              <motion.span
                className="absolute inset-0 origin-left bg-accent-bright/40"
                style={{ scaleX: lineScale }}
              />
            )}
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {pr.steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="group flex gap-5 md:flex-col md:gap-0"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-panel transition-colors duration-200 group-hover:border-accent-bright/40">
                  <span
                    aria-hidden="true"
                    className="font-heading text-xl font-bold tabular-nums text-accent-bright"
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="md:mt-5">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                    <span className="sr-only">{`${i + 1}. `}</span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
