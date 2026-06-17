import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function prerender() {
  const serverEntry = path.join(root, 'dist/server/entry-server.js')

  if (!fs.existsSync(serverEntry)) {
    console.warn('⚠ Server entry not found, skipping pre-render')
    return
  }

  const { render } = await import(serverEntry)
  const appHtml = render()

  const templatePath = path.join(root, 'dist/index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')

  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  fs.writeFileSync(templatePath, html)
  console.log('✓ Pre-rendered: /')

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
