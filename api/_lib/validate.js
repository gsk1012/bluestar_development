// Server-side validatie voor contactformulier-inzendingen. Onafhankelijk van de client.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = { name: 100, email: 200, message: 5000 };

export function validateSubmission({ name, email, message } = {}) {
  const errors = {};

  const n = typeof name === "string" ? name.trim() : "";
  const e = typeof email === "string" ? email.trim() : "";
  const m = typeof message === "string" ? message.trim() : "";

  if (!n) errors.name = "Naam is verplicht.";
  else if (n.length > LIMITS.name) errors.name = "Naam is te lang.";

  if (!e) errors.email = "E-mail is verplicht.";
  else if (e.length > LIMITS.email) errors.email = "E-mail is te lang.";
  else if (!EMAIL_REGEX.test(e)) errors.email = "E-mail is ongeldig.";

  if (!m) errors.message = "Bericht is verplicht.";
  else if (m.length > LIMITS.message) errors.message = "Bericht is te lang.";

  return errors;
}
