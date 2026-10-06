"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { company, type Dict, type Lang } from "@/lib/content";
import { BTN, EASE, Logo } from "./ui";

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
          className={`min-w-10 rounded-full px-2.5 py-1.5 uppercase transition duration-200 active:scale-95 motion-reduce:scale-none ${
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
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Reduced motion: keep the frosted background, skip the shrink.
  const compact = scrolled && !reduce;

  const links = [
    ["#tjanster", t.nav.services],
    ["#kunder", t.nav.customers],
    ["#butik", t.nav.shop],
    ["#varfor", t.nav.about],
    ["#kontakt", t.nav.contact],
  ] as const;

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={false}
      animate={{ y: compact ? -8 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Solid at the top; frosted glass with a hairline once scrolled. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white"
        initial={false}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-steel-200 bg-white/90 shadow-sm backdrop-blur-md"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6"
        initial={false}
        animate={{ y: compact ? 4 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.a
          href="#top"
          className="flex shrink-0 origin-left flex-col"
          aria-label="Rörteam"
          initial={false}
          animate={{ scale: compact ? 0.9 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Logo className="h-7 w-auto sm:h-8" />
          <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-steel-600 sm:block">
            {t.tagline}
          </span>
        </motion.a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="group relative rounded-md px-3 py-2 text-[15px] font-medium text-steel-700 transition-colors hover:text-brand-700"
            >
              {label}
              <span
                aria-hidden
                className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-brand-600 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="hidden sm:block">
            <LangToggle lang={lang} setLang={setLang} label={t.langLabel} />
          </div>
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 rounded-full bg-copper-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-copper-700 ${BTN}`}
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
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-steel-100 active:bg-steel-200 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="inline-flex"
              >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Overlays the page (absolute) so opening it never shifts content. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-y border-steel-200 bg-white shadow-lg lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-lg font-medium text-ink transition-colors hover:bg-steel-50 active:bg-steel-100"
                >
                  {label}
                </a>
              ))}
              <a
                href="#offert"
                onClick={() => setOpen(false)}
                className={`mt-2 rounded-full bg-brand-600 px-5 py-3 text-center font-semibold text-white ${BTN}`}
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
    </motion.header>
  );
}
