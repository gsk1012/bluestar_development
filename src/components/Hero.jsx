import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const ease = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function FloatingTag({ children, className, delay, reduce }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
      transition={
        reduce
          ? { duration: 0.4 }
          : { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
      }
      className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 backdrop-blur lg:flex ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink px-6 text-white"
    >
      {/* Background glow layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden="true"
          animate={reduce ? {} : { opacity: [0.55, 0.8, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-10%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full bg-accent/40 blur-[120px]"
        />
        <motion.div
          aria-hidden="true"
          animate={reduce ? {} : { opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-15%] left-[5%] h-[45vh] w-[45vh] rounded-full bg-accent-bright/25 blur-[130px]"
        />
        <motion.div
          aria-hidden="true"
          animate={reduce ? {} : { opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-[2%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-accent/30 blur-[130px]"
        />
        {/* Faint grid, masked toward the edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* Bottom fade into the next (light) section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* Floating tags */}
      <FloatingTag className="left-[6%] top-[34%]" delay={0} reduce={reduce}>
        Websites op maat
      </FloatingTag>
      <FloatingTag className="right-[6%] top-[58%]" delay={1.5} reduce={reduce}>
        Webshops
      </FloatingTag>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.h1
          variants={item}
          className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Websites die je bedrijf{" "}
          <span className="text-accent-bright">laten groeien</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Snelle, vindbare websites en webshops op maat, gebouwd rond jouw merk
          en je klanten.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
          >
            Plan een gesprek
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              <ArrowRight size={18} weight="bold" />
            </span>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 active:scale-[0.97]"
          >
            Bekijk ons werk
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
