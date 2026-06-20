// api/contact.js
// Vercel serverless functie: ontvangt contactformulier-inzendingen en mailt
// ze via Google Workspace (SMTP). Vervangt Formspree.
import { validateSubmission } from "./_lib/validate.js";
import { renderSubmissionEmail, renderConfirmationEmail } from "./_lib/mail.js";
import { sendMail } from "./_lib/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let data;
  try {
    data = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ ok: false, error: "Ongeldige aanvraag." });
  }

  // Honeypot: bots vullen dit verborgen veld — doe alsof het lukte, verstuur niets.
  if (data.company) {
    return res.status(200).json({ ok: true });
  }

  const errors = validateSubmission(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: "Ongeldige invoer.", errors });
  }

  const from = process.env.SMTP_USER;
  const to = process.env.CONTACT_TO || "info@bluestardevelopment.nl";

  try {
    const submission = renderSubmissionEmail({
      name: data.name,
      email: data.email,
      message: data.message,
      source: data.source,
      subject: data.subject,
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
    return res.status(500).json({ ok: false, error: "Verzenden mislukt." });
  }

  // Bevestigingsmail naar de bezoeker — best-effort, mag de respons niet breken.
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

  return res.status(200).json({ ok: true });
}
