import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { getLocalizedPostBySlug, getLocalizedPosts, postMetaTitle } from "../data/posts";
import { useLanguage } from "../i18n/LanguageContext";
import NotFoundPage from "./NotFoundPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import BlogCover from "../components/BlogCover";
import Prose from "../components/Prose";

function Section({ heading, body }) {
  return (
    <div className="mt-10">
      <h2 className="text-[1.5rem] font-bold tracking-[-0.012em] sm:text-[1.75rem]">
        {heading}
      </h2>
      <div className="mt-4">
        <Prose body={body} />
      </div>
    </div>
  );
}

const BASE = 'https://bluestardevelopment.nl';

// `slug` komt in de browser uit de route; bij het voorrenderen geeft entry-server hem mee.
export default function BlogPost({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const { lang, t } = useLanguage();
  const b = t.blog;
  const post = getLocalizedPostBySlug(slug, lang);

  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';

    document.title = postMetaTitle(post.title);
    if (metaDesc) metaDesc.setAttribute('content', post.metaDescription);

    const canonical = `${BASE}/blog/${post.slug}`;

    // Canonical tag
    const CANONICAL_ID = 'blog-post-canonical';
    let canonicalEl = document.getElementById(CANONICAL_ID);
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      canonicalEl.id = CANONICAL_ID;
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    // JSON-LD schema
    const SCHEMA_ID = 'blog-post-schema';
    let schemaEl = document.getElementById(SCHEMA_ID);
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.type = 'application/ld+json';
      schemaEl.id = SCHEMA_ID;
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${canonical}#article`,
          headline: post.title,
          description: post.metaDescription,
          image: {
            '@type': 'ImageObject',
            url: `${BASE}${post.image}`,
            description: post.imageAlt,
          },
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: { '@type': 'Person', '@id': `${BASE}/over-ons#gurpreet-singh`, name: 'Gurpreet Singh', url: `${BASE}/over-ons` },
          publisher: {
            '@type': 'Organization',
            name: 'BlueStar Development',
            logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
          },
          url: canonical,
          inLanguage: lang === 'en' ? 'en-GB' : 'nl-NL',
          isPartOf: { '@id': `${BASE}/#website` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          keywords: post.category,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', 'p'],
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
          ],
        },
      ],
    });

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      document.getElementById(SCHEMA_ID)?.remove();
      document.getElementById(CANONICAL_ID)?.remove();
    };
  }, [post?.slug, post?.title, lang]);

  if (!post) return <NotFoundPage />;

  const otherPosts = getLocalizedPosts(lang).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ground">
        <header className="bg-bone pt-[var(--header-height)]">
          <div className="mx-auto max-w-3xl px-[var(--gutter)] pb-14 pt-12 lg:pt-16">
            <Link to="/blog" className="text-link inline-flex items-center gap-1.5 text-[0.9375rem]">
              <ArrowLeft size={15} weight="bold" />
              {b.back}
            </Link>

            <h1 className="mt-6 text-[clamp(2.25rem,1.5rem+2.4vw,3.5rem)] font-light">{post.title}</h1>

            <p className="mt-5 text-[0.9375rem] text-ink-soft">
              <span className="font-semibold text-brand">{post.category}</span> ·{" "}
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-GB" : "nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>{" "}
              · {post.readingTime} {b.readingTime} · {b.by}{" "}
              <Link to="/over-ons" className="font-semibold text-ink underline-offset-4 hover:text-brand hover:underline">
                Gurpreet Singh
              </Link>
            </p>

            <p className="lead mt-6">{post.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-[var(--gutter)]">
          <BlogCover post={post} className="-mt-6 aspect-[16/9] w-full rounded-card" />

          {post.sections.map((section) => (
            <Section key={section.heading} heading={section.heading} body={section.body} />
          ))}

          <aside className="mt-16 rounded-[14px_var(--radius-big)_14px_14px] bg-brand px-[clamp(1.75rem,4vw,3rem)] py-[clamp(2rem,4vw,3rem)] text-white">
            <Heading parts={b.ctaHeading} className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] [&_.accent]:text-white" />
            <p className="mt-3 max-w-lg text-on-dark-soft">{b.ctaBody}</p>
            {/* Gewone link: de homepage is voorgerenderd, dus de browser springt zelf naar #contact. */}
            <a href="/#contact" className="btn btn-light mt-7">
              {b.ctaButton}
            </a>
          </aside>
        </div>

        {otherPosts.length > 0 && (
          <div className="wrap section">
            <h2 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)]">{b.more}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex gap-5 rounded-card border border-line bg-ground p-4 shadow-soft"
                >
                  <BlogCover post={p} size="sm" className="h-24 w-28 shrink-0 rounded-inner sm:w-36" />
                  <div className="flex min-w-0 flex-col justify-center">
                    <h3 className="leading-snug transition-colors duration-150 group-hover:text-brand">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-soft">
                      <span className="font-semibold text-brand">{p.category}</span> · {p.readingTime} {b.readingTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
