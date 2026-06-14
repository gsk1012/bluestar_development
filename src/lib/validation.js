// Client-side validatie voor het contactformulier.
// Geeft een errors-object terug, leeg ({}) wanneer alles geldig is.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm({ name, email, message } = {}) {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Vul je naam in.";
  }

  if (!email || email.trim() === "") {
    errors.email = "Vul je e-mailadres in.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Vul een geldig e-mailadres in.";
  }

  if (!message || message.trim() === "") {
    errors.message = "Vul een bericht in.";
  }

  return errors;
}
