import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";

// Generated once at module level — stable across re-renders.
// Stars are intentionally dim: they live in the background layer, not on top.
// Two animations per star: ease-in-out movement + independent linear opacity curve.
const SHOOTING_STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left:     `${(15 + Math.random() * 90).toFixed(2)}%`,
  top:      `${(Math.random() * 72).toFixed(2)}%`,
  tailLen:  (Math.random() * 55 + 22).toFixed(0),   // 22–77 px — short keeps them subtle
  height:   (Math.random() * 0.5 + 0.9).toFixed(2), // 0.9–1.4 px hairline stroke
  duration: (Math.random() * 7 + 5.5).toFixed(1),   // 5.5–12.5 s per streak
  delay:    (Math.random() * 36).toFixed(1),          // stagger across 36 s
}));

function ShootingStars({ reduce }) {
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {SHOOTING_STARS.map(s => (
        <span
          key={s.id}
          // Keep only the first 8 below md — fewer infinite animations so the
          // hamburger menu has GPU/CPU headroom to open smoothly on phones.
          className={`absolute${s.id >= 8 ? " max-md:hidden" : ""}`}
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

const ease = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const lineUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Static star image — used for reduced-motion AND on mobile (<768px), where the
// blended/masked video is too expensive for phone GPUs and starves the menu.
function StaticStar({ className = "" }) {
  return (
    <picture>
      <source srcSet="/star.avif" type="image/avif" />
      <img
        src="/star.webp"
        alt="BlueStar kristallen ster"
        className={`relative z-[2] h-full w-full object-contain ${className}`}
      />
    </picture>
  );
}

function StarVisual({ reduce }) {
  // Feather the navy backdrop and the video together. In the outer margin the
  // video is pure black (no star), so fading both there lets the real page show
  // through — no hard rectangle edge and no black creeping back in.
  const starMask =
    "radial-gradient(closest-side at 50% 48%, #000 56%, transparent 96%)";
  return (
    <div className="absolute left-1/2 top-0 z-0 aspect-square w-[min(130vw,680px)] -translate-x-1/2 translate-y-[8%] sm:left-auto sm:right-0 sm:w-[min(100vw,680px)] sm:translate-x-[12%] sm:-translate-y-[3%] lg:w-[min(62vw,920px)] lg:translate-x-[15%] lg:translate-y-[0%]">
      <motion.div
        style={{ transformOrigin: "92% 4%" }}
        animate={reduce
          ? { opacity: 1 }
          : { scale: [0.04, 1], opacity: [0, 1] }
        }
        transition={{
          duration: 2.0,
          ease: [0.14, 0.8, 0.28, 1],
        }}
        className="relative h-full w-full"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
          className="relative h-full w-full"
        >
          {/* Glow halo behind the star */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[14%] z-[1] rounded-full bg-accent/40 blur-[120px]"
          />

          {reduce ? (
            <StaticStar />
          ) : (
            <>
              {/* Mobile (<md): static star. The blended+masked video below would
                  keep a phone GPU saturated, leaving no headroom to animate the
                  menu smoothly. The hamburger menu only exists <md, so this is
                  exactly where the budget matters. */}
              <StaticStar className="md:hidden" />

              {/* Desktop (md+): the animated video. Solid navy sits directly
                  behind it in the same stacking context, so `mixBlendMode: screen`
                  blends the video's opaque black background down to the page navy
                  (it disappears) while the bright star screens through. Masked to
                  match the video so its edges feather out instead of a seam. */}
              <div className="hidden h-full w-full md:block">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 bg-ink"
                  style={{ maskImage: starMask, WebkitMaskImage: starMask }}
                />
                <video
                  className="relative z-[2] h-full w-full object-contain"
                  style={{
                    mixBlendMode: "screen",
                    maskImage: starMask,
                    WebkitMaskImage: starMask,
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Roterende kristallen ster"
                >
                  {/* HD only on desktop — saves ~4.8 MB on mobile */}
                  <source src="/star-hd.mp4" type="video/mp4" media="(min-width: 1024px)" />
                  <source src="/star.mp4" type="video/mp4" />
                  <source src="/star.webm" type="video/webm" />
                </video>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="home"
      className="relative h-[100svh] overflow-hidden text-white"
    >
      {/* Rotating star, bleeding off the right edge */}
      <StarVisual reduce={reduce} />

      {/* Phone: bottom-up scrim — content sits at the bottom, star shows at the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] sm:hidden"
        style={{
          background:
            "linear-gradient(to top, #0B1B30 0%, rgba(11,27,48,0.92) 30%, rgba(11,27,48,0.45) 55%, rgba(11,27,48,0) 72%)",
        }}
      />
      {/* Tablet: left-right scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden sm:block lg:hidden"
        style={{
          background:
            "linear-gradient(to right, #0B1B30 0%, rgba(11,27,48,0.86) 42%, rgba(11,27,48,0.3) 80%, rgba(11,27,48,0) 100%)",
        }}
      />
      {/* Desktop: left-right scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, #0B1B30 0%, rgba(11,27,48,0.72) 30%, rgba(11,27,48,0.15) 58%, rgba(11,27,48,0) 72%)",
        }}
      />

      {/* Shooting star particles */}
      <ShootingStars reduce={reduce} />

      {/* Bottom fade into next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-ink" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 pt-20 sm:justify-center sm:px-8 lg:pb-20 lg:pt-24">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-heading font-bold leading-[0.96] tracking-[-0.035em] text-[clamp(2.75rem,7.5vw,6.875rem)] lg:max-w-[66%]"
          >
          <motion.span variants={lineUp} className="block">
            {h.line1}
          </motion.span>
          <motion.span variants={lineUp} className="block">
            {h.line2}
          </motion.span>
          <motion.span variants={lineUp} className="block text-accent-bright">
            {h.line3}
          </motion.span>
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-xl lg:mt-12"
        >
          <motion.p
            variants={fade}
            className="text-lg font-medium leading-snug text-white sm:text-xl"
          >
            {h.sub1}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-2 max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
          >
            {h.sub2}
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-7 flex flex-wrap items-center gap-4"
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
