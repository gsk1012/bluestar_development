// Markdown-versie van elke pagina, voor AI-agents die met `Accept: text/markdown`
// vragen (zie middleware.js). Gebouwd uit dezelfde databestanden als de
// HTML-pagina's, zodat beide versies altijd hetzelfde zeggen. Puur: geen I/O,
// zodat de middleware en de tests het direct kunnen gebruiken.

import nl from "../i18n/nl.js";
import { getServicePage, getServicePages, SERVICE_SLUGS } from "../data/servicePages.js";
import { EMAIL, PHONE, getAboutPage, getCase, getCases, getContactPage, getPortfolioPage } from "../data/sitePages.js";
import { getLegalPage, LEGAL_SLUGS } from "../data/legalPages.js";
import { getLocalizedPostBySlug, getLocalizedPosts } from "../data/posts.js";

const BASE = "https://bluestardevelopment.nl";

// Gangbare Engelse paden die agents proberen, naar de Nederlandse pagina.
const ALIASES = { "/about": "/over-ons", "/privacy": "/privacybeleid", "/terms": "/algemene-voorwaarden" };

const heading = (parts) => parts.join("").trim();

// Relatieve links in de databestanden (/prijzen, #contact) worden absoluut,
// want een agent leest de tekst los van de site.
const absolute = (md) =>
  md.replace(/\]\(#contact\)/g, `](${BASE}/contact)`).replace(/\]\((\/[^)]*)\)/g, `](${BASE}$1)`);

const footer = () =>
  [
    "---",
    "",
    `Contact: [${EMAIL}](mailto:${EMAIL}) · ${PHONE.label} · [contactformulier](${BASE}/contact)`,
    `Overzicht voor AI-systemen: [llms.txt](${BASE}/llms.txt) · [agents.md](${BASE}/agents.md) · Prijzen: [pricing.md](${BASE}/pricing.md) · [Sitemap](${BASE}/sitemap.xml)`,
  ].join("\n");

const doc = (...blocks) => absolute(blocks.filter(Boolean).join("\n\n")) + "\n";

const faqBlock = (items, title = "Veelgestelde vragen") =>
  [`## ${title}`, ...items.map((i) => `### ${i.question}\n\n${i.answer}`)].join("\n\n");

function home() {
  const t = nl;
  const services = Object.values(t.services.items).map((s) => `- **${s.title}**: ${s.desc} (${t.services.termLabel.toLowerCase()}: ${s.term})`);
  const servicePages = getServicePages("nl").map((p) => `- [${p.breadcrumb}](/${p.slug}): ${p.metaDescription}`);
  const plans = t.pricing.plans.map((p) => {
    const price = p.from ? `${t.pricing.from} ${p.price} ${p.unit}` : `${p.price} (${p.unit})`;
    const excluded = p.excluded ? `\n  Niet inbegrepen: ${p.excluded}.` : "";
    return `- **${p.title}**: ${price}. ${p.suits}\n  Inbegrepen: ${p.features.join(", ")}.${excluded}`;
  });
  return doc(
    "# BlueStar Development",
    `> ${t.hero.sub1} ${t.hero.sub2}`,
    "BlueStar Development ontwerpt en bouwt websites en webapplicaties op maat voor zzp'ers, kleine bedrijven en het mkb in heel Nederland. Gevestigd in Amsterdam.",
    `## ${heading(t.services.heading)}`,
    t.services.subheading,
    services.join("\n"),
    "### Pagina's per dienst",
    servicePages.join("\n"),
    `## Prijzen`,
    t.pricing.subheading,
    plans.join("\n"),
    `- **${t.pricing.maintenanceTitle}**: ${t.pricing.maintenancePrice}. ${t.pricing.maintenanceBody}`,
    t.pricing.vatNote,
    `## ${heading(t.process.heading)}`,
    t.process.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.description}`).join("\n"),
    faqBlock(t.faq.items),
    footer()
  );
}

function servicePage(slug) {
  const p = getServicePage(slug, "nl");
  const price = p.panel.price;
  const priceLine = price.from ? `Vanaf ${price.value} (${price.unit})` : `${price.value} (${price.unit})`;
  const blocks = [`# ${heading(p.heading)}`, p.lead, `**Prijsindicatie:** ${priceLine}`, p.panel.facts.map((f) => `- ${f}`).join("\n")];
  if (p.included) {
    blocks.push(`## ${heading(p.included.heading)}`, p.included.lead, p.included.items.map((i) => `- **${i.title}**: ${i.text}`).join("\n"));
  }
  if (p.blocks.includes("pricing")) {
    blocks.push(
      `## ${heading(p.pricing.heading)}`,
      p.pricing.lead,
      nl.pricing.plans
        .map((plan) => `- **${plan.title}**: ${plan.from ? `vanaf ${plan.price} ${plan.unit}` : `${plan.price} (${plan.unit})`}`)
        .join("\n"),
      `- **${nl.pricing.maintenanceTitle}**: ${nl.pricing.maintenancePrice}`
    );
  }
  blocks.push(...p.sections.map((s) => `## ${s.heading}\n\n${s.body}`));
  blocks.push(faqBlock(p.faq.items, heading(p.faq.heading)), `Bijgewerkt: ${p.updatedAt}`, footer());
  return doc(...blocks);
}

function about() {
  const p = getAboutPage("nl");
  const f = p.founder;
  return doc(
    `# ${heading(p.heading)}`,
    p.lead,
    `## ${f.label}: ${f.name}`,
    f.body,
    f.facts.map((x) => `- **${x.label}:** ${x.value}`).join("\n"),
    `## ${heading(p.principles.heading)}`,
    p.principles.items.map((i) => `- **${i.title}**: ${i.text}`).join("\n"),
    `## ${heading(p.stack.heading)}`,
    p.stack.body,
    p.stack.tools.map((tool) => `- **${tool.name}**: ${tool.desc}`).join("\n"),
    `## ${heading(nl.process.heading)}`,
    nl.process.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.description}`).join("\n"),
    footer()
  );
}

function contact() {
  const p = getContactPage("nl");
  return doc(
    `# ${heading(p.heading)}`,
    p.lead,
    p.rows.map((r) => `- **${r.label}:** ${r.href ? `[${r.value}](${r.href})` : r.value}`).join("\n"),
    p.note,
    `Een bericht sturen kan via het formulier op [${BASE}/contact](/contact).`,
    footer()
  );
}

function portfolio() {
  const p = getPortfolioPage("nl");
  const cases = getCases("nl").map((c) => `## [${c.breadcrumb}](/portfolio/${c.slug})\n\n${c.kind}. ${c.lead}`);
  return doc(`# ${heading(p.heading)}`, p.lead, ...cases, footer());
}

function casePage(slug) {
  const c = getCase(slug, "nl");
  return doc(
    `# ${heading(c.heading)}`,
    c.lead,
    `- **Type:** ${c.kind}\n- **Opdrachtgever:** ${c.client}\n- **Live website:** ${c.project.url}`,
    ...c.sections.map((s) => `## ${s.heading}\n\n${s.body}`),
    footer()
  );
}

function legal(slug) {
  const p = getLegalPage(slug);
  return doc(
    `# ${p.title}`,
    p.updated,
    p.intro,
    ...p.sections.map((s, i) => `## ${p.articles ? `Artikel ${i + 1}: ` : ""}${s.heading}\n\n${s.body}`),
    `PDF-versie: [${BASE}${p.pdf}](${p.pdf})`,
    footer()
  );
}

function blogIndex() {
  const posts = getLocalizedPosts("nl").map((p) => `- [${p.title}](/blog/${p.slug}) (${p.publishedAt}): ${p.excerpt}`);
  return doc(`# ${heading(nl.blog.pageHeading)}`, nl.blog.pageSubheading, posts.join("\n"), footer());
}

function blogPost(slug) {
  const p = getLocalizedPostBySlug(slug, "nl");
  return doc(
    `# ${p.title}`,
    `${p.category} · ${p.publishedAt} · ${p.readingTime} ${nl.blog.readingTime} · door [Gurpreet Singh](/over-ons)`,
    p.excerpt,
    ...p.sections.map((s) => `## ${s.heading}\n\n${s.body}`),
    footer()
  );
}

// Het gevraagde pad komt van buiten: alleen veilige tekens, kort, zonder
// regeleinden of backticks, zodat er geen eigen Markdown (links) in kan.
const safePath = (path) => path.replace(/[^\w\-./~%]/g, "").slice(0, 120);

function notFound(path) {
  return doc(
    "# Pagina niet gevonden (404)",
    `De pagina \`${safePath(path)}\` bestaat niet (meer) op bluestardevelopment.nl. Mogelijk is hij verhuisd of is de link verkeerd overgenomen.`,
    "Hier vind je de weg terug:",
    [
      `- [Homepage](/)`,
      `- [llms.txt](/llms.txt): overzicht van alle pagina's en diensten voor AI-systemen`,
      `- [Sitemap](/sitemap.xml): alle pagina's van de site`,
      `- [Prijzen](/prijzen) · [Contact](/contact)`,
    ].join("\n")
  );
}

/**
 * Markdown voor een pad, met de HTTP-status die erbij hoort.
 * @param {string} pathname - bv. "/", "/prijzen", "/blog/core-web-vitals-uitgelegd"
 * @returns {{ status: number, body: string }}
 */
export function markdownFor(pathname) {
  let path;
  try {
    path = decodeURIComponent(pathname || "/");
  } catch {
    path = pathname || "/"; // ongeldige %-codering: gebruik het pad zoals het is
  }
  path = path.replace(/\/+$/, "") || "/";
  path = ALIASES[path] ?? path;

  if (path === "/") return { status: 200, body: home() };
  const slug = path.slice(1);
  if (SERVICE_SLUGS.includes(slug)) return { status: 200, body: servicePage(slug) };
  if (LEGAL_SLUGS.includes(slug)) return { status: 200, body: legal(slug) };
  if (path === "/over-ons") return { status: 200, body: about() };
  if (path === "/contact") return { status: 200, body: contact() };
  if (path === "/portfolio") return { status: 200, body: portfolio() };
  if (path.startsWith("/portfolio/") && getCase(path.slice(11), "nl")) return { status: 200, body: casePage(path.slice(11)) };
  if (path === "/blog") return { status: 200, body: blogIndex() };
  if (path.startsWith("/blog/") && getLocalizedPostBySlug(path.slice(6), "nl")) return { status: 200, body: blogPost(path.slice(6)) };
  return { status: 404, body: notFound(path) };
}

/**
 * Of een Accept-header de voorkeur geeft aan Markdown boven HTML. Weegt de
 * q-waarden: `text/markdown` moet er staan en minstens zo hoog scoren als
 * `text/html`. Browsers sturen nooit text/markdown, dus die krijgen HTML.
 */
export function prefersMarkdown(accept) {
  if (!accept) return false;
  const q = (type) => {
    let best = -1;
    for (const part of accept.split(",")) {
      const [media, ...params] = part.trim().toLowerCase().split(";");
      if (media.trim() !== type) continue;
      const qp = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      best = Math.max(best, qp ? Number(qp.slice(2)) || 0 : 1);
    }
    return best;
  };
  const md = q("text/markdown");
  return md > 0 && md >= q("text/html");
}
