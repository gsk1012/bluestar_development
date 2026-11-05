// Meta en JSON-LD voor de overige subpagina's (contact, over ons, portfolio,
// cases en juridisch), voor scripts/prerender.js. De dienstpagina's hebben hun
// eigen builder in servicePages.js.

import { aboutPage, contactPage, getCases, pageJsonLd, portfolioPage } from "./sitePages.js";
import { getLegalPages } from "./legalPages.js";

const BASE = "https://bluestardevelopment.nl";

// Laatste inhoudelijke wijziging van de homepage, voor de sitemap.
export const HOME_UPDATED = "2026-11-05";

export function getExtraPages() {
  const nl = (page) => ({ ...page, ...page.nl });
  const contact = nl(contactPage);
  const about = nl(aboutPage);
  const portfolio = nl(portfolioPage);
  const cases = getCases("nl");

  const page = (path, p, type, crumbs, extra) => ({
    path,
    updatedAt: p.updatedAt,
    title: p.metaTitle,
    description: p.metaDescription,
    jsonLd: pageJsonLd({ path, type, name: p.metaTitle, description: p.metaDescription, crumbs, extra }),
  });

  return [
    page("/contact", contact, "ContactPage", [{ name: contact.breadcrumb, path: "/contact" }]),
    page("/over-ons", about, "AboutPage", [{ name: about.breadcrumb, path: "/over-ons" }]),
    page("/portfolio", portfolio, "CollectionPage", [{ name: portfolio.breadcrumb, path: "/portfolio" }], [
      {
        "@type": "ItemList",
        "@id": `${BASE}/portfolio#cases`,
        itemListElement: cases.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.breadcrumb,
          url: `${BASE}/portfolio/${c.slug}`,
        })),
      },
    ]),
    ...cases.map((c) =>
      page(
        `/portfolio/${c.slug}`,
        c,
        "WebPage",
        [
          { name: portfolio.breadcrumb, path: "/portfolio" },
          { name: c.breadcrumb, path: `/portfolio/${c.slug}` },
        ],
        [
          {
            "@type": "CreativeWork",
            "@id": `${BASE}/portfolio/${c.slug}#work`,
            name: c.breadcrumb,
            description: c.metaDescription,
            url: c.project.url,
            image: `${BASE}${c.project.image}`,
            creator: { "@id": `${BASE}/#organization` },
          },
        ]
      )
    ),
    ...getLegalPages().map((p) => page(`/${p.slug}`, p, "WebPage", [{ name: p.title, path: `/${p.slug}` }])),
  ];
}
