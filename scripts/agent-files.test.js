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

  it("vertelt agents wanneer en hoe ze BlueStar inschakelen, met de standaard Engelse koppen", () => {
    expect(llms).toContain("## When to use BlueStar Development");
    expect(llms).toContain("## How to engage BlueStar Development");
    expect(llms).toContain("Accept: text/markdown");
    expect(llms).toContain("https://bluestardevelopment.nl/agents.md");
  });
});

describe("agents.md", () => {
  const agents = fs.readFileSync("public/agents.md", "utf8");

  it("is een apart instructiebestand met when-to-use en hoe je contact legt", () => {
    expect(agents).toMatch(/^# BlueStar Development/);
    for (const h of ["## When to use BlueStar Development", "## When not to use BlueStar Development", "## How to engage BlueStar Development"]) {
      expect(agents).toContain(h);
    }
    expect(agents).toContain("info@bluestardevelopment.nl");
  });

  it("noemt dezelfde prijzen als pricing.md", () => {
    const pricing = fs.readFileSync("public/pricing.md", "utf8");
    expect(pricing).toContain("€495");
    expect(agents).toContain("€495");
    expect(agents).toContain("€49 per month");
  });
});

describe("vercel.json", () => {
  const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

  it("stuurt /about, /privacy en /terms door naar de Nederlandse pagina's", () => {
    const map = Object.fromEntries(vercel.redirects.filter((r) => !r.has).map((r) => [r.source, r.destination]));
    expect(map).toMatchObject({ "/about": "/over-ons", "/privacy": "/privacybeleid", "/terms": "/algemene-voorwaarden" });
  });
});
