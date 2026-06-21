import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Envelope, Phone, CheckCircle } from "@phosphor-icons/react";
import { validateContactForm } from "../lib/validation";
import { fadeUp, vpOnce } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [
  { label: "06 8647 7249", tel: "0686477249" },
  { label: "06 5335 6007", tel: "0653356007" },
];

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
  const { t } = useLanguage();
  const c = t.contact;

  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          subject: c.emailSubject,
          source: "website",
          company: e.target.company?.value || "",
        }),
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
            viewport={vpOnce}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              {c.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              {c.body}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex min-h-[44px] self-start items-center gap-3 text-white transition-colors duration-150 hover:text-accent-bright"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-150 group-hover:border-accent-bright/30">
                  <Envelope size={20} weight="duotone" className="text-white/40 transition-colors duration-150 group-hover:text-accent-bright" />
                </span>
                <span className="font-medium">{EMAIL}</span>
              </a>

              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="group inline-flex min-h-[44px] self-start items-center gap-3 text-white transition-colors duration-150 hover:text-accent-bright"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-150 group-hover:border-accent-bright/30">
                    <Phone size={20} weight="duotone" className="text-white/40 transition-colors duration-150 group-hover:text-accent-bright" />
                  </span>
                  <span className="font-medium">{phone.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vpOnce}
            className="rounded-rlg border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "ok" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.14, duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10"
                  >
                    <CheckCircle size={24} weight="duotone" className="text-accent-bright" />
                  </motion.div>
                  <p className="font-heading text-base font-semibold text-white">{c.success}</p>
                  <p className="mt-1.5 text-sm text-white/55">We nemen zo snel mogelijk contact met je op.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 1, 1] }}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  {/* Honeypot tegen spam — onzichtbaar voor mensen, vaak ingevuld door bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                      {c.nameLabel}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder={c.namePlaceholder}
                      className={`mt-1.5 ${fieldClass}`}
                    />
                    <FieldError id="name-error" message={errors.name} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      {c.emailLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      placeholder={EMAIL}
                      className={`mt-1.5 ${fieldClass}`}
                    />
                    <FieldError id="email-error" message={errors.email} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                      {c.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      placeholder={c.messagePlaceholder}
                      className={`mt-1.5 resize-y ${fieldClass}`}
                    />
                    <FieldError id="message-error" message={errors.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97] disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? c.sending : c.submit}
                  </button>

                  {status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-4 rounded-rsm border border-accent-bright/30 bg-accent-bright/5 px-4 py-3 text-sm leading-relaxed text-accent-bright"
                    >
                      {c.error}{" "}
                      <a href={`mailto:${EMAIL}`} className="underline">
                        {EMAIL}
                      </a>{" "}
                      {c.errorSuffix}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
