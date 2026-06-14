import { motion } from "motion/react";
import {
  Browser,
  ShoppingCart,
  Code,
  Wrench,
  CloudArrowUp,
} from "@phosphor-icons/react";
import { services } from "../data/services";
import { fadeUp, staggerContainer } from "../lib/motion";

const iconMap = {
  Browser,
  ShoppingCart,
  Code,
  Wrench,
  CloudArrowUp,
};

// Bento-plaatsing: eerste cel groot (2x2), de rest klein.
const cellClasses = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "",
];

export default function Services() {
  return (
    <section
      id="diensten"
      className="relative isolate overflow-hidden bg-night py-16 lg:py-24"
    >
      {/* Subtiele blauwe gloed achter de inhoud */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[10%] -z-10 h-[40vh] w-[40vh] rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Alles voor je online aanwezigheid
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/70">
            Van een eerste bedrijfssite tot maatwerk software, met onderhoud en
            hosting die je werk uit handen nemen.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Browser;
            const isFeature = i === 0;

            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className={`flex flex-col rounded-rmd p-6 transition-colors duration-150 ${cellClasses[i]} ${
                  isFeature
                    ? "bg-accent text-white"
                    : "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                <Icon
                  size={isFeature ? 56 : 32}
                  weight="duotone"
                  className={isFeature ? "text-white" : "text-accent-bright"}
                />
                <h3
                  className={`font-heading font-bold tracking-tight ${
                    isFeature ? "mt-auto pt-6 text-2xl" : "mt-4 text-lg"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed ${
                    isFeature ? "max-w-sm text-white/85" : "text-sm text-white/70"
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
