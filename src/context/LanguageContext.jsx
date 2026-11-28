/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  lang: "en",
  toggleLang: () => {},
  setLang: () => {},
  t: () => "",
});

export const useTranslation = () => useContext(LanguageContext);

const STORAGE_KEY = "am-chapter-lang";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const urlLang = new URLSearchParams(window.location.search).get("lang");
        if (urlLang === "hi" || urlLang === "en") return urlLang;
      } catch {
        // Ignore query parsing errors
      }
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === "en" || saved === "hi") return saved;
      } catch {
        // Ignore storage errors in restricted browsing modes
      }
      const sys = navigator.language || navigator.userLanguage || "";
      return sys.toLowerCase().startsWith("hi") ? "hi" : "en";
    }
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === "hi" && typeof document !== "undefined" && !document.getElementById("am-hindi-fonts")) {
      const link = document.createElement("link");
      link.id = "am-hindi-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Serif+Devanagari:wght@600;700&display=swap";
      document.head.appendChild(link);
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      try {
        window.localStorage.setItem(STORAGE_KEY, resolved);
      } catch {
        // Ignore storage errors
      }
      return resolved;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "en" ? "hi" : "en"));
  }, [setLang]);

  const t = useCallback(
    (obj) => {
      if (!obj) return "";
      if (typeof obj === "string") return obj;
      return obj[lang] || obj.en || "";
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, toggleLang, setLang, t }),
    [lang, toggleLang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
