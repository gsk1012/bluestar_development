import { useState, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowsDownUp } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

const SCROLL_SPEED = 2; // px per frame (~120 px/s bij 60 fps)

/**
 * Eén project als rij: groot screenshot dat bij hover door de hele pagina
 * scrolt, ernaast titel, omschrijving en een register met de highlights.
 */
function Project({ project, translated, reversed }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [scrollImgFailed, setScrollImgFailed] = useState(false);
  const containerRef = useRef(null);
  const scrollImgRef = useRef(null);
  const rafRef = useRef(null);
  const scrollPosRef = useRef(0);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const p = t.portfolio;

  const hasScrollImg = !!(project.scrollImage && !scrollImgFailed && !reduce);

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

  function start() {
    if (!hasScrollImg) return;
    rafRef.current = requestAnimationFrame(step);
  }

  function stop() {
    if (!hasScrollImg) return;
    cancelAnimationFrame(rafRef.current);
    scrollPosRef.current = 0;
    if (scrollImgRef.current) scrollImgRef.current.style.transform = "translateY(0)";
  }

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div
        ref={containerRef}
        onMouseEnter={start}
        onMouseLeave={stop}
        className={`group relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-bone lg:col-span-7 ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-ink-soft">
            {p.imageUnavailable}
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${p.screenshotAlt} ${translated.title}`}
            loading="lazy"
            decoding="async"
            width="1280"
            height="900"
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover object-top ${
              hasScrollImg ? "transition-opacity duration-500 ease-out group-hover:opacity-0" : ""
            }`}
          />
        )}

        {hasScrollImg && (
          <img
            ref={scrollImgRef}
            src={project.scrollImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setScrollImgFailed(true)}
            className="absolute inset-x-0 top-0 w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}

        {hasScrollImg && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink transition-opacity duration-300 group-hover:opacity-0 max-lg:hidden"
          >
            <ArrowsDownUp size={14} weight="bold" />
            {p.scrollHint}
          </span>
        )}
      </div>

      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <h3 className="text-[clamp(1.75rem,1.3rem+1.2vw,2.25rem)] font-light leading-tight tracking-[-0.02em]">
          {translated.title}
        </h3>
        <p className="mt-3 text-ink-soft">{translated.description}</p>

        <ul className="register mt-7">
          {translated.highlights.map((h) => (
            <li key={h} className="py-3 text-[0.9375rem]">
              {h}
            </li>
          ))}
        </ul>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.viewTabAriaPrefix} ${translated.title} ${p.viewTabAriaSuffix}`}
          className="text-link mt-7 inline-flex items-center gap-1.5"
        >
          {p.viewProject}
          <ArrowUpRight size={16} weight="bold" />
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const p = t.portfolio;

  return (
    <section id="portfolio" className="section">
      <div className="wrap">
        <div className="max-w-[54rem]">
          <Heading parts={p.heading} />
          <p className="lead mt-4">{p.subheading}</p>
        </div>

        <div className="mt-14 flex flex-col gap-[clamp(4rem,8vw,6rem)]">
          {projects.map((project, i) => (
            <Project
              key={project.url}
              project={project}
              translated={p.projects[i]}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
