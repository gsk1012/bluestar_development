import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { getLocalizedPosts } from "../data/posts";
import Heading from "../components/Heading";
import BlogCover from "../components/BlogCover";
import { useLanguage } from "../i18n/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostCard({ post, featured = false, lang = "nl", b }) {
  return (
    <article
      className={`group overflow-hidden rounded-card border border-line bg-ground shadow-soft ${
        featured ? "lg:col-span-3 lg:grid lg:grid-cols-2" : "flex flex-col"
      }`}
    >
      <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <BlogCover
          post={post}
          className={`w-full ${featured ? "aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[320px]" : "aspect-[16/9]"}`}
        />
      </Link>

      <div className={`flex flex-1 flex-col gap-3 p-6 ${featured ? "lg:justify-center lg:p-12" : "lg:p-8"}`}>
        <h2
          className={`font-bold leading-snug tracking-[-0.012em] ${
            featured ? "text-[clamp(1.5rem,1.2rem+1vw,2.25rem)]" : "text-xl"
          }`}
        >
          <Link to={`/blog/${post.slug}`} className="transition-colors duration-150 hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="text-[0.9375rem] text-ink-soft">
          <span className="font-semibold text-brand">{post.category}</span> ·{" "}
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-GB" : "nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>{" "}
          · {post.readingTime} {b.readingTime}
        </p>
        <p className={`text-ink-soft ${featured ? "" : "line-clamp-2"}`}>{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="text-link mt-auto inline-flex items-center gap-1.5 self-start pt-2">
          {b.readMore}
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const { lang, t } = useLanguage();
  const b = t.blog;
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
      <main className="min-h-screen bg-ground pt-[var(--header-height)]">
        <div className="wrap section">
          <div className="max-w-2xl">
            <Heading as="h1" parts={b.pageHeading} className="text-[clamp(2.5rem,1.6rem+3vw,4rem)]" />
            <p className="lead mt-4">{b.pageSubheading}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PostCard post={featured} featured lang={lang} b={b} />
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} b={b} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
