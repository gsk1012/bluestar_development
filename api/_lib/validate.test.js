import { describe, it, expect } from "vitest";
import { validateSubmission, LIMITS } from "./validate.js";

const valid = { name: "Sanne", email: "sanne@voorbeeld.nl", message: "Hallo daar" };

describe("validateSubmission", () => {
  it("geeft geen fouten bij geldige invoer", () => {
    expect(validateSubmission(valid)).toEqual({});
  });
  it("geeft een fout bij een lege naam", () => {
    expect(validateSubmission({ ...valid, name: "  " }).name).toBeTruthy();
  });
  it("geeft een fout bij een ongeldig e-mailadres", () => {
    expect(validateSubmission({ ...valid, email: "geen-mail" }).email).toBeTruthy();
  });
  it("geeft een fout bij een leeg bericht", () => {
    expect(validateSubmission({ ...valid, message: "" }).message).toBeTruthy();
  });
  it("geeft een fout bij een te lang bericht", () => {
    expect(validateSubmission({ ...valid, message: "x".repeat(LIMITS.message + 1) }).message).toBeTruthy();
  });
});
