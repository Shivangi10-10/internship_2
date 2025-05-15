import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export const useTranslate = (originalText: string) => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>(originalText);
  
  // Only fetch translation if language is not English and text exists
  const shouldTranslate = language !== "en" && !!originalText;
  
  const { isLoading, error } = useQuery({
    queryKey: [`/api/translate/${language}/${encodeURIComponent(originalText)}`],
    queryFn: async () => {
      try {
        const response = await apiRequest("POST", "/api/translate", {
          text: originalText,
          targetLanguage: language
        });
        const data = await response.json();
        
        if (data.translation) {
          setTranslatedText(data.translation);
          return data.translation;
        }
        return originalText;
      } catch (err) {
        console.error("Translation error:", err);
        return originalText;
      }
    },
    enabled: shouldTranslate,
    staleTime: 60 * 60 * 1000, // Cache translations for an hour
  });
  
  return {
    text: language === "en" ? originalText : translatedText,
    isLoading,
    error,
  };
};
