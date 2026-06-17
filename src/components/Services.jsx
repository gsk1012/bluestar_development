"use client";
import { motion, useReducedMotion } from "motion/react";
import { Browser, ShoppingCart, Code, Wrench, CloudArrowUp } from "@phosphor-icons/react";
import { staggerContainer } from "../lib/motion";

const IMG_WEBSITE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260616_220438_0522ab34-3f31-4dbd-8d62-0666d8ddba63.png";
const IMG_WEBSHOP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260616_220440_ccdd52aa-a965-431b-a9f0-45e872d6576b.png";
const IMG_WEBAPP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260616_220444_d299d33b-bdbd-4083-acb5-7234e6b3858f.png";
const IMG_ONDERHOUD =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260616_220815_e88b9c0a-a5c6-47a8-82ea-6fd853de4efc.png";
const IMG_HOSTING =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260616_220812_7d92b2fb-51d8-4556-a35a-77529d06f622.png";

const tileVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function ImageTile({ img, title, desc, icon: Icon, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={tileVariant}
      className={`group relative overflow-hidden rounded-rmd ${className}`}
    >
      <img
        src={img}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover opacity-55 ${
          reduce ? "" : "transition-transform duration-700 group-hover:scale-105"
        }`}
      />
      {/* gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
      {/* subtle top-left corner glow on hover */}
      <div className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-accent-bright/0 blur-3xl transition-all duration-500 group-hover:bg-accent-bright/20" />
      {/* ring */}
      <div className="absolute inset-0 rounded-rmd ring-1 ring-white/10 transition-all duration-300 group-hover:ring-accent-bright/30" />
      {/* content */}
      <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
        <Icon
          size={26}
          weight="duotone"
          className="mb-3 text-accent-bright transition-colors duration-300 group-hover:text-white"
        />
        <h3 className="font-heading text-xl font-bold tracking-tight text-white lg:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/55">{desc}</p>
      </div>
    </motion.div>
  );
}


export default function Services() {
  return (
    <section id="diensten" className="relative isolate overflow-hidden py-16 lg:py-24">
      {/* ambient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[10%] -z-10 h-[35vh] w-[35vh] rounded-full bg-accent/15 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          variants={tileVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-10 max-w-xl lg:mb-12"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Alles voor je online aanwezigheid
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            Van een eerste bedrijfssite tot maatwerk software, met onderhoud en hosting die je
            werk uit handen nemen.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[320px_220px] lg:gap-4"
        >
          {/* Hero tile: Website op maat — 2 cols wide */}
          <ImageTile
            img={IMG_WEBSITE}
            title="Website op maat"
            desc="Een snelle, vindbare bedrijfswebsite die past bij jouw merk en op elk scherm scherp blijft."
            icon={Browser}
            className="min-h-[260px] sm:col-span-2 md:col-span-2"
          />

          {/* Webshop */}
          <ImageTile
            img={IMG_WEBSHOP}
            title="Webshop"
            desc="Een complete online winkel met productbeheer, veilige betalingen en een soepel afrekenproces."
            icon={ShoppingCart}
            className="min-h-[260px] sm:col-span-1 md:col-span-1"
          />

          {/* Web-applicatie */}
          <ImageTile
            img={IMG_WEBAPP}
            title="Web-applicatie"
            desc="Maatwerk software in de browser, van klantportaal tot planningstool, gebouwd rond jouw proces."
            icon={Code}
            className="min-h-[220px] sm:col-span-1 md:col-span-1"
          />

          {/* Onderhoud & support */}
          <ImageTile
            img={IMG_ONDERHOUD}
            title="Onderhoud & support"
            desc="Updates, back-ups en snelle hulp bij vragen, zodat je site veilig en actueel blijft draaien."
            icon={Wrench}
            className="min-h-[220px] sm:col-span-1 md:col-span-1"
          />

          {/* Hosting */}
          <ImageTile
            img={IMG_HOSTING}
            title="Hosting"
            desc="Betrouwbare hosting met SSL en dagelijkse back-ups, zodat je site altijd snel bereikbaar is."
            icon={CloudArrowUp}
            className="min-h-[220px] sm:col-span-2 md:col-span-1"
          />
        </motion.div>
      </div>
    </section>
  );
}
