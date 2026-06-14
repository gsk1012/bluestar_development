import { describe, it, expect } from "vitest";
import { validateContactForm } from "./validation";

describe("validateContactForm", () => {
  const valid = {
    name: "Sanne de Vries",
    email: "sanne@voorbeeld.nl",
    message: "Ik wil graag een nieuwe website.",
  };

  it("geeft een leeg object terug bij geldige invoer", () => {
    expect(validateContactForm(valid)).toEqual({});
  });

  it("geeft een fout bij een lege naam", () => {
    const errors = validateContactForm({ ...valid, name: "   " });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("geeft een fout bij een ongeldig e-mailadres", () => {
    const errors = validateContactForm({ ...valid, email: "geen-email" });
    expect(errors.email).toBeTruthy();
  });

  it("geeft een fout bij een leeg bericht", () => {
    const errors = validateContactForm({ ...valid, message: "" });
    expect(errors.message).toBeTruthy();
  });
});
