import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import { fadeUp } from "../lib/motion";

function ProjectImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="flex aspect-[16/10] w-full items-center justify-center rounded-rlg border border-line bg-surface text-sm text-ink-soft"
      >
        Afbeelding niet beschikbaar
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-rlg border border-line bg-bg shadow-xl shadow-accent/10">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
      />
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-bg py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            Werk waar we trots op zijn
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            Een greep uit de sites die we bouwden, snel, vindbaar en helemaal
            afgestemd op het merk.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
          {projects.map((project, i) => {
            const imageRight = i % 2 === 1;

            return (
              <motion.div
                key={project.url}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div className={imageRight ? "lg:order-2" : "lg:order-1"}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bekijk ${project.title} in een nieuw tabblad`}
                    className="block rounded-rlg active:scale-[0.99]"
                  >
                    <ProjectImage
                      src={project.image}
                      alt={`Screenshot van de website ${project.title}`}
                    />
                  </a>
                </div>

                <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent/80 active:scale-[0.97]"
                  >
                    Bekijk project
                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
