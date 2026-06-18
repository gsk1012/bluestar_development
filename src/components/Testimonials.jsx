"use client";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

// Portretfoto's — geoptimaliseerd (resized + WebP), lokaal geserveerd.
// Klein weergegeven als avatar; de quote zelf is de hoofdrol.
// 2.webp: Gurdeep Singh — gurpreet.webp: Gurpreet Singh
// (foto's ter illustratie — personen op foto zijn niet de opdrachtgevers)
const PHOTOS = [
  "/testimonials/2.webp",
  "/testimonials/gurpreet.webp",
];

// Eén glazen "spotlight"-paneel per testimonial. De woorden staan centraal,
// een grote accent-aanhalingsteken vult de hoek en een radiale gloed volgt de
// cursor (motion values — geen re-render, geen scroll-listeners). De kaarten
// zijn even hoog en de naamregel staat onderaan, zodat er geen lege gaten
// ontstaan met maar twee testimonials.
function QuoteCard({ item, photo, className = "" }) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(440px circle at ${mx}px ${my}px, rgba(59,158,255,0.16), transparent 72%)`;

  function handleMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }
  function handleLeave() {
    mx.set(-400);
    my.set(-400);
  }

  return (
    <motion.figure
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-rlg bg-gradient-to-br from-white/[0.07] to-white/[0.015] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 transition-shadow duration-300 hover:ring-accent-bright/30 lg:p-10 ${className}`}
    >
      {/* cursorvolgende gloed — verschijnt op hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* groot decoratief aanhalingsteken in de hoek */}
      <Quotes
        aria-hidden="true"
        weight="fill"
        size={132}
        className="pointer-events-none absolute -right-4 -top-5 text-accent-bright/[0.09] transition-colors duration-300 group-hover:text-accent-bright/20"
      />

      <blockquote className="relative font-heading text-lg font-medium leading-[1.5] text-white text-balance lg:text-[1.35rem]">
        {item.quote}
      </blockquote>

      <figcaption className="relative mt-auto flex items-center gap-4 pt-8">
        <img
          src={photo}
          alt={`Portret van ${item.name}`}
          loading="lazy"
          decoding="async"
          className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-white/15"
        />
        <div className="min-w-0">
          <span className="block font-heading text-sm font-bold text-white">
            {item.name}
          </span>
          <span className="block text-xs text-white/55">{item.role}</span>
          {item.photoNote && (
            <span className="mt-1 block text-[10px] italic leading-tight text-white/30">
              {item.photoNote}
            </span>
          )}
        </div>
      </figcaption>
    </motion.figure>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const te = t.testimonials;

  return (
    <section id="reviews" className="relative isolate overflow-hidden py-16 lg:py-24">
      {/* ambient gloed — gebakken gradient, geen blur-filter. Gemaskeerd zodat de
          gloed naar 0 vervaagt op de boven- en onderrand van de sectie; anders
          ontstaat er een zichtbare naad (schijnbare rand) met de sectie erboven. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50vh 50vh at 80% 40%, rgba(11,95,216,0.13), transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        {/* groot, zacht aanhalingsteken-motief — balanceert de titel en vult de
            rechterbovenhoek. Bewust heel licht, puur decoratief. */}
        <Quotes
          aria-hidden="true"
          weight="fill"
          size={320}
          className="pointer-events-none absolute -right-4 top-0 z-0 hidden text-accent-bright/[0.08] lg:block"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="relative z-10 max-w-xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {te.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            {te.subheading}
          </p>
        </motion.div>

        {/* Twee even hoge quote-panelen, naast elkaar — vullen de rij als paar. */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="relative z-10 mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:mt-14 lg:grid-cols-2 lg:items-start"
        >
          {te.items.map((item, i) => (
            <QuoteCard
              key={item.name}
              item={item}
              photo={PHOTOS[i]}
              className={i === 1 ? "lg:mt-16" : ""}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
