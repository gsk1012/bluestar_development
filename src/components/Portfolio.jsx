import { useState } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

function ProjectCard({ project, translated, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const { t } = useLanguage();
  const p = t.portfolio;

  return (
    <motion.article
      variants={fadeUp}
      className="overflow-hidden rounded-rmd border border-white/10 bg-panel"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.viewTabAriaPrefix} ${translated.title} ${p.viewTabAriaSuffix}`}
        className="group block overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {imgFailed ? (
          <div className="flex aspect-[16/9] w-full items-center justify-center text-sm text-white/30">
            {p.imageUnavailable}
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${p.screenshotAlt} ${translated.title}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full aspect-[16/9] object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
        )}
      </a>

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
