"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

export function Logo({ className = "" }: { className?: string }) {
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
          <tspan fill="var(--color-steel-500)">RÖR</tspan>
          <tspan fill="var(--color-brand-600)">TEAM</tspan>
        </text>
      </g>
    </svg>
  );
}

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared hover/press feedback for buttons (transform only). */
export const BTN =
  "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] motion-reduce:translate-none motion-reduce:scale-none";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
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
      transition={{ duration: 0.55, ease: EASE, delay }}
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
      duration: target >= 1000 ? 1.4 : 1,
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

/** A thin pipe run with rounded bends that draws itself in on scroll. */
export function PipeDivider({ light = false }: { light?: boolean }) {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-40px" },
  } as const;
  // [x, y, delay]: each joint pops in as the line reaches it.
  const joints = [
    [214, 30, 0.55],
    [236, 8, 0.62],
    [364, 8, 0.8],
    [386, 30, 0.87],
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-6"
    >
      <svg
        viewBox="0 0 600 40"
        className="mx-auto block h-auto w-full max-w-6xl px-4 sm:px-6"
        fill="none"
      >
        <motion.path
          d="M0 30 H206 Q218 30 218 18 V16 Q218 8 228 8 H372 Q382 8 382 16 V18 Q382 30 394 30 H600"
          stroke={light ? "rgb(255 255 255 / 0.22)" : "var(--color-brand-200)"}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {joints.map(([cx, cy, delay], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={2.6}
            fill={light ? "var(--color-copper-300)" : "var(--color-copper-500)"}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  light = false,
  center = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.14em] ${
          light ? "text-copper-300" : "text-copper-600"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-brand-100" : "text-steel-600"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/** Remote placeholder photo with a branded fallback if it fails to load. */
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  icon: Icon,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-brand-800 ${className}`}>
      <div
        aria-hidden
        className="photo-fallback absolute inset-0 flex items-center justify-center"
      >
        {Icon && <Icon className="size-20 text-white/25" strokeWidth={1.25} />}
      </div>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
