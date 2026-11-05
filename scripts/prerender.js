import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getLocalizedPostBySlug, getLocalizedPosts, postMetaTitle } from '../src/data/posts.js'
import { SERVICE_SLUGS, getServicePage, buildServicePageJsonLd } from '../src/data/servicePages.js'
import { getExtraPages, HOME_UPDATED } from '../src/data/pageMeta.js'
import { ogImageName } from './og-name.js'

const EXTRA_PAGES = getExtraPages()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const BASE = 'https://bluestardevelopment.nl'

// Derived from posts.js — add a post there and it's automatically prerendered + sitemapped
const BLOG_SLUGS = getLocalizedPosts('nl').map(p => p.slug)

function getMetaForUrl(url) {
  if (url === '/blog') {
    return {
      title: 'Webdevelopment tips voor ondernemers | BlueStar Development',
      description: 'Technische inzichten over hoe moderne websites worden gebouwd, hoe Google ze beoordeelt en waarom dat voor jou als ondernemer uitmaakt.',
      canonical: `${BASE}/blog`,
      ogType: 'website',
      ogTitle: 'Blog | BlueStar Development',
      ogDescription: 'Technische inzichten over websites, SEO en performance voor Nederlandse ondernemers.',
      ogImage: `${BASE}/logo.png`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${BASE}/blog#blog`,
        name: 'BlueStar Development Blog',
        description: 'Technische inzichten over hoe moderne websites worden gebouwd, hoe Google ze beoordeelt, en waarom dat voor jou als ondernemer uitmaakt.',
        url: `${BASE}/blog`,
        inLanguage: 'nl-NL',
        publisher: {
          '@type': 'Organization',
          name: 'BlueStar Development',
          '@id': `${BASE}/#organization`,
        },
      },
    }
  }

  if (url.startsWith('/blog/')) {
    const slug = url.slice(6)
    const post = getLocalizedPostBySlug(slug, 'nl')
    if (post) {
      const canonical = `${BASE}/blog/${slug}`
      return {
        title: postMetaTitle(post.title),
        description: post.metaDescription,
        canonical,
        ogType: 'article',
        ogTitle: post.title,
        ogDescription: post.metaDescription,
        ogImage: `${BASE}${post.image}`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `${canonical}#article`,
              headline: post.title,
              description: post.metaDescription,
              image: `${BASE}${post.image}`,
              datePublished: post.publishedAt,
              dateModified: post.publishedAt,
              author: {
                '@type': 'Organization',
                name: 'BlueStar Development',
                '@id': `${BASE}/#organization`,
              },
              publisher: {
                '@type': 'Organization',
                name: 'BlueStar Development',
                logo: {
                  '@type': 'ImageObject',
                  url: `${BASE}/logo.png`,
                },
              },
              url: canonical,
              inLanguage: 'nl-NL',
              isPartOf: { '@id': `${BASE}/#website` },
            },
            {
              '@type': 'WebPage',
              '@id': `${canonical}#webpage`,
              url: canonical,
              name: postMetaTitle(post.title),
              inLanguage: 'nl-NL',
              isPartOf: { '@id': `${BASE}/#website` },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
                  { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
                ],
              },
            },
          ],
        },
      }
    }
  }

  const extra = EXTRA_PAGES.find(p => p.path === url)
  if (extra) {
    return {
      title: extra.title,
      description: extra.description,
      canonical: `${BASE}${extra.path}`,
      ogType: 'website',
      ogTitle: extra.title,
      ogDescription: extra.description,
      ogImage: `${BASE}/logo.png`,
      jsonLd: extra.jsonLd,
    }
  }

  const page = getServicePage(url.slice(1), 'nl')
  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: `${BASE}/${page.slug}`,
      ogType: 'website',
      ogTitle: page.metaTitle,
      ogDescription: page.metaDescription,
      ogImage: `${BASE}/logo.png`,
      jsonLd: buildServicePageJsonLd(page),
    }
  }

  return null // homepage keeps its own meta from index.html
}

function injectMeta(html, meta) {
  if (!meta) return html

  // De JSON-LD in index.html beschrijft de homepage (WebPage, FAQ, reviews).
  // Andere pagina's krijgen alleen hun eigen blok, anders claimt elke pagina
  // de FAQ en reviews van de homepage.
  html = html.replace(/\s*<!-- JSON-LD Structured Data -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)

  html = html.replace(
    /<meta[^>]*name="description"[^>]*\/>/,
    `<meta name="description" content="${meta.description}" />`
  )

  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  )

  html = html.replace(
    /<link rel="alternate" hreflang="nl" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="nl" href="${meta.canonical}" />`
  )
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="x-default" href="${meta.canonical}" />`
  )

  html = html.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`
  )

  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  )

  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.ogTitle}" />`
  )

  html = html.replace(
    /<meta[^>]*property="og:description"[^>]*\/>/,
    `<meta property="og:description" content="${meta.ogDescription}" />`
  )

  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${meta.ogImage}" />`
  )

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.ogTitle}" />`
  )

  html = html.replace(
    /<meta[^>]*name="twitter:description"[^>]*\/>/,
    `<meta name="twitter:description" content="${meta.ogDescription}" />`
  )

  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${meta.ogTitle}" />`
  )

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${meta.ogImage}" />`
  )

  if (meta.jsonLd) {
    const jsonLdStr = JSON.stringify(meta.jsonLd, null, 2).replace(/\n/g, '\n    ')
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">\n    ${jsonLdStr}\n    </script>\n  </head>`
    )
  }

  return html
}

function generateSitemap() {
  const posts = getLocalizedPosts('nl')
  // Het blogoverzicht verandert als er een artikel bijkomt.
  const latestPost = posts.map(p => p.publishedAt).sort().at(-1)

  const postUrls = posts.map(p => `  <url>
    <loc>${BASE}/blog/${p.slug}</loc>
    <lastmod>${p.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')

  const servicePageUrls = SERVICE_SLUGS.map(slug => `  <url>
    <loc>${BASE}/${slug}</loc>
    <lastmod>${getServicePage(slug, 'nl').updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')

  const extraPageUrls = EXTRA_PAGES.map(p => `  <url>
    <loc>${BASE}${p.path}</loc>
    <lastmod>${p.updatedAt}</lastmod>
    <changefreq>${p.path.startsWith('/portfolio') ? 'monthly' : 'yearly'}</changefreq>
    <priority>${p.path.startsWith('/portfolio') || p.path === '/contact' || p.path === '/over-ons' ? '0.7' : '0.3'}</priority>
  </url>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE}/</loc>
    <lastmod>${HOME_UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${servicePageUrls}
${extraPageUrls}
  <url>
    <loc>${BASE}/blog</loc>
    <lastmod>${latestPost}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${postUrls}
</urlset>
`

  // Ook naar dist: Vite heeft public/ al gekopieerd vóór dit script draait, dus
  // anders loopt de gepubliceerde sitemap steeds één build achter.
  for (const dir of ['public', 'dist']) {
    fs.writeFileSync(path.join(root, dir, 'sitemap.xml'), xml)
  }
  console.log(`✓ Sitemap generated: ${SERVICE_SLUGS.length} service pages, ${EXTRA_PAGES.length} other pages, ${posts.length} posts`)
}

async function prerender() {
  const serverEntry = path.join(root, 'dist/server/entry-server.js')

  if (!fs.existsSync(serverEntry)) {
    console.warn('⚠ Server entry not found, skipping pre-render')
    return
  }

  const { render } = await import(serverEntry)
  const templatePath = path.join(root, 'dist/index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')

  function renderPage(url, outFile) {
    const appHtml = render(url)
    const meta = getMetaForUrl(url)
    // Eigen deelafbeelding per pagina (npm run og); valt terug op wat de meta al had.
    const og = `og/${ogImageName(url)}.jpg`
    if (meta && fs.existsSync(path.join(root, 'public', og))) meta.ogImage = `${BASE}/${og}`
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )
    html = injectMeta(html, meta)
    const dir = path.dirname(outFile)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outFile, html)
    console.log(`✓ Pre-rendered: ${url}`)
  }

  // Homepage
  renderPage('/', path.join(root, 'dist/index.html'))

  // Blog overzicht
  renderPage('/blog', path.join(root, 'dist/blog/index.html'))

  // Dienstpagina's
  for (const slug of SERVICE_SLUGS) {
    renderPage(`/${slug}`, path.join(root, `dist/${slug}/index.html`))
  }

  // Contact, over ons, portfolio, cases en juridisch
  for (const { path: p } of EXTRA_PAGES) {
    renderPage(p, path.join(root, `dist${p}/index.html`))
  }

  // Individuele blogposts
  for (const slug of BLOG_SLUGS) {
    renderPage(
      `/blog/${slug}`,
      path.join(root, `dist/blog/${slug}/index.html`)
    )
  }

  generateSitemap()

  fs.rmSync(path.join(root, 'dist/server'), { recursive: true, force: true })
  console.log('✓ Cleaned up dist/server/')
}

prerender().catch(err => {
  const serverDir = path.join(root, 'dist/server')
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true })
  }
  console.warn('⚠ Pre-render failed (build still succeeds without SSG):', err.message)
  console.warn(err.stack)
})
