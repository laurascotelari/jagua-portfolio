"use client";

import { useSyncExternalStore } from "react";
import { isDateKey, toDateKey } from "@/lib/daily";

export type CardQuery = {
  dateKey: string;
  card: string | null;
};

const QUERY_EVENT = "jagua-query";

let snapshot: { key: string; value: CardQuery } | null = null;

function readQuery(): CardQuery {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const override = params.get("date");
  const dateKey = override && isDateKey(override) ? override : toDateKey(new Date());
  const card = params.get("card");
  const key = `${search}|${dateKey}|${card ?? ""}`;
  if (snapshot?.key === key) return snapshot.value;
  const value = { dateKey, card };
  snapshot = { key, value };
  return value;
}

function subscribe(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(QUERY_EVENT, onChange);
  return () => {
    document.removeEventListener("visibilitychange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(QUERY_EVENT, onChange);
  };
}

/** Today's date, or `?date=`, plus an optional `?card=` slug. Null during SSR. */
export function useCardQuery(): CardQuery | null {
  return useSyncExternalStore(subscribe, readQuery, () => null);
}

/** Point the address bar at a day's hand without a navigation. */
export function showCardQuery(dateKey: string, slug: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("date", dateKey);
  url.searchParams.set("card", slug);
  url.hash = "cards";
  window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(QUERY_EVENT));
}
