import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ChatCircleDots,
  PencilRuler,
  Code,
  RocketLaunch,
} from "@phosphor-icons/react";
import { useReveal } from "../lib/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

const ICONS = [ChatCircleDots, PencilRuler, Code, RocketLaunch];

export default function Process() {
  const { t } = useLanguage();
  const pr = t.process;
  const reduceMotion = useReducedMotion();

  // Scroll-driven vertical line (mobile) — must stay on a motion element.
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // CSS reveal for heading and steps container.
  const [headingRef, headingVisible] = useReveal({ threshold: 0.3 });

  // Merge stepsRef + reveal into one callback ref.
  const [stepsVisible, setStepsVisible] = useState(false);
  const stepsCallbackRef = (el) => {
    stepsRef.current = el;
    if (!el || stepsVisible) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStepsVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
  };

  return (
    <section id="aanpak" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={headingRef}
          className={`reveal max-w-2xl${headingVisible ? ' in-view' : ''}`}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {pr.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/70">
            {pr.subheading}
          </p>
        </div>

        <div
          ref={stepsCallbackRef}
          className={`reveal-group relative mt-12 lg:mt-16${stepsVisible ? ' in-view' : ''}`}
        >
          {/* Mobile: scroll-driven vertical line */}
          <div
            aria-hidden="true"
            className="block md:hidden absolute left-[27px] top-3 bottom-3 w-px bg-white/10"
          >
            {reduceMotion ? (
              <span className="absolute inset-0 bg-accent-bright/40" />
            ) : (
              <motion.span
                className="absolute inset-0 origin-top bg-accent-bright/40"
                style={{ scaleY: lineScaleY }}
              />
            )}
          </div>

          {/* Desktop: CSS reveal horizontal line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-7 right-7 top-7 h-px bg-white/10"
          >
            <span className="reveal-line absolute inset-0 origin-left bg-accent-bright/40" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {pr.steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <li
                  key={step.title}
                  className="reveal-item flex gap-5 md:flex-col md:items-center md:gap-0"
                  style={{ '--i': i }}
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-panel">
                    <Icon size={26} weight="duotone" className="text-accent-bright" />
                  </div>
                  <div className="md:mt-5 md:text-center">
                    <p className="font-heading text-2xl font-bold tabular-nums text-accent-bright">
                      {i + 1}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/70 md:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
