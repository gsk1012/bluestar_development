import { useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import HeroWordRotator from "./HeroWordRotator";
import Skyline from "./Skyline";

/**
 * Het eerste scherm: een indigo avondlucht boven een grachtengevelrij waarin
 * de ramen één voor één aangaan. De kop staat gecentreerd in de lucht.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <svg className="hero__star" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
        />
      </svg>

      <div className="hero__content wrap">
        <h1 id="hero-title" className="hero__title mx-auto max-w-4xl">
          <span className="block font-bold">{h.line1}</span>
          <span className="block">{h.line2}</span>
          {/* De clip houdt het wisselende woord binnen zijn eigen regel. */}
          <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            {h.line3prefix}
            <HeroWordRotator words={h.line3words} reduce={reduce} />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[44rem] text-lg leading-normal text-white/90">
          {h.sub1} {h.sub2}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn btn-light btn-large max-[480px]:w-full">
            {h.cta}
          </a>
          <a
            href="#portfolio"
            className="btn btn-large border border-white/60 text-white hover:border-white hover:bg-white/10 max-[480px]:w-full"
          >
            {h.secondary}
          </a>
        </div>
      </div>

      <Skyline />
    </section>
  );
}
