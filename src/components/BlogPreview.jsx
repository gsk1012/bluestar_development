import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { getLatestLocalizedPosts } from "../data/posts";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

function PostCard({ post, lang }) {
  return (
    <motion.article variants={fadeUp} className="group flex flex-col overflow-hidden rounded-rmd border border-white/10 bg-panel">
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden"
        aria-label={`Lees: ${post.title}`}
        tabIndex={-1}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-accent-bright">
            {post.category}
          </span>
          <span>{post.readingTime} min {lang === "en" ? "read" : "leestijd"}</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group/title">
          <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-150 group-hover/title:text-accent-bright">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm leading-relaxed text-white/55 line-clamp-2">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent-bright transition-opacity duration-150 hover:opacity-80"
        >
          {lang === "en" ? "Read more" : "Lees verder"}
          <ArrowRight size={15} weight="bold" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogPreview() {
  const { lang } = useLanguage();
  const posts = getLatestLocalizedPosts(3, lang);

  return (
    <section id="blog" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {lang === "en" ? "From our blog" : "Uit ons blog"}
            </h2>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/60">
              {lang === "en"
                ? "Technical insights for business owners who want to understand how the web really works."
                : "Technische inzichten voor ondernemers die begrijpen waarom het web werkt zoals het werkt."}
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors duration-150 hover:border-white/40 hover:bg-white/5 hover:text-white active:scale-[0.97]"
          >
            {lang === "en" ? "View all posts" : "Bekijk alle blogs"}
            <ArrowRight size={15} weight="bold" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
