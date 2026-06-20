// api/_lib/mailer.js
// Dunne I/O-laag rond nodemailer. Apart gehouden zodat de handler test-baar is.
import nodemailer from "nodemailer";

let cached = null;

export function createTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMail(message) {
  if (!cached) cached = createTransport();
  return cached.sendMail(message);
}
