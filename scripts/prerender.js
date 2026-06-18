import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const BLOG_SLUGS = [
  'core-web-vitals-uitgelegd',
  'wcag-toegankelijkheid-website',
  'ssg-vs-ssr-razendsnel-website',
  'wat-is-een-lighthouse-score',
  'waarom-wij-react-gebruiken',
]

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
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )
    const dir = path.dirname(outFile)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outFile, html)
    console.log(`✓ Pre-rendered: ${url}`)
  }

  // Homepage
  renderPage('/', path.join(root, 'dist/index.html'))

  // Blog overzicht
  renderPage('/blog', path.join(root, 'dist/blog/index.html'))

  // Individuele blogposts
  for (const slug of BLOG_SLUGS) {
    renderPage(
      `/blog/${slug}`,
      path.join(root, `dist/blog/${slug}/index.html`)
    )
  }

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
