import { describe, it, expect } from "vitest";
import { renderSubmissionEmail, renderConfirmationEmail, escapeHtml } from "./mail.js";

describe("escapeHtml", () => {
  it("escapet HTML-tekens", () => {
    expect(escapeHtml('<b>"x"</b>')).toBe("&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
  });
});

describe("renderSubmissionEmail", () => {
  const data = {
    name: "Sanne",
    email: "sanne@voorbeeld.nl",
    message: "Regel 1\nRegel 2",
    source: "website",
    now: new Date("2026-06-21T10:00:00Z"),
  };

  it("levert subject, html en text", () => {
    const out = renderSubmissionEmail(data);
    expect(out.subject).toBeTruthy();
    expect(out.html).toContain("<!DOCTYPE html>");
    expect(typeof out.text).toBe("string");
  });

  it("bevat naam, e-mail en bericht met witregels als <br>", () => {
    const out = renderSubmissionEmail(data);
    expect(out.html).toContain("Sanne");
    expect(out.html).toContain("sanne@voorbeeld.nl");
    expect(out.html).toContain("Regel 1<br>Regel 2");
    expect(out.text).toContain("Regel 1\nRegel 2");
  });

  it("escapet HTML in het bericht", () => {
    const out = renderSubmissionEmail({ ...data, message: "<script>x</script>" });
    expect(out.html).not.toContain("<script>x");
    expect(out.html).toContain("&lt;script&gt;");
  });
});

describe("renderConfirmationEmail", () => {
  it("groet de bezoeker en toont het bericht", () => {
    const out = renderConfirmationEmail({ name: "Sanne", message: "Hoi" });
    expect(out.subject).toContain("ontvangen");
    expect(out.html).toContain("Sanne");
    expect(out.html).toContain("Hoi");
    expect(out.text).toContain("Sanne");
  });
});
