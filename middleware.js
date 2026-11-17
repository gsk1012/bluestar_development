// Vercel Routing Middleware: Markdown voor AI-agents op hetzelfde adres.
//
// Vraagt een client met `Accept: text/markdown`, dan krijgt die de pagina als
// Markdown (src/lib/agentMarkdown.js), ook voor een onbekend adres: dan met
// status 404 en een Markdown-foutmelding. Browsers en alle andere clients gaan
// ongewijzigd door naar de voorgerenderde HTML. Beide antwoorden dragen
// `Vary: Accept`, zodat caches de twee versies uit elkaar houden.
//
// Draait vóór de cache en de statische bestanden; zie
// https://vercel.com/docs/routing-middleware

import { next } from "@vercel/functions";
import { markdownFor, prefersMarkdown } from "./src/lib/agentMarkdown.js";

export const config = {
  // Alleen paginapaden: geen /api en niets met een extensie (assets, llms.txt, …).
  matcher: ["/((?!api/)(?!.*\\.).*)"],
};

export default function middleware(request) {
  if (!prefersMarkdown(request.headers.get("accept"))) {
    return next({ headers: { Vary: "Accept" } });
  }
  try {
    const { status, body } = markdownFor(new URL(request.url).pathname);
    return new Response(request.method === "HEAD" ? null : body, {
      status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    // Liever HTML dan een kapotte pagina: bij een fout gaat het verzoek gewoon door.
    console.error("Markdown-antwoord mislukt:", err);
    return next({ headers: { Vary: "Accept" } });
  }
}
