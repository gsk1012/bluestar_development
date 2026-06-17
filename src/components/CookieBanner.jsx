import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

const STORAGE_KEY = "cookie_consent_v1";
const EASE = [0.23, 1, 0.32, 1];

function loadConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(prefs) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...prefs, savedAt: Date.now() })
  );
}

function Toggle({ checked, onChange, disabled, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      id={id}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition-colors duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright",
        disabled
          ? "cursor-not-allowed border-accent/40 bg-accent/40"
          : checked
          ? "cursor-pointer border-accent bg-accent"
          : "cursor-pointer border-white/20 bg-white/10",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5",
          checked ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookieBanner() {
  const { t } = useLanguage();
  const ck = t.cookie;

  const [phase, setPhase] = useState("hidden");
  const [hasConsent, setHasConsent] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) {
      setPhase("banner");
    } else {
      setHasConsent(true);
      setPrefs({
        necessary: true,
        functional: stored.functional ?? false,
        analytics: stored.analytics ?? false,
        marketing: stored.marketing ?? false,
      });
    }
  }, []);

  function acceptAll() {
    const all = { necessary: true, functional: true, analytics: true, marketing: true };
    setPrefs(all);
    saveConsent(all);
    setHasConsent(true);
    setPhase("hidden");
  }

  function declineAll() {
    const minimal = { necessary: true, functional: false, analytics: false, marketing: false };
    setPrefs(minimal);
    saveConsent(minimal);
    setHasConsent(true);
    setPhase("hidden");
  }

  function saveCustom() {
    saveConsent(prefs);
    setHasConsent(true);
    setPhase("hidden");
  }

  function toggle(id) {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
  }

  const slideUp = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
      };

  return (
    <>
      {/* Floating cookie button */}
      <AnimatePresence>
        {phase === "hidden" && hasConsent && (
          <motion.button
            key="fab"
            onClick={() => setPhase("settings")}
            aria-label={ck.fabAria}
            title={ck.fabTitle}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-panel border border-white/15 shadow-lg hover:bg-accent hover:border-accent transition-colors duration-200 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor"/>
              <circle cx="13.5" cy="8" r="1" fill="currentColor"/>
              <circle cx="15" cy="13.5" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="15" r="1" fill="currentColor"/>
              <path d="M17 7c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" fill="currentColor"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {phase === "settings" && (
          <motion.div
            key="backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setPhase("hidden")}
          />
        )}
      </AnimatePresence>

      {/* Banner */}
      <AnimatePresence>
        {phase === "banner" && (
          <motion.div
            key="banner"
            role="dialog"
            aria-modal="true"
            aria-label={ck.dialogBanner}
            {...slideUp}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 p-0 md:p-4"
          >
            <div className="mx-auto max-w-4xl rounded-t-rlg md:rounded-rlg border border-white/10 bg-panel/95 backdrop-blur-md px-6 py-5 shadow-2xl">
              <p className="text-sm text-white/80 leading-relaxed">
                {ck.bannerText}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                <button
                  onClick={acceptAll}
                  className="rounded-rmd px-5 py-2 text-sm font-medium bg-accent hover:bg-accent-bright text-white transition-colors duration-200"
                >
                  {ck.acceptAll}
                </button>
                <button
                  onClick={declineAll}
                  className="rounded-rmd px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
                >
                  {ck.necessaryOnly}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <AnimatePresence>
        {phase === "settings" && (
          <motion.div
            key="settings"
            role="dialog"
            aria-modal="true"
            aria-label={ck.dialogSettings}
            {...slideUp}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl rounded-rlg border border-white/15 bg-panel shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
                <h2 className="font-heading text-base font-bold text-white">
                  {ck.settingsTitle}
                </h2>
                <button
                  onClick={() => setPhase("hidden")}
                  aria-label={ck.close}
                  className="text-white/50 hover:text-white transition-colors p-1 -mr-1 rounded"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Categories */}
              <div className="px-6 py-4 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
                {ck.categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: 0.08 + i * 0.055, ease: EASE }}
                    className="flex gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`cookie-${cat.id}`}
                        className="block text-sm font-medium text-white"
                      >
                        {cat.label}
                        {cat.required && (
                          <span className="ml-2 text-xs font-normal text-white/40">
                            {ck.alwaysActive}
                          </span>
                        )}
                      </label>
                      <p className="mt-1 text-xs text-white/55 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-0.5 shrink-0">
                      <Toggle
                        id={`cookie-${cat.id}`}
                        checked={prefs[cat.id]}
                        onChange={() => toggle(cat.id)}
                        disabled={cat.required}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.08 + ck.categories.length * 0.055 }}
                className="px-6 py-4 border-t border-white/10 flex flex-wrap gap-3"
              >
                <button
                  onClick={saveCustom}
                  className="rounded-rmd px-5 py-2 text-sm font-medium bg-accent hover:bg-accent-bright text-white transition-colors duration-200"
                >
                  {ck.saveChoice}
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-rmd px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
                >
                  {ck.acceptAll}
                </button>
                <button
                  onClick={declineAll}
                  className="rounded-rmd px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
                >
                  {ck.necessaryOnly}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
