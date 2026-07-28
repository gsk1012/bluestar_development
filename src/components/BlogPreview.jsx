import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { getLatestLocalizedPosts } from "../data/posts";
import { fadeUp, staggerContainer, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

// Nieuwste post groot, de twee daarna als compacte rijen ernaast — hiërarchie
// in plaats van drie identieke kaarten. De hele rij is klikbaar (groot doelvlak).
function FeaturedPostCard({ post, lang }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex h-full flex-col overflow-hidden rounded-rmd border border-white/10 bg-panel transition-colors duration-200 hover:border-white/20"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden"
        aria-label={`${lang === "en" ? "Read" : "Lees"}: ${post.title}`}
        tabIndex={-1}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 58vw, calc(100vw - 3rem)"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-accent-bright">
            {post.category}
          </span>
          <span>{post.readingTime} min {lang === "en" ? "read" : "leestijd"}</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group/title">
          <h3 className="font-heading text-xl font-bold leading-snug tracking-tight text-white transition-colors duration-150 group-hover/title:text-accent-bright lg:text-2xl">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm leading-relaxed text-white/55 line-clamp-2 lg:text-base">
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

function CompactPostRow({ post, lang }) {
  return (
    <motion.article variants={fadeUp} className="group flex-1">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full gap-5 overflow-hidden rounded-rmd border border-white/10 bg-panel p-4 transition-colors duration-200 hover:border-white/20"
        aria-label={`${lang === "en" ? "Read" : "Lees"}: ${post.title}`}
      >
        <div className="w-28 shrink-0 self-stretch overflow-hidden rounded-rsm sm:w-36">
          <img
            src={post.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            sizes="9rem"
            className="h-full min-h-[6rem] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center py-1">
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-accent-bright">
              {post.category}
            </span>
            <span>{post.readingTime} min {lang === "en" ? "read" : "leestijd"}</span>
          </div>
          <h3 className="mt-2.5 font-heading text-base font-bold leading-snug tracking-tight text-white transition-colors duration-150 line-clamp-2 group-hover:text-accent-bright">
            {post.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPreview() {
  const { lang } = useLanguage();
  const posts = getLatestLocalizedPosts(4, lang);
  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="max-w-xl"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {lang === "en" ? "From our blog" : "Uit ons blog"}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/60">
            {lang === "en"
              ? "Technical insights for business owners who want to understand how the web really works."
              : "Technische inzichten voor ondernemers die begrijpen waarom het web werkt zoals het werkt."}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={vpOnce}
          className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-12 lg:gap-6"
        >
          {featured && (
            <div className="lg:col-span-7">
              <FeaturedPostCard post={featured} lang={lang} />
            </div>
          )}

          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {rest.map((post) => (
              <CompactPostRow key={post.slug} post={post} lang={lang} />
            ))}

            <motion.div variants={fadeUp}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors duration-150 hover:border-white/40 hover:bg-white/5 hover:text-white active:scale-[0.97]"
              >
                {lang === "en" ? "View all posts" : "Bekijk alle blogs"}
                <ArrowRight size={15} weight="bold" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
