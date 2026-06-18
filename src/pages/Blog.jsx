import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { getLocalizedPosts } from "../data/posts";
import { fadeUp, staggerContainer } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostCard({ post, featured = false, lang = "nl" }) {
  return (
    <motion.article
      variants={fadeUp}
      className={`group overflow-hidden rounded-rmd border border-white/10 bg-panel ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2" : "flex flex-col"
      }`}
    >
      <Link
        to={`/blog/${post.slug}`}
        aria-label={lang === "en" ? `Read: ${post.title}` : `Lees: ${post.title}`}
        tabIndex={-1}
        className={`block overflow-hidden ${featured ? "" : ""}`}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className={`w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none ${
            featured ? "h-full min-h-[260px]" : "aspect-[16/9]"
          }`}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-accent-bright">
            {post.category}
          </span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{post.readingTime} min</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group/title">
          <h2
            className={`font-heading font-bold leading-snug tracking-tight text-white transition-colors duration-150 group-hover/title:text-accent-bright ${
              featured ? "text-2xl lg:text-3xl" : "text-lg"
            }`}
          >
            {post.title}
          </h2>
        </Link>

        <p className={`leading-relaxed text-white/55 ${featured ? "text-base" : "text-sm line-clamp-2"}`}>
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

export default function Blog() {
  const { lang } = useLanguage();
  const [featured, ...rest] = getLocalizedPosts(lang);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    document.title = lang === 'en'
      ? 'Blog | Web development tips for entrepreneurs — BlueStar Development'
      : 'Blog | Webdevelopment tips voor ondernemers — BlueStar Development';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', lang === 'en'
        ? 'Technical insights on how modern websites are built, how Google evaluates them, and why that matters for your business.'
        : 'Technische inzichten over hoe moderne websites worden gebouwd, hoe Google ze beoordeelt en waarom dat voor jou als ondernemer uitmaakt.');
    }
    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
    };
  }, [lang]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {lang === "en" ? "Web development tips" : "Webdevelopment tips"}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              {lang === "en"
                ? "Technical insights on how modern websites are built, how Google evaluates them, and why that matters for you."
                : "Technische inzichten over hoe moderne websites worden gebouwd, hoe Google ze beoordeelt, en waarom dat voor jou uitmaakt."}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6"
          >
            <PostCard post={featured} featured lang={lang} />
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
