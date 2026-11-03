import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { getLatestLocalizedPosts } from "../data/posts";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";
import BlogCover from "./BlogCover";

// Drie nieuwste artikelen als gelijke kaarten naast elkaar. De hele kaart is
// klikbaar (groot doelvlak); de titel is de link, zodat schermlezers één
// duidelijke linktekst per kaart horen.
function PostCard({ post, b }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-ground shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1">
      <BlogCover post={post} className="aspect-[2/1] w-full" />
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="text-xl leading-snug">
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-brand"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mb-6 mt-3 line-clamp-3 text-[0.9375rem] text-ink-soft">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4 text-sm text-ink-soft">
          <span>
            {post.readingTime} {b.readingTime}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
            {b.readMore}
            <ArrowRight
              size={15}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogPreview() {
  const { lang, t } = useLanguage();
  const b = t.blog;
  const posts = getLatestLocalizedPosts(3, lang);

  return (
    <section id="blog" className="band section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46rem]">
            <Heading parts={b.heading} />
            <p className="lead mt-4">{b.subheading}</p>
          </div>
          <Link to="/blog" className="text-link inline-flex items-center gap-1.5">
            {b.viewAll}
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} b={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
