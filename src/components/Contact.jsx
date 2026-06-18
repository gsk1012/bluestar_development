import { useState } from "react";
import { Envelope, Phone } from "@phosphor-icons/react";
import { validateContactForm } from "../lib/validation";
import { useReveal } from "../lib/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [
  { label: "06 8647 7249", tel: "0686477249" },
  { label: "06 5335 6007", tel: "0653356007" },
];

const FORMSPREE_URL = "https://formspree.io/f/xlgkkboy";

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
  const [leftRef, leftVisible] = useReveal();
  const [formRef, formVisible] = useReveal();

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
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: c.emailSubject }),
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
          <div ref={leftRef} className={`reveal${leftVisible ? ' in-view' : ''}`}>
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
          </div>

          <form
            ref={formRef}
            className={`reveal rounded-rlg border border-white/10 bg-white/5 p-6 sm:p-8${formVisible ? ' in-view' : ''}`}
            noValidate
            onSubmit={handleSubmit}
          >
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

            {status === "ok" && (
              <p
                role="status"
                className="mt-4 rounded-rsm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/80"
              >
                {c.success}
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-rsm border border-accent-bright/30 bg-accent-bright/5 px-4 py-3 text-sm leading-relaxed text-accent-bright"
              >
                {c.error}{" "}
                <a href={`mailto:${EMAIL}`} className="underline">
                  {EMAIL}
                </a>{" "}
                {c.errorSuffix}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
