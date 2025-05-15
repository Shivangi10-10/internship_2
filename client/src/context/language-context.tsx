import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "hi", name: "Hindi" }
];

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  availableLanguages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from local storage or use browser language as default
  const getBrowserLanguage = (): string => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return "en";
    
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) return savedLanguage;
    
    const browserLang = navigator.language.split("-")[0];
    const isSupported = languages.some(lang => lang.code === browserLang);
    return isSupported ? browserLang : "en";
  };
  
  const [language, setLanguageState] = useState<string>(getBrowserLanguage());
  
  // Update language and save to local storage
  const setLanguage = (code: string) => {
    setLanguageState(code);
    localStorage.setItem("language", code);
  };
  
  useEffect(() => {
    // Set document lang attribute for accessibility
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages: languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
