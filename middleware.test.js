import { describe, expect, it } from "vitest";
import middleware, { config } from "./middleware.js";

const request = (path, accept, method = "GET") =>
  new Request(`https://bluestardevelopment.nl${path}`, { method, headers: accept ? { accept } : {} });

describe("middleware", () => {
  it("geeft Markdown met Vary: Accept als de client erom vraagt", async () => {
    const res = middleware(request("/", "text/markdown"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(await res.text()).toMatch(/^# BlueStar Development/);
  });

  it("geeft bij een onbekend adres een Markdown-404", async () => {
    const res = middleware(request("/bestaat-niet", "text/markdown"));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toContain("llms.txt");
  });

  it("laat browsers door naar de HTML, met Vary: Accept", () => {
    const res = middleware(request("/", "text/html,application/xhtml+xml,*/*;q=0.8"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(res.headers.get("vary")).toBe("Accept");
  });

  it("stuurt bij HEAD geen body mee", async () => {
    const res = middleware(request("/prijzen", "text/markdown", "HEAD"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  it("draait alleen op paginapaden, niet op /api of bestanden", () => {
    const re = new RegExp(`^${config.matcher[0]}$`);
    for (const p of ["/", "/prijzen", "/blog/core-web-vitals-uitgelegd", "/bestaat-niet"]) expect(re.test(p), p).toBe(true);
    for (const p of ["/api/contact", "/llms.txt", "/assets/index.js", "/og/home.jpg"]) expect(re.test(p), p).toBe(false);
  });
});
