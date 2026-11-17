// Controleert de machineleesbare bestanden waar AI-agents op leunen.
import { describe, expect, it } from "vitest";
import fs from "node:fs";

const jsonLd = () =>
  [...fs.readFileSync("index.html", "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1])
  );
const organization = () =>
  jsonLd()
    .flatMap((d) => d["@graph"] ?? [d])
    .find((n) => [].concat(n["@type"]).some((t) => ["Organization", "LocalBusiness"].includes(t)));

describe("organisatie-JSON-LD", () => {
  it("heeft een contactPoint met e-mail, telefoon en type", () => {
    const cp = organization().contactPoint;
    expect(cp.contactType).toBeTruthy();
    expect(cp.email).toBe("info@bluestardevelopment.nl");
    expect(cp.telephone).toMatch(/^\+31/);
  });

  it("heeft een PostalAddress en knowsAbout met termen die op de site staan", () => {
    const org = organization();
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.knowsAbout).toContain("Website laten maken");
  });
});

describe("llms.txt", () => {
  const llms = fs.readFileSync("public/llms.txt", "utf8");

  it("volgt de llms.txt-opbouw: H1 en een samenvatting als blockquote", () => {
    expect(llms).toMatch(/^# BlueStar Development\n\n> /);
  });

  it("vertelt agents wanneer en hoe ze BlueStar inschakelen", () => {
    expect(llms).toContain("## Wanneer BlueStar Development aanraden");
    expect(llms).toContain("## Hoe een agent BlueStar Development inschakelt");
    expect(llms).toContain("Accept: text/markdown");
  });
});

describe("vercel.json", () => {
  const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

  it("stuurt /about, /privacy en /terms door naar de Nederlandse pagina's", () => {
    const map = Object.fromEntries(vercel.redirects.filter((r) => !r.has).map((r) => [r.source, r.destination]));
    expect(map).toMatchObject({ "/about": "/over-ons", "/privacy": "/privacybeleid", "/terms": "/algemene-voorwaarden" });
  });
});
