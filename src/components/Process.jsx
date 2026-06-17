import { motion, useReducedMotion } from "motion/react";
import {
  ChatCircleDots,
  PencilRuler,
  Code,
  RocketLaunch,
} from "@phosphor-icons/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";

const steps = [
  {
    number: "1",
    title: "Kennismaking",
    description: "We bespreken je doelen, merk en wat je klanten nodig hebben.",
    icon: ChatCircleDots,
  },
  {
    number: "2",
    title: "Ontwerp",
    description: "Een helder ontwerp dat past bij je merk en je bezoekers stuurt.",
    icon: PencilRuler,
  },
  {
    number: "3",
    title: "Bouw",
    description: "We bouwen een snelle, vindbare site die op elk scherm werkt.",
    icon: Code,
  },
  {
    number: "4",
    title: "Lancering en onderhoud",
    description: "Live zetten en daarna blijven we zorgen voor updates en support.",
    icon: RocketLaunch,
  },
];

export default function Process() {
  const reduceMotion = useReducedMotion();
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
            Zo werken we
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/70">
            Van eerste gesprek tot een live website. Een duidelijk traject in
            vier stappen, zonder verrassingen.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="relative mt-12 lg:mt-16"
        >
          {/* Verbindingslijn: verticaal mobiel, horizontaal desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-3 bottom-3 w-px bg-white/10 md:left-7 md:right-7 md:top-7 md:bottom-auto md:h-px md:w-auto"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-accent-bright/40 md:origin-left"
              initial={
                reduceMotion
                  ? { scaleX: 1, scaleY: 1 }
                  : { scaleX: 0, scaleY: 0 }
              }
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={vpOnce}
              transition={reduceMotion ? { duration: 0 } : lineTransition}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="flex gap-5 md:flex-col md:items-center md:gap-0"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon size={26} weight="duotone" className="text-accent-bright" />
                  </div>
                  <div className="md:mt-5 md:text-center">
                    <p className="font-heading text-2xl font-bold tabular-nums text-accent-bright">
                      {step.number}
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
