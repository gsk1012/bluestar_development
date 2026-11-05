// Bestandsnaam van de deelafbeelding voor een pad, gedeeld door
// scripts/og-images.mjs (maken) en scripts/prerender.js (verwijzen).
//   "/" → "home", "/blog/x" → "blog-x", "/prijzen" → "prijzen"
export function ogImageName(urlPath) {
  return urlPath === '/' ? 'home' : urlPath.slice(1).replace(/\//g, '-')
}
