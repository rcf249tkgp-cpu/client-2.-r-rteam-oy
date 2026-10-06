"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { dictionaries, type Lang } from "@/lib/content";

const EVENT = "rorteam:lang";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function readLang(): Lang {
  return new URLSearchParams(window.location.search).get("lang") === "fi"
    ? "fi"
    : "sv";
}

/** Language lives in the URL (?lang=fi) so it works on a static export. */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, readLang, () => "sv" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const url = new URL(window.location.href);
    if (next === "fi") url.searchParams.set("lang", "fi");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { lang, t: dictionaries[lang], setLang };
}
