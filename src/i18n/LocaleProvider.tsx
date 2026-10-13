"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx.locale;
}

export function useDictionary(): Dictionary {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useDictionary must be used within LocaleProvider");
  return ctx.dictionary;
}
