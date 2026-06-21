// api/contact.js
// Vercel serverless functie: ontvangt contactformulier-inzendingen en mailt
// ze via Google Workspace (SMTP). Vervangt Formspree.
import { waitUntil } from "@vercel/functions";
import { validateSubmission } from "./_lib/validate.js";
import { renderSubmissionEmail, renderConfirmationEmail } from "./_lib/mail.js";
import { sendMail } from "./_lib/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Methode niet toegestaan." });
  }

  let data;
  try {
    data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: "Ongeldige aanvraag." });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) data = {};

  // Honeypot: bots vullen dit verborgen veld — doe alsof het lukte, verstuur niets.
  if (data.company) {
    return res.status(200).json({ ok: true });
  }

  const errors = validateSubmission(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: "Ongeldige invoer.", errors });
  }

  // Subject komt van de client — strip controltekens en begrens de lengte.
  const safeSubject =
    typeof data.subject === "string"
      ? data.subject.replace(/[\r\n]+/g, " ").trim().slice(0, 200)
      : undefined;

  const from = process.env.SMTP_USER;
  const to = process.env.CONTACT_TO || "info@bluestardevelopment.nl";

  // Verstuur de mails op de achtergrond, zodat de bezoeker niet op SMTP hoeft te
  // wachten. waitUntil houdt de serverless functie in leven tot de verzending klaar
  // is; de pagina krijgt direct een 200.
  waitUntil(deliverEmails({ data, from, to, safeSubject }));

  return res.status(200).json({ ok: true });
}

// Verstuurt de inzending naar het team en een bevestiging naar de bezoeker.
// Best-effort: een fout wordt gelogd (zichtbaar in de Vercel-logs) maar laat de
// rest doorgaan, want de bezoeker heeft al een bevestiging op de pagina gekregen.
async function deliverEmails({ data, from, to, safeSubject }) {
  try {
    const submission = renderSubmissionEmail({
      name: data.name,
      email: data.email,
      message: data.message,
      source: data.source,
      subject: safeSubject,
    });
    await sendMail({
      from: `"Bluestar Website" <${from}>`,
      to,
      replyTo: data.email,
      subject: submission.subject,
      html: submission.html,
      text: submission.text,
    });
  } catch (err) {
    console.error("Inzending versturen mislukt:", err);
  }

  try {
    const confirmation = renderConfirmationEmail({
      name: data.name,
      message: data.message,
    });
    await sendMail({
      from: `"Bluestar Development" <${from}>`,
      to: data.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch (err) {
    console.error("Bevestigingsmail mislukt:", err);
  }
}
