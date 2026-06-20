// Pure render-functies voor de transactionele e-mails. Geen I/O.
// Tabel-gebaseerde, inline-styled HTML voor brede e-mailclient-ondersteuning.

const BRAND = {
  navy: "#081325",
  accent: "#0B5FD8",
  accentBright: "#3B9EFF",
  ink: "#0B1B30",
  inkSoft: "#3A4A60",
  surface: "#F4F8FD",
  line: "#E2E9F2",
};

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = ["06 8647 7249", "06 5335 6007"];

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function formatDate(now) {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    dateStyle: "long",
    timeStyle: "short",
  }).format(now);
}

// Gemeenschappelijke e-mail-shell (header + footer rondom de inhoud).
function shell(innerHtml) {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0; padding:0; background:${BRAND.surface};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background:#ffffff; border:1px solid ${BRAND.line}; border-radius:14px; overflow:hidden; font-family:Arial,Helvetica,sans-serif;">
<tr><td style="background:${BRAND.navy}; padding:28px 32px;">
<span style="display:inline-block; font-size:18px; font-weight:bold; letter-spacing:-0.2px; color:#ffffff;">Bluestar<span style="color:${BRAND.accentBright};"> Development</span></span>
</td></tr>
<tr><td style="height:4px; background:${BRAND.accent}; line-height:4px; font-size:0;">&nbsp;</td></tr>
${innerHtml}
<tr><td style="padding:24px 32px; background:${BRAND.surface}; border-top:1px solid ${BRAND.line};">
<p style="margin:0; font-size:12px; line-height:18px; color:${BRAND.inkSoft};">Bluestar Development &middot; <a href="https://bluestardevelopment.nl" style="color:${BRAND.accent}; text-decoration:none;">bluestardevelopment.nl</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// Bulletproof-achtige knop (tabel + link) voor Outlook-vriendelijkheid.
function button(href, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px; background:${BRAND.accent};"><a href="${href}" style="display:inline-block; padding:12px 28px; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:999px;">${label}</a></td></tr></table>`;
}

export function renderSubmissionEmail({ name, email, message, source, subject, now = new Date() } = {}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const sourceLabel = source === "blog" ? "Blog / pop-up" : "Website / contactsectie";
  const finalSubject = subject || "Nieuw bericht via bluestardevelopment.nl";

  const row = (label, valueHtml) => `
<tr>
<td style="padding:6px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:${BRAND.inkSoft}; width:120px; vertical-align:top;">${label}</td>
<td style="padding:6px 0; font-size:15px; color:${BRAND.ink};">${valueHtml}</td>
</tr>`;

  const inner = `
<tr><td style="padding:32px 32px 8px 32px;">
<h1 style="margin:0 0 4px 0; font-size:20px; color:${BRAND.ink};">Nieuw bericht</h1>
<p style="margin:0 0 20px 0; font-size:14px; color:${BRAND.inkSoft};">Iemand heeft het contactformulier ingevuld.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Naam", safeName)}
${row("E-mail", `<a href="mailto:${safeEmail}" style="color:${BRAND.accent}; text-decoration:none;">${safeEmail}</a>`)}
${row("Bron", escapeHtml(sourceLabel))}
${row("Ontvangen", escapeHtml(formatDate(now)))}
</table>
</td></tr>
<tr><td style="padding:8px 32px 0 32px;">
<div style="background:${BRAND.surface}; border-left:3px solid ${BRAND.accent}; border-radius:8px; padding:16px 18px; font-size:15px; line-height:1.6; color:${BRAND.ink};">${nl2br(message)}</div>
</td></tr>
<tr><td style="padding:24px 32px 32px 32px;">
${button(`mailto:${safeEmail}?subject=${encodeURIComponent("Re: " + finalSubject)}`, "Beantwoorden")}
</td></tr>`;

  const html = shell(inner);
  const text = [
    "Nieuw bericht via het contactformulier",
    "",
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Bron: ${sourceLabel}`,
    `Ontvangen: ${formatDate(now)}`,
    "",
    "Bericht:",
    message,
    "",
    `Beantwoorden: ${email}`,
  ].join("\n");

  return { subject: finalSubject, html, text };
}

export function renderConfirmationEmail({ name, message } = {}) {
  const safeName = escapeHtml(name);
  const subject = "We hebben je bericht ontvangen — Bluestar Development";

  const inner = `
<tr><td style="padding:32px 32px 8px 32px;">
<h1 style="margin:0 0 12px 0; font-size:20px; color:${BRAND.ink};">Bedankt voor je bericht, ${safeName}!</h1>
<p style="margin:0 0 8px 0; font-size:15px; line-height:1.6; color:${BRAND.ink};">We hebben je bericht goed ontvangen en reageren doorgaans binnen 1 werkdag.</p>
<p style="margin:0 0 20px 0; font-size:14px; color:${BRAND.inkSoft};">Dit is een kopie van wat je ons stuurde:</p>
<div style="background:${BRAND.surface}; border-left:3px solid ${BRAND.accentBright}; border-radius:8px; padding:16px 18px; font-size:15px; line-height:1.6; color:${BRAND.ink};">${nl2br(message)}</div>
</td></tr>
<tr><td style="padding:24px 32px 32px 32px;">
<p style="margin:0 0 6px 0; font-size:13px; color:${BRAND.inkSoft};">Liever direct contact?</p>
<p style="margin:0; font-size:14px; color:${BRAND.ink};">
<a href="mailto:${EMAIL}" style="color:${BRAND.accent}; text-decoration:none;">${EMAIL}</a>${PHONES.map((p) => ` &middot; ${p}`).join("")}
</p>
</td></tr>`;

  const html = shell(inner);
  const text = [
    `Bedankt voor je bericht, ${name}!`,
    "",
    "We hebben je bericht goed ontvangen en reageren doorgaans binnen 1 werkdag.",
    "",
    "Jouw bericht:",
    message,
    "",
    `Liever direct contact? ${EMAIL} · ${PHONES.join(" · ")}`,
  ].join("\n");

  return { subject, html, text };
}
