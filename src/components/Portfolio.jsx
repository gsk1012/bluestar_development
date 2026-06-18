import { useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

const SCROLL_SPEED = 2; // px per animation frame (~120 px/s at 60 fps)

function ProjectCard({ project, translated, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [scrollImgFailed, setScrollImgFailed] = useState(false);
  const containerRef = useRef(null);
  const scrollImgRef = useRef(null);
  const rafRef = useRef(null);
  const scrollPosRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const num = String(index + 1).padStart(2, "0");
  const { t } = useLanguage();
  const p = t.portfolio;

  const hasScrollImg =
    !!(project.scrollImage && !scrollImgFailed && !prefersReducedMotion);

  function step() {
    const container = containerRef.current;
    const img = scrollImgRef.current;
    if (!container || !img) return;

    const maxScroll = img.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    scrollPosRef.current += SCROLL_SPEED;
    if (scrollPosRef.current > maxScroll) scrollPosRef.current = 0;
    img.style.transform = `translateY(-${scrollPosRef.current}px)`;
    rafRef.current = requestAnimationFrame(step);
  }

  function handleMouseEnter() {
    if (!hasScrollImg) return;
    rafRef.current = requestAnimationFrame(step);
  }

  function handleMouseLeave() {
    if (!hasScrollImg) return;
    cancelAnimationFrame(rafRef.current);
    scrollPosRef.current = 0;
    if (scrollImgRef.current) {
      scrollImgRef.current.style.transform = "translateY(0)";
    }
  }

  return (
    <motion.article
      variants={fadeUp}
      className="overflow-hidden rounded-rmd border border-white/10 bg-panel"
    >
      <div
        className="group block overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Media container */}
        <div ref={containerRef} className="relative aspect-[16/9] overflow-hidden">
          {imgFailed ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/30">
              {p.imageUnavailable}
            </div>
          ) : (
            /* Placeholder — fades out on hover when scroll image exists */
            <img
              src={project.image}
              alt={`${p.screenshotAlt} ${translated.title}`}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className={[
                "h-full w-full object-cover object-top",
                hasScrollImg
                  ? "transition-opacity duration-500 ease-out group-hover:opacity-0"
                  : "transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none",
              ].join(" ")}
            />
          )}

          {/* Scroll image — tall full-page WebP, animates upward via rAF */}
          {hasScrollImg && (
            <img
              ref={scrollImgRef}
              src={project.scrollImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={() => setScrollImgFailed(true)}
              className="absolute inset-x-0 top-0 w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}

          {/* Scroll hint pill */}
          {hasScrollImg && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/60 opacity-100 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3 w-3 opacity-80"
              >
                <path d="M8 1.5a.75.75 0 0 1 .75.75v3.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.22 1.22V2.25A.75.75 0 0 1 8 1.5ZM3.25 8.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM3.25 12a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5Z" />
              </svg>
              Hover to scroll
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 lg:px-7 lg:py-6">
        <div>
          <span
            aria-hidden="true"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/25"
          >
            {num}
          </span>
          <h3 className="mt-1.5 font-heading text-xl font-bold tracking-tight text-balance text-white">
            {translated.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {translated.description}
          </p>
        </div>

        {translated.highlights && translated.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {translated.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/50"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors duration-150 ease-out hover:border-white/40 hover:bg-white/5 hover:text-white active:scale-[0.97]"
        >
          {p.viewProject}
        </a>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const p = t.portfolio;

  return (
    <section id="portfolio" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 lg:mb-14"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {p.heading}
          </h2>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/60">
            {p.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="grid gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.url}
              project={project}
              translated={p.projects[i]}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
