// api/contact.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMail } from "./_lib/mailer.js";
import handler from "./contact.js";

vi.mock("./_lib/mailer.js", () => ({ sendMail: vi.fn() }));

function mockRes() {
  return {
    statusCode: 0,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.payload = body; return this; },
  };
}

const valid = { name: "Sanne", email: "sanne@voorbeeld.nl", message: "Hallo!" };

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SMTP_USER = "info@bluestardevelopment.nl";
  delete process.env.CONTACT_TO;
});

describe("contact handler", () => {
  it("weigert niet-POST met 405", async () => {
    const res = mockRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(405);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("negeert een ingevuld honeypot-veld zonder te mailen", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, company: "bot" } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("geeft 400 bij ongeldige invoer", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, email: "fout" } }, res);
    expect(res.statusCode).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("verstuurt inzending + bevestiging bij geldige invoer", async () => {
    sendMail.mockResolvedValue({});
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, source: "website" } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledTimes(2);
    const teamMail = sendMail.mock.calls[0][0];
    expect(teamMail.to).toBe("info@bluestardevelopment.nl");
    expect(teamMail.replyTo).toBe("sanne@voorbeeld.nl");
  });

  it("slaagt nog steeds als de bevestigingsmail faalt", async () => {
    sendMail.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("smtp"));
    const res = mockRes();
    await handler({ method: "POST", body: valid }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
  });
});
