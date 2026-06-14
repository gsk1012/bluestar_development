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

const PLACEHOLDER_STATUS =
  "Bedankt. Dit formulier wordt binnenkort gekoppeld. Bel of mail ons gerust direct.";

const emptyForm = { name: "", email: "", message: "" };

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-accent">
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      return;
    }

    // Form verstuurt nog niet. Toon een nette placeholder-status en leeg de velden.
    setStatus(PLACEHOLDER_STATUS);
    setValues(emptyForm);
  };

  const fieldClass =
    "w-full rounded-rsm border border-line bg-bg px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <section id="contact" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
              Klaar voor een nieuwe website?
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Vertel ons over je plannen. We denken graag mee en sturen je een
              vrijblijvend voorstel.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors duration-150 hover:text-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg">
                  <Envelope size={20} weight="duotone" className="text-accent" />
                </span>
                <span className="font-medium">{EMAIL}</span>
              </a>

              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="group inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors duration-150 hover:text-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg">
                    <Phone size={20} weight="duotone" className="text-accent" />
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
            className="rounded-rmd border border-line bg-bg p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink">
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
                className={`mt-1.5 ${fieldClass}`}
              />
              <FieldError id="name-error" message={errors.name} />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium text-ink">
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
                className={`mt-1.5 ${fieldClass}`}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="block text-sm font-medium text-ink">
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
                className={`mt-1.5 resize-y ${fieldClass}`}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97] sm:w-auto"
            >
              Verstuur bericht
            </button>

            {status && (
              <p
                role="status"
                className="mt-4 rounded-rsm border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft"
              >
                {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
