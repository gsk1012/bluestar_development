import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Tag } from "@phosphor-icons/react";
import { getLocalizedPostBySlug, getLocalizedPosts } from "../data/posts";
import { fadeUp } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

function Section({ heading, body }) {
  return (
    <div className="mt-10">
      <h2 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-4 space-y-4">
        {body.split("\n\n").map((paragraph, i) => {
          // Bold tekst: **tekst** → <strong>
          const rendered = paragraph.replace(
            /\*\*(.*?)\*\*/g,
            (_, match) => `<strong class="font-semibold text-white">${match}</strong>`
          );
          return (
            <p
              key={i}
              className="text-base leading-relaxed text-white/70"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const post = getLocalizedPostBySlug(slug, lang);

  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = getLocalizedPosts(lang).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] text-white">
        {/* Hero afbeelding */}
        <div className="relative h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden sm:h-[50vh]">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:py-16">
          {/* Terug-link */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              <ArrowLeft size={15} weight="bold" />
              {lang === "en" ? "Back to blog" : "Terug naar blog"}
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/40"
          >
            <span className="flex items-center gap-1.5">
              <Tag size={14} weight="duotone" className="text-accent-bright" />
              <span className="text-accent-bright">{post.category}</span>
            </span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-GB" : "nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1.5">
              <Clock size={14} weight="duotone" />
              {post.readingTime} min {lang === "en" ? "read" : "leestijd"}
            </span>
          </motion.div>

          {/* Titel */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h1>

          {/* Inleiding */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg leading-relaxed text-white/60"
          >
            {post.excerpt}
          </motion.p>

          {/* Scheidingslijn */}
          <div className="mt-10 border-t border-white/10" />

          {/* Secties */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            {post.sections.map((section) => (
              <Section key={section.heading} heading={section.heading} body={section.body} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-16 rounded-rlg border border-white/10 bg-white/5 p-8 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-white">
              {lang === "en" ? "Ready for a fast website?" : "Klaar voor een snelle website?"}
            </h2>
            <p className="mt-3 text-white/60">
              {lang === "en"
                ? "We build sites that score on speed, accessibility and findability. Schedule a no-obligation call."
                : "Wij bouwen sites die scoren op snelheid, toegankelijkheid en vindbaarheid. Plan een vrijblijvend gesprek."}
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-6 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97]"
            >
              {lang === "en" ? "Schedule a call" : "Plan een gesprek"}
            </button>
          </motion.div>

          <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>

        {/* Meer artikelen */}
        {otherPosts.length > 0 && (
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
                {lang === "en" ? "More articles" : "Meer artikelen"}
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group flex gap-5 overflow-hidden rounded-rmd border border-white/10 bg-panel p-5 transition-colors duration-150 hover:border-white/20"
                  >
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      className="h-20 w-28 shrink-0 rounded-rsm object-cover"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-accent-bright">{p.category}</span>
                      <h3 className="font-heading text-sm font-bold leading-snug text-white transition-colors duration-150 group-hover:text-accent-bright">
                        {p.title}
                      </h3>
                      <span className="text-xs text-white/40">{p.readingTime} min {lang === "en" ? "read" : "leestijd"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
