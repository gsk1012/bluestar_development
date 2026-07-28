import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import HeroWordRotator from "./HeroWordRotator";
import HeroScene from "./HeroScene";

// 20 stars total. First 10 show on all screens, last 10 are desktop-only
// (hidden sm:block). Mobile gets 10 to avoid competing with text animation GPU layers.
const SHOOTING_STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left:     `${(15 + Math.random() * 90).toFixed(2)}%`,
  top:      `${(Math.random() * 72).toFixed(2)}%`,
  tailLen:  (Math.random() * 55 + 22).toFixed(0),
  height:   (Math.random() * 0.5 + 0.9).toFixed(2),
  duration: (Math.random() * 7 + 5.5).toFixed(1),
  delay:    (Math.random() * 36).toFixed(1),
  desktopOnly: i >= 10,
}));

function ShootingStars({ reduce }) {
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {SHOOTING_STARS.map(s => (
        <span
          key={s.id}
          className={s.desktopOnly ? "absolute hidden sm:block" : "absolute"}
          style={{
            left:       s.left,
            top:        s.top,
            width:      `${s.tailLen}px`,
            height:     `${s.height}px`,
            // Muted cool-white gradient: transparent tail (left) → faint head (right).
            // After rotate(135deg) the bright end points toward bottom-left (direction of travel).
            // No box-shadow — keep it strictly background texture.
            background: 'linear-gradient(to right, transparent 0%, rgba(160,205,255,0.3) 55%, rgba(235,245,255,0.8) 100%)',
            // star-move uses ease-in-out (gradual arc); star-fade has its own linear curve.
            // `backwards` fill-mode applies the 0% keyframe (opacity: 0) during the delay,
            // preventing stars from being visible before their animation starts on load.
            animation:  `star-move ${s.duration}s ease-in-out ${s.delay}s infinite backwards, star-fade ${s.duration}s linear ${s.delay}s infinite backwards`,
          }}
        />
      ))}
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1];

// Sub-content (paragraphs + CTA) — staggered fade-up after the headline lands.
const subContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.42 } },
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="home"
      className="relative h-[100svh] overflow-hidden text-white"
    >
      {/* Isometric scene, bleeding off the right edge. It is transparent SVG
          rather than a filled image, so it needs none of the scrims the star
          video did to keep the headline legible over it. */}
      <HeroScene />

      {/* Shooting star particles */}
      <ShootingStars reduce={reduce} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 pt-20 sm:justify-center sm:px-8 lg:pb-20 lg:pt-24 [@media(orientation:landscape)_and_(max-height:600px)]:justify-end [@media(orientation:landscape)_and_(max-height:600px)]:pt-16 [@media(orientation:landscape)_and_(max-height:600px)]:pb-5">
        {/* CSS keyframe reveal — runs on the compositor thread, never blocked by JS.
            `backwards` fill-mode keeps each line below the clip until its delay fires. */}
        <h1 className="font-heading font-bold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,6.1vw,5.75rem)] lg:max-w-[58%] [@media(orientation:landscape)_and_(max-height:600px)]:text-[clamp(1.5rem,4vw,2rem)]">
          {[
            { node: h.line1, accent: false },
            { node: h.line2, accent: false },
            {
              node: (
                <>
                  {h.line3prefix}
                  <HeroWordRotator words={h.line3words} reduce={reduce} />
                </>
              ),
              accent: true,
            },
          ].map(({ node, accent }, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span
                className={`block hero-line${accent ? " text-accent-bright" : ""}${reduce ? " [animation:none]" : ""}`}
                style={{ animationDelay: `${i * 0.11}s` }}
              >
                {node}
              </span>
            </span>
          ))}
        </h1>

        <motion.div
          variants={subContainer}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-xl lg:mt-12 [@media(orientation:landscape)_and_(max-height:600px)]:mt-3"
        >
          <motion.p
            variants={fade}
            className="text-base font-medium leading-snug text-white sm:text-lg"
          >
            {h.sub1}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-2 max-w-md text-sm leading-relaxed text-white/60 sm:text-base [@media(orientation:landscape)_and_(max-height:600px)]:hidden"
          >
            {h.sub2}
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-7 flex flex-wrap items-center gap-4 [@media(orientation:landscape)_and_(max-height:600px)]:mt-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
            >
              {h.cta}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                <ArrowRight size={18} weight="bold" />
              </span>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 active:scale-[0.97]"
            >
              {h.secondary}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
