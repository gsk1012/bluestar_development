import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Subtiel blauw radiaal licht, geen mesh-blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 20%, rgba(11,95,216,0.10), rgba(11,95,216,0) 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-24 lg:grid-cols-[55fr_45fr] lg:gap-10 lg:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-medium leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl"
          >
            Websites die je bedrijf laten{" "}
            <span className="font-bold">groeien</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Snelle, vindbare websites en webshops op maat, gebouwd rond jouw merk
            en je klanten.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
            >
              Plan een gesprek
            </a>
            <a
              href="#portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent active:scale-[0.97]"
            >
              Bekijk ons werk
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 6, ease: "easeInOut", repeat: Infinity }
            }
            className="overflow-hidden rounded-rlg border border-line bg-bg shadow-xl shadow-accent/10"
          >
            {/* Browser-frame topbar */}
            <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            <img
              src="/work/prince-schilder.png"
              alt="Voorbeeld van een door BlueStar gebouwde website voor Prince Schilder"
              className="block w-full"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
