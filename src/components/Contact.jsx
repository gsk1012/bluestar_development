import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Envelope, Phone, CheckCircle } from "@phosphor-icons/react";
import { validateContactForm } from "../lib/validation";
import { INTENT_EVENT, takePendingIntent } from "../lib/intent";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [{ label: "06 8647 7249", tel: "0686477249" }];

const emptyForm = { name: "", email: "", message: "" };

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-accent-text">
      {message}
    </p>
  );
}

/**
 * Het slotblok van de pagina: een antraciet vlak met de buitenmaatse hoek
 * linksboven, met links de uitnodiging en rechts het formulier op wit.
 *
 * @param {"white"|"bone"} [above] - kleur van de sectie erboven; die kleur
 *   vult de grond achter de ronde hoek, zodat de naad onzichtbaar is.
 */
export default function Contact({ above = "white" }) {
  const { t } = useLanguage();
  const c = t.contact;

  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // Een keuze bij de diensten of prijzen vult het bericht alvast in,
  // tenzij de bezoeker zelf al iets heeft getypt.
  useEffect(() => {
    const apply = (message) => {
      if (!message) return;
      setValues((prev) => (prev.message.trim() ? prev : { ...prev, message: message + " " }));
    };
    apply(takePendingIntent());
    const onIntent = (e) => {
      takePendingIntent();
      apply(e.detail);
    };
    window.addEventListener(INTENT_EVENT, onIntent);
    return () => window.removeEventListener(INTENT_EVENT, onIntent);
  }, []);

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

  return (
    <section id="contact" className={above === "bone" ? "bg-bone" : "bg-ground"}>
      <div className="rounded-tl-[var(--radius-big)] bg-dark py-[var(--section-gap)] text-white">
        <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:pt-6">
            <Heading
              parts={c.heading}
              className="text-white [&_.accent]:text-on-dark-soft"
            />
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">{c.body}</p>

            <p className="mt-10 text-[0.9375rem] font-semibold text-white/80">{c.directLabel}</p>
            <ul className="mt-3 border-t border-white/20">
              <li className="border-b border-white/20">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex min-h-[3.5rem] items-center gap-3 font-semibold transition-colors duration-150 hover:text-on-dark-soft"
                >
                  <Envelope size={20} aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              {PHONES.map((phone) => (
                <li key={phone.tel} className="border-b border-white/20">
                  <a
                    href={`tel:${phone.tel}`}
                    className="tabular flex min-h-[3.5rem] items-center gap-3 font-semibold transition-colors duration-150 hover:text-on-dark-soft"
                  >
                    <Phone size={20} aria-hidden="true" />
                    {phone.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card bg-ground p-[clamp(1.5rem,3vw,2.75rem)] text-ink lg:rounded-panel">
            <AnimatePresence mode="wait" initial={false}>
              {status === "ok" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                >
                  <CheckCircle size={44} weight="fill" className="text-brand" aria-hidden="true" />
                  <p className="mt-4 text-xl font-bold">{c.successTitle}</p>
                  <p className="mt-2 max-w-sm text-ink-soft">{c.successBody}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 1, 1] }}
                  noValidate
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Honeypot tegen spam: onzichtbaar voor mensen, vaak ingevuld door bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-[0.9375rem] font-semibold">
                        {c.nameLabel}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={errors.name ? "true" : undefined}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder={c.namePlaceholder}
                        className="field mt-1.5"
                      />
                      <FieldError id="name-error" message={errors.name} />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[0.9375rem] font-semibold">
                        {c.emailLabel}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={errors.email ? "true" : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder={c.emailPlaceholder}
                        className="field mt-1.5"
                      />
                      <FieldError id="email-error" message={errors.email} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[0.9375rem] font-semibold">
                      {c.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      placeholder={c.messagePlaceholder}
                      className="field mt-1.5"
                    />
                    <FieldError id="message-error" message={errors.message} />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-primary btn-large max-sm:w-full"
                    >
                      {status === "sending" ? c.sending : c.submit}
                    </button>
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-inner bg-accent-tint px-4 py-3 text-[0.9375rem] leading-relaxed text-accent-text"
                    >
                      {c.error}{" "}
                      <a href={`mailto:${EMAIL}`} className="font-semibold underline">
                        {EMAIL}
                      </a>{" "}
                      {c.errorSuffix}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
