"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ComponentType, type ReactNode } from "react";

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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
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
