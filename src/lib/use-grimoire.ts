"use client";

import { useCallback, useSyncExternalStore } from "react";
import { GRIMOIRE_KEY, parseDraws, rememberDraw, upsertDraw, type Draw } from "@/lib/grimoire";

const EMPTY: Draw[] = [];
const EVENT = "jagua-grimoire";

let memory: { raw: string | null; draws: Draw[] } | null = null;

function readDraws(): Draw[] {
  try {
    const raw = window.localStorage.getItem(GRIMOIRE_KEY);
    if (memory && memory.raw === raw) return memory.draws;
    const draws = parseDraws(raw);
    memory = { raw, draws };
    return draws;
  } catch {
    return memory?.draws ?? EMPTY;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function publish(draws: Draw[]) {
  const raw = JSON.stringify(draws);
  try {
    window.localStorage.setItem(GRIMOIRE_KEY, raw);
    memory = { raw, draws };
  } catch {
    memory = { raw: memory?.raw ?? null, draws };
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useGrimoire() {
  const draws = useSyncExternalStore(subscribe, readDraws, () => EMPTY);

  const record = useCallback((date: string, slug: string) => {
    const next = rememberDraw(readDraws(), date, slug);
    if (next === readDraws()) return;
    publish(next);
  }, []);

  const saveNote = useCallback((date: string, slug: string, note: string) => {
    publish(upsertDraw(readDraws(), { date, slug, note }));
  }, []);

  return { draws, record, saveNote };
}
