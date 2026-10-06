"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { company, type Dict, type Lang } from "@/lib/content";
import { Arrow, BTN, EASE, Logo } from "./ui";

export function LangToggle({
  lang,
  setLang,
  label,
  tone = "dark",
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  label: string;
  /** `light` for use on dark backgrounds. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 text-xs font-medium tracking-[0.14em]"
    >
      {(["sv", "fi"] as const).map((l, i) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && (
            <span
              aria-hidden
              className={light ? "text-white/25" : "text-ink/20"}
            >
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-1.5 py-2 uppercase transition-colors ${
              lang === l
                ? light
                  ? "text-white"
                  : "text-ink"
                : light
                  ? "text-white/45 hover:text-white/80"
                  : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {l}
          </button>
        </span>
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

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock page scroll behind the full-screen menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Over the hero (and while the dark menu is open) the bar is light-on-dark.
  const solid = scrolled && !open;
  const tone = solid ? "dark" : "light";

  const links = [
    ["#tjanster", t.nav.services],
    ["#kunder", t.nav.customers],
    ["#butik", t.nav.shop],
    ["#galleri", t.nav.gallery],
    ["#varfor", t.nav.about],
    ["#kontakt", t.nav.contact],
  ] as const;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: scrolled ? -32 : 0 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        {/* Demo banner: scrolls away with the header's first 32px. */}
        <div className="relative z-10 h-8 bg-night text-white/70">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 text-[11px] tracking-[0.12em] uppercase sm:px-8">
            <span>{t.banner}</span>
            <div className="sm:hidden">
              <LangToggle
                lang={lang}
                setLang={setLang}
                label={t.langLabel}
                tone="light"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div
            aria-hidden
            className="absolute inset-0 border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            initial={false}
            animate={{ opacity: solid ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          />
          <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:h-[4.5rem] sm:px-8">
            <a
              href="#top"
              aria-label="Rörteam"
              className="shrink-0"
              onClick={() => setOpen(false)}
            >
              <Logo tone={tone} className="h-6 w-auto sm:h-7" />
            </a>

            <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className={`group relative px-3 py-2 text-[14px] transition-colors ${
                    solid
                      ? "text-ink/75 hover:text-ink"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                      solid ? "bg-ink" : "bg-white"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3 lg:ml-6">
              <div className="hidden sm:block">
                <LangToggle
                  lang={lang}
                  setLang={setLang}
                  label={t.langLabel}
                  tone={tone}
                />
              </div>
              <a
                href="#offert"
                className={`group hidden h-10 items-center gap-2.5 rounded-[3px] border px-4 text-[13px] font-medium tracking-wide transition-colors md:inline-flex ${BTN} ${
                  solid
                    ? "border-ink/20 text-ink hover:border-ink/60"
                    : "border-white/35 text-white hover:border-white/70"
                }`}
              >
                {t.nav.quote}
                <Arrow className="size-3.5" />
              </a>
              <a
                href={company.phoneHref}
                aria-label={`${t.call}: ${company.phone}`}
                className={`inline-flex h-10 items-center gap-2 rounded-[3px] bg-brand-600 px-3.5 text-[13px] font-medium text-white hover:bg-brand-700 ${BTN}`}
              >
                <Phone className="size-4" aria-hidden />
                <span className="md:hidden">{t.callShort}</span>
                <span className="hidden xl:inline">{company.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t.close : t.menu}
                className={`relative -mr-2 inline-flex size-11 items-center justify-center lg:hidden ${
                  solid ? "text-ink" : "text-white"
                }`}
              >
                <span aria-hidden className="relative block h-3 w-6">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current"
                    animate={
                      open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                  <motion.span
                    className="absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current"
                    animate={
                      open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu on mobile/tablet. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="grain fixed inset-0 z-40 flex flex-col bg-night px-5 pt-28 pb-8 sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col">
              {links.map(([href, label], i) => (
                <motion.li
                  key={href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.06 + i * 0.05,
                  }}
                  className="border-b border-white/10"
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-4 font-display text-[1.9rem] leading-none font-medium tracking-[-0.02em] text-white active:text-brand-300"
                  >
                    <span className="w-6 font-sans text-[11px] tracking-[0.2em] text-brand-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto grid gap-3"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.4 }}
            >
              <a
                href="#offert"
                onClick={() => setOpen(false)}
                className={`group inline-flex h-13 items-center justify-center gap-3 rounded-[3px] bg-white text-[15px] font-medium text-ink ${BTN}`}
              >
                {t.nav.quote}
                <Arrow />
              </a>
              <a
                href={company.phoneHref}
                className={`inline-flex h-13 items-center justify-center gap-2.5 rounded-[3px] border border-white/25 text-[15px] font-medium text-white ${BTN}`}
              >
                <Phone className="size-4" aria-hidden />
                {company.phone}
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
