import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ChatCircleDots,
  PencilRuler,
  Code,
  RocketLaunch,
} from "@phosphor-icons/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

const ICONS = [ChatCircleDots, PencilRuler, Code, RocketLaunch];

function useIsMobile() {
  const [is, setIs] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const h = (e) => setIs(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return is;
}

export default function Process() {
  const { t } = useLanguage();
  const pr = t.process;
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const stepsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const op1 = useTransform(scrollYProgress, [0.28, 0.45], [0.2, 1]);
  const op2 = useTransform(scrollYProgress, [0.48, 0.65], [0.2, 1]);
  const op3 = useTransform(scrollYProgress, [0.66, 0.82], [0.2, 1]);
  const mobileOpacities = [undefined, op1, op2, op3];

  const lineTransition = { duration: 0.5, ease: [0.23, 1, 0.32, 1] };

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
          ref={stepsRef}
          variants={isMobile ? undefined : staggerContainer}
          initial={isMobile ? undefined : "hidden"}
          whileInView={isMobile ? undefined : "show"}
          viewport={isMobile ? undefined : vpOnce}
          className="relative mt-12 lg:mt-16"
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

          {/* Desktop: whileInView horizontal line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-7 right-7 top-7 h-px bg-white/10"
          >
            <motion.span
              className="absolute inset-0 origin-left bg-accent-bright/40"
              initial={reduceMotion ? undefined : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={vpOnce}
              transition={lineTransition}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {pr.steps.map((step, i) => {
              const Icon = ICONS[i];
              const mobileOp = isMobile && !reduceMotion ? mobileOpacities[i] : undefined;
              return (
                <motion.li
                  key={step.title}
                  variants={isMobile ? undefined : fadeUp}
                  style={mobileOp ? { opacity: mobileOp } : undefined}
                  className="flex gap-5 md:flex-col md:items-center md:gap-0"
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
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
