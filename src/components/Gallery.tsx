"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, type LucideIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { gallery, type Dict, type Lang, type ServiceKey } from "@/lib/content";
import { EASE, Photo, Reveal, SectionHeading } from "./ui";

export default function Gallery({
  t,
  lang,
  icons,
}: {
  t: Dict;
  lang: Lang;
  icons: Record<ServiceKey, LucideIcon>;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = useRef(0);

  const alt = (i: number) =>
    gallery[i].alt?.[lang] ??
    (gallery[i].src
      ? t.services.items[gallery[i].icon].title
      : `${t.gallery.placeholder}: ${t.services.items[gallery[i].icon].title}`);

  const open = (i: number) => {
    last.current = i;
    setDir(0);
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    thumbs.current[last.current]?.focus();
  }, []);
  const step = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => {
      if (i === null) return i;
      const n = (i + d + gallery.length) % gallery.length;
      last.current = n;
      return n;
    });
  }, []);

  return (
    <section id="galleri" className="bg-steel-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <button
                ref={(el) => {
                  thumbs.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={`${t.gallery.open}: ${alt(i)}`}
                className="group relative block w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-steel-200 transition-transform duration-200 active:scale-[0.98] motion-reduce:scale-none sm:rounded-2xl"
              >
                <Photo
                  src={g.src}
                  alt={alt(i)}
                  icon={icons[g.icon]}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute top-2.5 right-2.5 inline-flex size-9 scale-90 items-center justify-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
                {!g.src && (
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-copper-700 shadow-sm">
                    {t.gallery.placeholder}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        index={index}
        dir={dir}
        t={t}
        alt={index === null ? "" : alt(index)}
        icons={icons}
        onClose={close}
        onStep={step}
      />
    </section>
  );
}

const noop = () => () => {};

function Lightbox({
  index,
  dir,
  t,
  alt,
  icons,
  onClose,
  onStep,
}: {
  index: number | null;
  dir: number;
  t: Dict;
  alt: string;
  icons: Record<ServiceKey, LucideIcon>;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, onStep]);

  // Portal target only exists in the browser (static HTML has no lightbox).
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  if (!isClient) return null;

  const item = index === null ? null : gallery[index];
  const slide = reduce ? 0 : 60;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-brand-950/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-5xl px-4 sm:px-16"
            initial={reduce ? false : { scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="relative aspect-[4/3] max-h-[75vh] w-full overflow-hidden rounded-2xl sm:aspect-[3/2]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  className="absolute inset-0 touch-pan-y"
                  initial={{ opacity: 0, x: dir * slide }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -dir * slide }}
                  transition={{ duration: 0.35, ease: EASE }}
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) onStep(1);
                    else if (info.offset.x > 60) onStep(-1);
                  }}
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="object-contain"
                      draggable={false}
                    />
                  ) : (
                    <Photo src={null} alt={alt} icon={icons[item.icon]} className="h-full w-full" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-white/80">
              <p className="truncate">{alt}</p>
              <p className="shrink-0 tabular-nums">
                {index + 1} / {gallery.length}
              </p>
            </div>

            <NavButton side="left" label={t.gallery.prev} onClick={() => onStep(-1)}>
              <ChevronLeft className="size-6" />
            </NavButton>
            <NavButton side="right" label={t.gallery.next} onClick={() => onStep(1)}>
              <ChevronRight className="size-6" />
            </NavButton>
          </motion.div>

          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label={t.gallery.close}
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <X className="size-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-[calc(50%-1.25rem)] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-950/40 text-white transition hover:bg-white/25 active:scale-95 sm:bg-white/10 ${
        side === "left" ? "left-6 sm:left-1" : "right-6 sm:right-1"
      }`}
    >
      {children}
    </button>
  );
}
