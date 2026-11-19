"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

export const THEME_STORAGE_KEY = "jagua-theme";
const THEME_EVENT = "jagua-theme-change";

function applyTheme(dark: boolean) {
  if (dark) document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function isDark(): boolean {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return document.documentElement.dataset.theme === "dark";
  }
}

export function useDarkMode(): boolean {
  return useSyncExternalStore(subscribe, isDark, () => false);
}

export function toggleTheme() {
  const next = !isDark();
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // Storage can be blocked; the attribute still toggles for this view.
  }
  applyTheme(next);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    applyTheme(isDark());
  }, []);
  return children;
}
