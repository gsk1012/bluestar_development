// Maakt per pagina een deelafbeelding (1200×630) voor LinkedIn, WhatsApp en
// Google Discover, in de huisstijl: bone vlak, de paginatitel met één indigo
// nadruk, en rechts de merkchevron. Draai na het toevoegen of hernoemen van
// een pagina:  npm run og
// De afbeeldingen komen in public/og/ en worden meegecommit; de build maakt
// ze niet opnieuw. scripts/prerender.js verwijst ernaar via ogImageFor().

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { getServicePages } from '../src/data/servicePages.js'
import { getAboutPage, getCases, getContactPage, getPortfolioPage } from '../src/data/sitePages.js'
import { getLegalPages } from '../src/data/legalPages.js'
import { getLocalizedPosts } from '../src/data/posts.js'
import { ogImageName } from './og-name.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/og')

const font = fs.readFileSync(
  path.join(root, 'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')
).toString('base64')
const logo = fs.readFileSync(path.join(root, 'public/logo-mark-tight.webp')).toString('base64')

// Elke kaart: het pad, een klein label erboven en de titel in Heading-delen
// (oneven delen worden vet indigo, net als op de site).
const cards = [
  { path: '/', label: 'Webdesign en webapplicaties', heading: ['Websites die je bedrijf ', 'laten groeien'] },
  { path: '/blog', label: 'Blog', heading: ['Webdevelopment ', 'tips', ' voor ondernemers'] },
  ...getServicePages('nl').map((p) => ({ path: `/${p.slug}`, label: 'Diensten', heading: p.heading })),
  { path: '/contact', label: 'Contact', heading: getContactPage('nl').heading },
  { path: '/over-ons', label: 'Over ons', heading: getAboutPage('nl').heading },
  { path: '/portfolio', label: 'Portfolio', heading: getPortfolioPage('nl').heading },
  ...getCases('nl').map((c) => ({ path: `/portfolio/${c.slug}`, label: `Case · ${c.kind}`, heading: c.heading })),
  ...getLegalPages().map((p) => ({ path: `/${p.slug}`, label: 'BlueStar Development', heading: p.heading })),
  ...getLocalizedPosts('nl').map((p) => ({ path: `/blog/${p.slug}`, label: `Blog · ${p.category}`, heading: ['', p.title] })),
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function html({ label, heading }) {
  const title = heading.map((part, i) => (i % 2 ? `<b>${esc(part)}</b>` : esc(part))).join('')
  const long = heading.join('').length > 48
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: B; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; font-family: B, sans-serif; background: #eeede7; color: #363636; position: relative; overflow: hidden; }
    .lane { position: absolute; left: -30%; top: 46%; width: 160%; height: 190px; background: #fff; transform: rotate(-22deg); opacity: .85; }
    .chev { position: absolute; top: 0; right: 0; bottom: 0; width: 300px; background: #4038f5;
            clip-path: polygon(38% 0, 100% 0, 100% 100%, 38% 100%, 0 50%); }
    .wrap { position: absolute; inset: 0; padding: 64px 340px 64px 72px; display: flex; flex-direction: column; }
    .brand { display: flex; align-items: center; gap: 14px; }
    .brand img { height: 52px; }
    .brand span { display: flex; flex-direction: column; font-weight: 700; font-size: 26px; letter-spacing: .04em; line-height: 1; }
    .brand small { font-size: 13px; letter-spacing: .22em; color: #4038f5; margin-top: 6px; }
    .label { margin-top: auto; font-size: 24px; font-weight: 600; color: #a8421d; }
    h1 { margin-top: 14px; font-weight: 300; font-size: ${long ? 54 : 68}px; line-height: 1.08; letter-spacing: -.02em; }
    h1 b { font-weight: 700; color: #4038f5; }
  </style></head><body>
    <div class="lane"></div><div class="chev"></div>
    <div class="wrap">
      <div class="brand"><img src="data:image/webp;base64,${logo}"><span>BLUESTAR<small>DEVELOPMENT</small></span></div>
      <p class="label">${esc(label)}</p>
      <h1>${title}</h1>
    </div>
  </body></html>`
}

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const card of cards) {
  await page.setContent(html(card))
  await page.evaluate(() => document.fonts.ready)
  const file = path.join(outDir, `${ogImageName(card.path)}.jpg`)
  await page.screenshot({ path: file, type: 'jpeg', quality: 86 })
  console.log(`✓ ${path.relative(root, file)}`)
}
await browser.close()
