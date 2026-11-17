import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { markdownFor, prefersMarkdown } from "./agentMarkdown.js";

const sitemapPaths = () =>
  [...fs.readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/bluestardevelopment\.nl([^<]*)<\/loc>/g)].map(
    (m) => m[1] || "/"
  );

describe("prefersMarkdown", () => {
  it("kiest Markdown als de client daar om vraagt", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
  });

  it("houdt browsers en gewone clients op HTML", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("*/*")).toBe(false);
    expect(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(false);
    expect(prefersMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0")).toBe(false);
  });
});

describe("markdownFor", () => {
  it("geeft voor elke pagina uit de sitemap een volledige Markdown-versie", () => {
    for (const path of sitemapPaths()) {
      const { status, body } = markdownFor(path);
      expect(status, path).toBe(200);
      expect(body, path).toMatch(/^# \S/);
      expect(body, path).not.toMatch(/undefined|\[object /);
      expect(body, path).not.toMatch(/\]\(\/(?!\/)/); // geen relatieve links
    }
  });

  it("beschrijft op de homepage de diensten en prijzen", () => {
    const { body } = markdownFor("/");
    expect(body).toContain("# BlueStar Development");
    expect(body).toContain("Basiswebsite");
    expect(body).toContain("€495");
    expect(body).toContain("https://bluestardevelopment.nl/llms.txt");
  });

  it("vangt gangbare Engelse paden en een slash aan het eind op", () => {
    expect(markdownFor("/about").body).toBe(markdownFor("/over-ons").body);
    expect(markdownFor("/privacy").body).toBe(markdownFor("/privacybeleid").body);
    expect(markdownFor("/prijzen/").status).toBe(200);
  });

  it("geeft een 404 met uitleg en links terug voor een onbekend adres", () => {
    for (const path of ["/bestaat-niet", "/blog/onbekend", "/portfolio/onbekend"]) {
      const { status, body } = markdownFor(path);
      expect(status).toBe(404);
      expect(body.length).toBeGreaterThan(20);
      expect(body).toContain("https://bluestardevelopment.nl/llms.txt");
      expect(body).toContain("https://bluestardevelopment.nl/sitemap.xml");
    }
  });

  it("neemt geen Markdown over uit het gevraagde pad", () => {
    const { body } = markdownFor("/x%0A%0A%5Bklik%5D(https%3A%2F%2Fevil.example)");
    expect(body).not.toContain("[klik]");
    expect(body).not.toContain("(https://evil.example)");
    expect(markdownFor("/%E0%A4%A").status).toBe(404); // ongeldige codering crasht niet
  });
});
