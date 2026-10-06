"use client";

import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared hover/press feedback for buttons (transform only). */
export const BTN =
  "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] motion-reduce:translate-none motion-reduce:scale-none";

const BTN_BASE = `group inline-flex h-13 items-center justify-center gap-2.5 whitespace-nowrap rounded-[3px] px-4 text-[14px] font-medium tracking-wide sm:gap-3 sm:px-6 sm:text-[15px] ${BTN}`;

/** Refined button styles. `light`/`blue` are solid, `ghost*` are outlined. */
export const btn = {
  light: `${BTN_BASE} bg-white text-ink hover:bg-paper`,
  blue: `${BTN_BASE} bg-brand-600 text-white hover:bg-brand-700`,
  dark: `${BTN_BASE} bg-ink text-white hover:bg-night-2`,
  ghostLight: `${BTN_BASE} border border-white/30 text-white hover:border-white/60 hover:bg-white/5`,
  ghostDark: `${BTN_BASE} border border-ink/20 text-ink hover:border-ink/50`,
};

/** Arrow that nudges right when its parent `group` is hovered. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={`size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 ${className}`}
    />
  );
}

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  /** `light` for use on dark backgrounds. */
  tone?: "dark" | "light";
}) {
  return (
    <svg
      viewBox="0 0 210 44"
      role="img"
      aria-label="Rörteam"
      className={className}
    >
      <g
        fontFamily="var(--font-sans), Arial, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize={40}
        letterSpacing={-0.5}
      >
        <text x="2" y="36">
          <tspan
            fill={tone === "light" ? "#c3cbd4" : "var(--color-steel-500)"}
            style={{ transition: "fill 0.3s" }}
          >
            RÖR
          </tspan>
          <tspan
            fill={
              tone === "light"
                ? "var(--color-brand-400)"
                : "var(--color-brand-600)"
            }
            style={{ transition: "fill 0.3s" }}
          >
            TEAM
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts up to `value` the first time it scrolls into view. The final value
 * is rendered on the server, so no-JS and reduced-motion users see it as is.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const target = Number(value);
  const numeric = Number.isFinite(target) && value.trim() !== "";
  // Years count up over the last stretch rather than from zero.
  const from = target >= 1000 ? target - 25 : 0;

  useEffect(() => {
    if (!numeric || reduce || !ref.current) return;
    if (!inView) {
      ref.current.textContent = String(from);
      return;
    }
    const el = ref.current;
    const controls = animate(from, target, {
      duration: target >= 1000 ? 1.6 : 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, numeric, reduce, from, target]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  );
}

/** "01 ——— Tjänster" style section label. */
export function Label({
  index,
  text,
  tone = "dark",
  className = "",
}: {
  index: string;
  text: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`flex items-center gap-4 text-[11px] font-medium tracking-[0.24em] uppercase ${
        tone === "light" ? "text-white/60" : "text-steel-600"
      } ${className}`}
    >
      <span className={tone === "light" ? "text-brand-400" : "text-brand-600"}>
        {index}
      </span>
      <motion.span
        aria-hidden
        className={`h-px w-10 origin-left ${tone === "light" ? "bg-white/30" : "bg-ink/25"}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      />
      <span>{text}</span>
    </div>
  );
}

/**
 * Asymmetric section header: label + large title on the left, an optional
 * short lead (and extra content) in a narrow right column on desktop.
 */
export function SectionHead({
  index,
  kicker,
  title,
  lead,
  tone = "dark",
  aside,
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  aside?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <Reveal className="lg:col-span-7">
        <Label index={index} text={kicker} tone={tone} />
        <h2
          className={`mt-6 font-display text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.6rem] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {(lead || aside) && (
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          {lead && (
            <p
              className={`text-base leading-relaxed sm:text-[17px] ${
                light ? "text-white/65" : "text-steel-600"
              }`}
            >
              {lead}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/**
 * A pipe run with rounded bends that draws itself in, then a soft pulse of
 * "water" keeps flowing through it.
 */
export function FlowLine({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const d =
    "M2 34 H180 Q196 34 196 20 V18 Q196 6 210 6 H330 Q344 6 344 18 V20 Q344 34 358 34 H560";
  return (
    <svg
      aria-hidden
      viewBox="0 0 562 40"
      fill="none"
      className={`block h-auto w-full overflow-visible ${className}`}
    >
      <motion.path
        d={d}
        stroke="rgb(255 255 255 / 0.28)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay }}
      />
      {!reduce && (
        <motion.path
          d={d}
          stroke="url(#flow)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0.14, pathOffset: -0.14, opacity: 0 }}
          animate={{ pathOffset: [-0.14, 1], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
            delay: delay + 1.4,
            repeat: Infinity,
            repeatDelay: 1.6,
            opacity: {
              times: [0, 0.1, 0.85, 1],
              duration: 3.2,
              delay: delay + 1.4,
              repeat: Infinity,
              repeatDelay: 1.6,
            },
          }}
        />
      )}
      <defs>
        <linearGradient id="flow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#84aae0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Photo with a branded fallback if the file is missing or fails to load. */
export function Photo({
  src,
  alt,
  className = "",
  eager = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  icon: Icon,
  imgClassName = "",
}: {
  src: string | null;
  alt: string;
  className?: string;
  /** Load immediately with high priority (hero). */
  eager?: boolean;
  sizes?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-night-2 ${className}`}>
      <div
        aria-hidden
        className="photo-fallback absolute inset-0 flex items-center justify-center"
      >
        {Icon && <Icon className="size-16 text-white/25" strokeWidth={1.25} />}
      </div>
      {src && !failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className={`object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
