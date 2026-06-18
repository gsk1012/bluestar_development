import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react(), inlineCss()],
  server: { port: 5713, strictPort: true },
  preview: { port: 5713, strictPort: true },
})
