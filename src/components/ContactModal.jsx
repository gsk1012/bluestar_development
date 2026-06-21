import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Envelope, Phone, CheckCircle } from "@phosphor-icons/react";
import { validateContactForm } from "../lib/validation";

const EMAIL = "info@bluestardevelopment.nl";
const PHONES = [
  { label: "06 8647 7249", tel: "0686477249" },
  { label: "06 5335 6007", tel: "0653356007" },
];
const emptyForm = { name: "", email: "", message: "" };

const fieldClass =
  "w-full rounded-rsm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 transition-colors duration-150 focus:border-accent-bright focus:outline-none focus:ring-1 focus:ring-accent-bright";

function FieldError({ id, message }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-xs text-accent-bright">{message}</p>;
}

export default function ContactModal({ open, onClose }) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const closeRef = useRef(null);

  // Reset formulier na de exit-animatie zodat er geen flits is
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setValues(emptyForm);
      setErrors({});
      setStatus("");
    }, 300);
  }, [onClose]);

  // Sluit op Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // Focus sluiten-knop bij openen
  useEffect(() => {
    if (open) setTimeout(() => closeRef.current?.focus(), 80);
  }, [open]);

  // Vergrendel body-scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
          subject: "Nieuw bericht via blog – bluestardevelopment.nl",
          source: "blog",
          company: e.target.company?.value || "",
        }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setValues(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* Panel — sheet op mobiel, centered card op sm+ */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Plan een gesprek"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-lg rounded-t-[20px] border border-white/10 bg-[#0A1525] px-6 pb-8 pt-6 sm:inset-0 sm:m-auto sm:h-fit sm:rounded-[20px] sm:px-8 sm:py-8"
          >
            {/* Drag handle (mobiel visueel) */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden="true" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                  Plan een gesprek
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  We reageren binnen 1 werkdag.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={handleClose}
                aria-label="Sluiten"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Contactinfo strip */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-5">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-xs text-white/50 transition-colors duration-150 hover:text-accent-bright"
              >
                <Envelope size={13} weight="duotone" />
                {EMAIL}
              </a>
              {PHONES.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 text-xs text-white/50 transition-colors duration-150 hover:text-accent-bright"
                >
                  <Phone size={13} weight="duotone" />
                  {p.label}
                </a>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-6 rounded-rmd border border-white/10 bg-white/5 px-5 py-6 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.14, duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10"
                  >
                    <CheckCircle size={24} weight="duotone" className="text-accent-bright" />
                  </motion.div>
                  <p className="font-heading text-base font-semibold text-white">
                    Bedankt voor je bericht!
                  </p>
                  <p className="mt-1.5 text-sm text-white/55">
                    We nemen zo snel mogelijk contact met je op.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-5 inline-flex h-10 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white/70 transition-colors duration-150 hover:border-white/30 hover:text-white active:scale-[0.97]"
                  >
                    Sluiten
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 1, 1] }}
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-5 flex flex-col gap-4"
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
                    <label htmlFor="modal-name" className="block text-sm font-medium text-white">
                      Naam
                    </label>
                    <input
                      id="modal-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Jouw naam"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "modal-name-error" : undefined}
                      className={`mt-1.5 ${fieldClass}`}
                    />
                    <FieldError id="modal-name-error" message={errors.name} />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-white">
                      E-mail
                    </label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder={EMAIL}
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "modal-email-error" : undefined}
                      className={`mt-1.5 ${fieldClass}`}
                    />
                    <FieldError id="modal-email-error" message={errors.email} />
                  </div>

                  <div>
                    <label htmlFor="modal-message" className="block text-sm font-medium text-white">
                      Bericht
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={3}
                      value={values.message}
                      onChange={handleChange}
                      placeholder="Vertel kort wat je nodig hebt..."
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "modal-message-error" : undefined}
                      className={`mt-1.5 resize-none ${fieldClass}`}
                    />
                    <FieldError id="modal-message-error" message={errors.message} />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="rounded-rsm border border-accent-bright/30 bg-accent-bright/5 px-4 py-3 text-xs text-accent-bright">
                      Er ging iets mis. Mail ons direct op{" "}
                      <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 active:scale-[0.97] disabled:opacity-60"
                  >
                    {status === "sending" ? "Versturen..." : "Verstuur bericht"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
