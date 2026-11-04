import { createContext, useContext, useState, useCallback } from "react";
import nl from "./nl";
import en from "./en";

const translations = { nl, en };

// Verandert een vertaling, dan herlaadt Vite de hele pagina. Anders maakt hot
// reload een nieuwe context aan die niet bij de bestaande provider hoort, en
// crasht elke component die useLanguage() aanroept.
if (import.meta.hot) import.meta.hot.decline();

function getInitialLang() {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "nl" || stored === "en") return stored;
  } catch {
    // localStorage not available
  }
  return "nl";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
