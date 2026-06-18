"use client";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

// Portretfoto's — geoptimaliseerd (resized + WebP), lokaal geserveerd.
// Oorspronkelijk 3,4–4,5 MB PNG's per stuk; nu < 25 KB elk.
const PHOTOS = [
  "/testimonials/1.webp",
  "/testimonials/2.webp",
  "/testimonials/3.webp",
];

function TestimonialCard({ item, photo }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      variants={fadeUp}
      className="group relative aspect-[3/4] overflow-hidden rounded-rmd"
    >
      <img
        src={photo}
        alt={`Portret van ${item.name}`}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-top ${
          reduce ? "" : "transition-transform duration-700 group-hover:scale-[1.04]"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/65 to-night/5" />
      <div className="absolute inset-0 rounded-rmd ring-1 ring-white/10 transition-all duration-300 group-hover:ring-accent-bright/25" />

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <blockquote className="font-heading text-base font-medium leading-snug text-white text-balance lg:text-[1.05rem]">
          {item.quote}
        </blockquote>
        <figcaption className="mt-4">
          <span className="block font-heading text-sm font-bold text-white">
            {item.name}
          </span>
          <span className="mt-0.5 block text-xs text-white/50">{item.role}</span>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const te = t.testimonials;

  return (
    <section id="reviews" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="max-w-xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {te.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            {te.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5"
        >
          {te.items.map((item, i) => (
            <TestimonialCard key={item.name} item={item} photo={PHOTOS[i]} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
