// api/contact.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMail } from "./_lib/mailer.js";
import handler from "./contact.js";

vi.mock("./_lib/mailer.js", () => ({ sendMail: vi.fn() }));

// Vang de achtergrondtaken op die de handler via waitUntil inplant,
// zodat we ze in de test kunnen afwachten.
const bg = vi.hoisted(() => ({ tasks: [] }));
vi.mock("@vercel/functions", () => ({
  waitUntil: (p) => {
    bg.tasks.push(p);
  },
}));

function mockRes() {
  return {
    statusCode: 0,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.payload = body; return this; },
  };
}

// Wacht tot de op de achtergrond ingeplande mails klaar zijn.
async function flushBackground() {
  await Promise.allSettled(bg.tasks);
}

const valid = { name: "Sanne", email: "sanne@voorbeeld.nl", message: "Hallo!" };

beforeEach(() => {
  vi.clearAllMocks();
  bg.tasks.length = 0;
  process.env.SMTP_USER = "info@bluestardevelopment.nl";
  delete process.env.CONTACT_TO;
});

describe("contact handler", () => {
  it("weigert niet-POST met 405", async () => {
    const res = mockRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(405);
    expect(bg.tasks.length).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("negeert een ingevuld honeypot-veld zonder te mailen", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, company: "bot" } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
    expect(bg.tasks.length).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("geeft 400 bij ongeldige invoer", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, email: "fout" } }, res);
    expect(res.statusCode).toBe(400);
    expect(bg.tasks.length).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("antwoordt direct 200 en verstuurt de mails op de achtergrond", async () => {
    sendMail.mockResolvedValue({});
    const res = mockRes();
    await handler({ method: "POST", body: { ...valid, source: "website" } }, res);
    // Pagina krijgt meteen antwoord — een achtergrondtaak is ingepland.
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
    expect(bg.tasks.length).toBe(1);
    // Pas daarna worden de mails op de achtergrond verstuurd.
    await flushBackground();
    expect(sendMail).toHaveBeenCalledTimes(2);
    const teamMail = sendMail.mock.calls[0][0];
    expect(teamMail.to).toBe("info@bluestardevelopment.nl");
    expect(teamMail.replyTo).toBe("sanne@voorbeeld.nl");
    expect(teamMail.from).toContain("info@bluestardevelopment.nl");
  });

  it("crasht niet op een body die naar null parsed en geeft 400", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: "null" }, res);
    expect(res.statusCode).toBe(400);
    expect(bg.tasks.length).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("begrenst een te lang subject tot 200 tekens", async () => {
    sendMail.mockResolvedValue({});
    const res = mockRes();
    await handler({ method: "POST", body: { name: "Sanne", email: "sanne@voorbeeld.nl", message: "Hallo!", subject: "x".repeat(500) } }, res);
    expect(res.statusCode).toBe(200);
    await flushBackground();
    expect(sendMail.mock.calls[0][0].subject.length).toBeLessThanOrEqual(200);
  });

  it("antwoordt 200 ook als de bevestigingsmail op de achtergrond faalt", async () => {
    sendMail.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("smtp"));
    const res = mockRes();
    await handler({ method: "POST", body: valid }, res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ ok: true });
    await flushBackground();
    expect(sendMail).toHaveBeenCalledTimes(2);
  });
});
