import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function preloadFonts() {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const preloads = Object.values(ctx.bundle)
          .filter(c => c.type === 'asset' && c.fileName.endsWith('.woff2'))
          .map(c => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${c.fileName}">`)
          .join('\n    ');
        return html.replace('</head>', `    ${preloads}\n  </head>`);
      },
    },
  };
}

function inlineCss() {
  return {
    name: 'inline-css',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        for (const chunk of Object.values(ctx.bundle)) {
          if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
            const tag = `<link rel="stylesheet" crossorigin href="/${chunk.fileName}">`;
            html = html.replace(tag, `<style>${chunk.source}</style>`);
          }
        }
        return html;
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadFonts(), inlineCss()],
  server: { port: 5713, strictPort: true },
  preview: { port: 5713, strictPort: true },
})
