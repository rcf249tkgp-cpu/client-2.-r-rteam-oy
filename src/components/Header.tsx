"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { company, type Dict, type Lang } from "@/lib/content";
import { Logo } from "./ui";

export function LangToggle({
  lang,
  setLang,
  label,
  dark = false,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex rounded-full p-0.5 text-sm font-semibold ${
        dark ? "bg-white/10" : "bg-steel-100"
      }`}
    >
      {(["sv", "fi"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-w-10 rounded-full px-2.5 py-1.5 uppercase transition-colors ${
            lang === l
              ? "bg-brand-600 text-white shadow-sm"
              : dark
                ? "text-white/80 hover:text-white"
                : "text-steel-600 hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header({
  t,
  lang,
  setLang,
}: {
  t: Dict;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["#tjanster", t.nav.services],
    ["#kunder", t.nav.customers],
    ["#butik", t.nav.shop],
    ["#varfor", t.nav.about],
    ["#kontakt", t.nav.contact],
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? "border-steel-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <a href="#top" className="flex shrink-0 flex-col" aria-label="Rörteam">
          <Logo className="h-7 w-auto sm:h-8" />
          <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-steel-600 sm:block">
            {t.tagline}
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-steel-700 transition-colors hover:bg-steel-50 hover:text-brand-700"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="hidden sm:block">
            <LangToggle lang={lang} setLang={setLang} label={t.langLabel} />
          </div>
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-copper-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-copper-700"
          >
            <Phone className="size-4" aria-hidden />
            <span className="sm:hidden">{t.callShort}</span>
            <span className="hidden sm:inline">{company.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.close : t.menu}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-steel-100 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-steel-200 bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-steel-50"
                >
                  {label}
                </a>
              ))}
              <a
                href="#offert"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand-600 px-5 py-3 text-center font-semibold text-white"
              >
                {t.nav.quote}
              </a>
              <div className="mt-4 flex items-center justify-between px-1 pb-1 sm:hidden">
                <span className="text-sm text-steel-600">{t.langLabel}</span>
                <LangToggle lang={lang} setLang={setLang} label={t.langLabel} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
