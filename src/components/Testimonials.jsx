import { motion } from "motion/react";
import { testimonials } from "../data/testimonials";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Testimonials() {
  return (
    <section className="bg-bg py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl"
        >
          Wat klanten over ons zeggen
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:mt-16"
        >
          {testimonials.map((item) => (
            <motion.figure
              key={item.name}
              variants={fadeUp}
              className="border-l-2 border-line pl-6"
            >
              <blockquote className="font-heading text-xl font-medium leading-snug tracking-tight text-ink text-balance sm:text-2xl">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4">
                <span className="block font-medium text-ink">{item.name}</span>
                <span className="block text-sm text-ink-soft">{item.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
