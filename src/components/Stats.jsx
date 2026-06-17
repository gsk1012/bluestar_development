"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { fadeUp, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

const RAW_STATS = [
  { to: 100,  makeFormat: ()    => (v) => `${Math.round(v)}/100` },
  { to: 0.9,  makeFormat: (sep) => (v) => `${v.toFixed(1).replace(".", sep)}s` },
  { to: 100,  makeFormat: ()    => (v) => `${Math.round(v)}%` },
];

function Counter({ to, format, duration = 1.6, delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const count = useMotionValue(0);
  const display = useTransform(count, format);

  useEffect(() => {
    if (reduce || !isInView) return;
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, reduce, to, duration, delay, count]);

  if (reduce) {
    return <span ref={ref}>{format(to)}</span>;
  }

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  const { t } = useLanguage();
  const s = t.stats;

  return (
    <section id="cijfers" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: headline + body */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vpOnce}
            className="lg:col-span-5"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              {s.heading}
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/65">
              {s.body}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-bright active:scale-[0.98]"
            >
              {s.cta}
            </a>
          </motion.div>

          {/* Right: animated stat rows */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vpOnce}
            className="lg:col-span-7"
          >
            {s.items.map((item, i) => {
              const raw = RAW_STATS[i];
              const fmt = raw.makeFormat(s.decimalSep);
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-between gap-6 py-7 ${
                    i < s.items.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <p
                    className="font-heading text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl"
                    aria-label={`${item.label}: ${fmt(raw.to)}`}
                  >
                    <Counter
                      to={raw.to}
                      format={fmt}
                      duration={1.6}
                      delay={i * 0.12}
                    />
                  </p>

                  <div className="text-right">
                    <p className="font-heading text-base font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-white/45">{item.context}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
