import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LanguageContextType {
  lang: "en" | "es";
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const toggle = () => setLang(prev => prev === "en" ? "es" : "en");
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);