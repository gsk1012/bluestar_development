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
import { fadeUp } from "../lib/motion";

const stats = [
  {
    to: 100,
    format: (v) => `${Math.round(v)}/100`,
    label: "Prestatiescore",
    context: "Google Lighthouse, maximale score",
  },
  {
    to: 0.9,
    format: (v) => `${v.toFixed(1).replace(".", ",")}s`,
    label: "Gemiddelde laadtijd",
    context: "vs. gemiddeld 4,2 seconden",
  },
  {
    to: 100,
    format: (v) => `${Math.round(v)}%`,
    label: "Responsive op mobiel",
    context: "op elk scherm en apparaat",
  },
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
  return (
    <section id="cijfers" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: headline + body */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Snelheid die je merkt en Google waardeert
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/65">
              Een snelle site houdt bezoekers vast en scoort beter in
              zoekresultaten. Onze sites laden gemiddeld in 0,9 seconden.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-bright active:scale-[0.98]"
            >
              Plan een gesprek
            </a>
          </motion.div>

          {/* Right: animated stat rows */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center justify-between gap-6 py-7 ${
                  i < stats.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Display number */}
                <p
                  className="font-heading text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl"
                  aria-label={`${stat.label}: ${stat.format(stat.to)}`}
                >
                  <Counter
                    to={stat.to}
                    format={stat.format}
                    duration={1.6}
                    delay={i * 0.12}
                  />
                </p>

                {/* Label + context */}
                <div className="text-right">
                  <p className="font-heading text-base font-semibold text-white">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-sm text-white/45">{stat.context}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
