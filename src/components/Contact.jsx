import { useState } from "react";
import { motion } from "motion/react";
import { Envelope, Phone } from "@phosphor-icons/react";
import { validateContactForm } from "../lib/validation";
import { fadeUp } from "../lib/motion";

const EMAIL = "gsinghkaur1012@gmail.com";
const PHONES = [
  { label: "06 8647 7249", tel: "0686477249" },
  { label: "06 5335 6007", tel: "0653356007" },
];

// Replace FORMSPREE_ID with the endpoint from formspree.io (e.g. "xwkgpqbe")
const FORMSPREE_ID = "FORMSPREE_ID";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const emptyForm = { name: "", email: "", message: "" };

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-accent-bright">
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "sending" | "ok" | "error" | ""

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("ok");
        setValues(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-rsm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors duration-150 focus:border-accent-bright focus:outline-none focus:ring-1 focus:ring-accent-bright";

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Klaar voor een nieuwe website?
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Vertel ons over je plannen. We denken graag mee en sturen je een
              vrijblijvend voorstel.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex min-h-[44px] items-center gap-3 text-white transition-colors duration-150 hover:text-accent-bright"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Envelope size={20} weight="duotone" className="text-accent-bright" />
                </span>
                <span className="font-medium">{EMAIL}</span>
              </a>

              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="group inline-flex min-h-[44px] items-center gap-3 text-white transition-colors duration-150 hover:text-accent-bright"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Phone size={20} weight="duotone" className="text-accent-bright" />
                  </span>
                  <span className="font-medium">{phone.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            noValidate
            onSubmit={handleSubmit}
            className="rounded-rlg border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Naam
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Gurpreet"
                className={`mt-1.5 ${fieldClass}`}
              />
              <FieldError id="name-error" message={errors.name} />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="info@bluestardevelopment.nl"
                className={`mt-1.5 ${fieldClass}`}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Bericht
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Vertel ons over je project. Wat voor site zoek je, wat is je deadline en heb je al een huisstijl?"
                className={`mt-1.5 resize-y ${fieldClass}`}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Versturen…" : "Verstuur bericht"}
            </button>

            {status === "ok" && (
              <p
                role="status"
                className="mt-4 rounded-rsm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/80"
              >
                Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-rsm border border-accent-bright/30 bg-accent-bright/5 px-4 py-3 text-sm leading-relaxed text-accent-bright"
              >
                Er ging iets mis. Stuur je bericht naar{" "}
                <a href={`mailto:${EMAIL}`} className="underline">
                  {EMAIL}
                </a>{" "}
                of bel ons direct.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
