"use client";

import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUp,
  Building,
  Building2,
  Clock,
  Droplets,
  Factory,
  Flame,
  Home,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShowerHead,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useRef } from "react";
import {
  company,
  groupKeys,
  people,
  photos,
  serviceKeys,
  type Dict,
  type GroupKey,
  type Lang,
  type ServiceKey,
} from "@/lib/content";
import Gallery from "./Gallery";
import Header from "./Header";
import QuoteForm from "./QuoteForm";
import { useLang } from "./lang";
import {
  Arrow,
  BTN,
  CountUp,
  EASE,
  FlowLine,
  Label,
  Logo,
  Photo,
  Reveal,
  SectionHead,
  btn,
} from "./ui";

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  pipes: Droplets,
  heating: Flame,
  ventilation: Wind,
  bathroom: ShowerHead,
  service: Wrench,
  projects: Factory,
};

const groupIcons: Record<GroupKey, LucideIcon> = {
  private: Home,
  housing: Building,
  business: Building2,
  municipal: Landmark,
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  company.mapQuery,
)}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  company.mapQuery,
)}`;

const pad = (n: number) => String(n).padStart(2, "0");

/** Page gutter + max width shared by every section. */
const WRAP = "mx-auto w-full max-w-7xl px-5 sm:px-8";

export default function Site() {
  const { lang, t, setLang } = useLang();

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="flex min-h-screen flex-col">
        <Header t={t} lang={lang} setLang={setLang} />

        <main className="flex-1">
          <Hero t={t} />
          <Stats t={t} />
          <Services t={t} />
          <Groups t={t} />
          <Why t={t} />
          <Shop t={t} />
          <Gallery t={t} lang={lang} icons={serviceIcons} />
          <Contact t={t} lang={lang} />
          <Quote t={t} />
        </main>

        <Footer t={t} />
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ Hero */

const heroWords: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const heroWord: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Hero({ t }: { t: Dict }) {
  const reduce = useReducedMotion();
  const words = t.hero.title.split(" ");
  const afterTitle = 0.25 + words.length * 0.07 + 0.2;
  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        initial={false}
        animate={reduce ? { scale: 1 } : { scale: [1.02, 1.12] }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 26,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      >
        <Photo
          src={photos.hero}
          alt=""
          eager
          sizes="100vw"
          className="h-full w-full"
          imgClassName="object-[50%_60%]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/80 via-night/35 to-night/95" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />

      <div
        className={`${WRAP} flex flex-1 flex-col justify-end pt-36 pb-10 sm:pb-12`}
      >
        <motion.div
          {...item(0.1)}
          className="flex items-center gap-4 text-[11px] font-medium tracking-[0.24em] text-white/70 uppercase"
        >
          <span className="h-px w-10 bg-brand-400" />
          {t.hero.eyebrow}
        </motion.div>

        <motion.h1
          variants={heroWords}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-6 max-w-[15ch] font-display text-[clamp(2.55rem,10.6vw,6.6rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance hyphens-manual"
        >
          {words.map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              <motion.span variants={heroWord} className="inline-block">
                {w}
              </motion.span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </motion.h1>

        <FlowLine
          className="mt-8 max-w-[19rem] sm:max-w-md"
          delay={afterTitle - 0.3}
        />

        <motion.p
          {...item(afterTitle)}
          className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-lg"
        >
          {t.hero.lead}
        </motion.p>

        <motion.div
          {...item(afterTitle + 0.12)}
          className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
        >
          <a
            href={company.phoneHref}
            className={`pulse-ring relative ${btn.light}`}
          >
            <Phone className="size-4" aria-hidden />
            {t.call}
          </a>
          <a href="#offert" className={btn.ghostLight}>
            {t.hero.quote}
            <Arrow />
          </a>
        </motion.div>

        <motion.ul
          {...item(afterTitle + 0.3)}
          className="mt-14 grid grid-cols-3 border-t border-white/15 sm:mt-20"
        >
          {t.hero.facts.map((f, i) => (
            <li
              key={f}
              className={`pt-4 pr-3 text-[12px] leading-snug text-white/75 sm:pt-5 sm:text-sm ${
                i > 0 ? "border-l border-white/15 pl-3 sm:pl-6" : ""
              }`}
            >
              <span className="mb-1.5 block text-[10px] tracking-[0.2em] text-brand-400">
                {pad(i + 1)}
              </span>
              {f}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Stats */

function Stats({ t }: { t: Dict }) {
  return (
    <section className="border-b border-ink/10 bg-paper py-20 sm:py-28">
      <div
        className={`${WRAP} grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10`}
      >
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[1.65rem] leading-[1.25] font-medium tracking-[-0.02em] text-ink sm:text-[2rem]">
            {t.why.lead}
          </p>
        </Reveal>
        <dl className="grid grid-cols-3 lg:col-span-6 lg:col-start-7">
          {t.why.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`flex flex-col-reverse justify-end ${
                i > 0 ? "border-l border-ink/12 pl-4 sm:pl-8" : "pr-2"
              }`}
            >
              <dt className="mt-3 text-[12px] leading-snug text-steel-600 sm:text-sm">
                {s.label}
              </dt>
              <dd className="font-display text-[2.15rem] leading-none font-medium tracking-[-0.05em] text-ink min-[400px]:text-[2.5rem] sm:text-6xl lg:text-7xl">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Services */

function Services({ t }: { t: Dict }) {
  const reduce = useReducedMotion();
  const row = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: row });
  // Show where you are in the swipeable row (starts at one card's worth).
  const progress = useTransform(scrollXProgress, [0, 1], [1 / 6, 1]);
  return (
    <section id="tjanster" className="bg-paper py-24 sm:py-32">
      <div className={WRAP}>
        <SectionHead
          index="01"
          kicker={t.services.kicker}
          title={t.services.title}
          lead={t.services.lead}
          aside={
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-steel-500">
              <span className="size-1.5 rounded-full bg-brand-600" />
              {t.services.placeholder}
            </p>
          }
        />

        {/* Swipeable row on phones and tablets, grid from lg. */}
        <div
          ref={row}
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            const s = t.services.items[key];
            return (
              <Reveal
                key={key}
                delay={(i % 3) * 0.08}
                className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
              >
                <motion.article
                  className="group h-full"
                  whileHover={reduce ? undefined : { y: -6 }}
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="relative overflow-hidden rounded-[6px]">
                    <Photo
                      src={photos[key]}
                      alt={s.title}
                      icon={Icon}
                      sizes="(min-width: 1024px) 30vw, 80vw"
                      className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100 sm:aspect-[4/3]"
                    />
                    <span className="absolute bottom-0 left-0 inline-flex size-14 items-center justify-center bg-night/85 text-white backdrop-blur-sm">
                      <Icon
                        className="size-5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="text-[11px] tracking-[0.2em] text-brand-600">
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.4rem]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-steel-600">
                        {s.text}
                      </p>
                      <span
                        aria-hidden
                        className="mt-5 block h-px w-full origin-left scale-x-[0.18] bg-ink/25 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <div aria-hidden className="mt-8 h-px bg-ink/12 lg:hidden">
          <motion.div
            className="h-px origin-left bg-ink"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Groups */

function Groups({ t }: { t: Dict }) {
  return (
    <section
      id="kunder"
      className="grain relative overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      <div className={WRAP}>
        <SectionHead
          index="02"
          kicker={t.groups.kicker}
          title={t.groups.title}
          tone="light"
        />
        <div className="mt-14 grid grid-cols-2 border-t border-white/12 lg:mt-20 lg:grid-cols-4">
          {groupKeys.map((key, i) => {
            const Icon = groupIcons[key];
            const g = t.groups.items[key];
            return (
              <Reveal
                key={key}
                delay={(i % 4) * 0.08}
                className={`group relative py-8 pr-4 sm:py-10 sm:pr-8 ${
                  i % 2 === 1 ? "border-l border-white/12 pl-5 sm:pl-8" : ""
                } ${i >= 2 ? "border-t border-white/12 lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l lg:pl-8" : ""
                }`}
              >
                <span className="text-[11px] tracking-[0.2em] text-brand-400">
                  {pad(i + 1)}
                </span>
                <Icon
                  className="mt-8 size-7 text-white/80 transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-[1.15rem] font-semibold tracking-[-0.02em] hyphens-manual min-[400px]:text-[1.3rem] sm:text-2xl">
                  {g.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed break-words hyphens-auto text-white/55 sm:text-[15px]">
                  {g.text}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Why */

function Why({ t }: { t: Dict }) {
  return (
    <section id="varfor" className="bg-paper py-24 sm:py-32">
      <div
        className={`${WRAP} grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10`}
      >
        <Reveal className="relative sm:mb-10 lg:col-span-6 lg:mb-0">
          <Photo
            src={photos.why}
            alt=""
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] rounded-[6px] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute -right-3 -bottom-10 hidden w-[46%] overflow-hidden rounded-[6px] shadow-2xl shadow-night/30 ring-8 ring-paper sm:block lg:-right-12">
            <Photo
              src={photos.detail}
              alt=""
              sizes="25vw"
              className="aspect-[4/3]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Label index="03" text={t.why.kicker} />
            <h2 className="mt-6 font-display text-[2.4rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-5xl">
              {t.why.title}
            </h2>
          </Reveal>
          <ol className="mt-10 border-t border-ink/12">
            {t.why.items.map((w, i) => (
              <li key={w.title} className="border-b border-ink/12">
                <Reveal
                  delay={i * 0.08}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-6"
                >
                  <span className="pt-1 text-[11px] tracking-[0.2em] text-brand-600">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-steel-600">
                      {w.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Shop */

function Shop({ t }: { t: Dict }) {
  return (
    <section id="butik" className="bg-white py-24 sm:py-32">
      <div className={`${WRAP} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <Reveal className="relative lg:col-span-7">
          <Photo
            src={photos.shop}
            alt={t.shop.title}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-[6px] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
          />
          <div className="absolute bottom-4 left-4 rounded-[4px] bg-night/90 px-5 py-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:px-6 sm:py-5">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/60 uppercase">
              <Clock className="size-3.5" aria-hidden />
              {t.shop.hoursLabel}
            </p>
            <p className="mt-1.5 font-display text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
              {t.shop.hours}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col lg:col-span-5">
          <Reveal>
            <Label index="04" text={t.shop.kicker} />
            <h2 className="mt-6 font-display text-[2.4rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-5xl">
              {t.shop.title}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-steel-600">
              {t.shop.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 border-t border-ink/12 text-[15px]">
              <div className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-ink/12 py-4">
                <dt className="text-steel-500">{t.shop.hoursLabel}</dt>
                <dd className="text-ink">
                  {t.shop.hours}
                  <span className="block text-steel-500">{t.shop.weekend}</span>
                </dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-ink/12 py-4">
                <dt className="text-steel-500">{t.shop.addressLabel}</dt>
                <dd className="text-ink">
                  {company.street}
                  <span className="block">{company.postal}</span>
                </dd>
              </div>
            </dl>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 ${btn.ghostDark}`}
            >
              <MapPin className="size-4" aria-hidden />
              {t.shop.directions}
              <Arrow />
            </a>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 lg:mt-auto lg:pt-10">
            <div className="overflow-hidden rounded-[6px] border border-ink/10 bg-paper">
              <iframe
                title={t.shop.mapTitle}
                src={mapSrc}
                className="block h-64 w-full grayscale-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

function Contact({ t, lang }: { t: Dict; lang: Lang }) {
  const reduce = useReducedMotion();
  const lift = reduce ? undefined : { y: -4 };
  return (
    <section
      id="kontakt"
      className="border-t border-ink/10 bg-paper py-24 sm:py-32"
    >
      <div className={WRAP}>
        <SectionHead
          index="06"
          kicker={t.contact.kicker}
          title={t.contact.title}
          lead={t.contact.lead}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {people.map((p, i) => {
            const initials = p.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <Reveal key={p.email} delay={(i % 4) * 0.08} className="h-full">
                <motion.div
                  className="flex h-full flex-col rounded-[6px] border border-ink/10 bg-white p-6 sm:p-7"
                  whileHover={lift}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div
                    aria-hidden
                    className="inline-flex size-14 items-center justify-center rounded-[4px] bg-paper font-display text-lg font-semibold tracking-tight text-ink"
                  >
                    {initials}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-1 min-h-5 text-[11px] tracking-[0.18em] text-brand-600 uppercase">
                    {p.role?.[lang]}
                  </p>
                  <div className="mt-5 border-t border-ink/10 pt-4 text-[14px] leading-7">
                    <p className="text-ink">{p.phone}</p>
                    <p className="truncate text-steel-600" title={p.email}>
                      {p.email}
                    </p>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                    <a
                      href={p.phoneHref}
                      className={`inline-flex h-11 items-center justify-center gap-2 rounded-[3px] bg-ink text-[13px] font-medium text-white hover:bg-brand-600 ${BTN}`}
                    >
                      <Phone className="size-3.5" aria-hidden />
                      {t.contact.call}
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className={`inline-flex h-11 items-center justify-center gap-2 rounded-[3px] border border-ink/15 text-[13px] font-medium text-ink hover:border-ink/40 ${BTN}`}
                    >
                      <Mail className="size-3.5" aria-hidden />
                      {t.contact.email}
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}

          <Reveal delay={0.24} className="h-full">
            <motion.div
              className="grain relative flex h-full flex-col overflow-hidden rounded-[6px] bg-night p-6 text-white sm:p-7"
              whileHover={lift}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex h-14 items-center">
                <Logo tone="light" className="h-6 w-auto" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                {t.contact.office}
              </h3>
              <p className="mt-1 min-h-5 text-[11px] tracking-[0.18em] text-brand-400 uppercase">
                {company.name}
              </p>
              <div className="mt-5 border-t border-white/12 pt-4 text-[14px] leading-7">
                <p>{company.phone}</p>
                <p className="text-white/60">{company.email}</p>
                <p className="text-white/60">
                  {company.street}, {company.postal}
                </p>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                <a
                  href={company.phoneHref}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-[3px] bg-brand-600 text-[13px] font-medium text-white hover:bg-brand-500 ${BTN}`}
                >
                  <Phone className="size-3.5" aria-hidden />
                  {t.contact.call}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-[3px] border border-white/20 text-[13px] font-medium text-white hover:border-white/50 ${BTN}`}
                >
                  <Mail className="size-3.5" aria-hidden />
                  {t.contact.email}
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Quote */

function Quote({ t }: { t: Dict }) {
  const rows = [
    {
      Icon: Phone,
      label: t.call,
      value: company.phone,
      href: company.phoneHref,
    },
    {
      Icon: Mail,
      label: t.contact.email,
      value: company.email,
      href: `mailto:${company.email}`,
    },
    { Icon: Clock, label: t.shop.hoursLabel, value: t.shop.hours, href: null },
  ];
  return (
    <section
      id="offert"
      className="grain relative overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 -z-10 opacity-25">
        <Photo
          src={photos.detail}
          alt=""
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/90 to-night/70" />

      <div className={`${WRAP} grid gap-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <Reveal>
            <Label index="07" text={t.form.kicker} tone="light" />
            <h2 className="mt-6 font-display text-[2.8rem] leading-[1] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {t.form.title}
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/65">
              {t.form.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 border-t border-white/12 text-[15px]">
              {rows.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <Icon
                      className="size-4 shrink-0 text-brand-400"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="text-white/50">{label}</span>
                    <span className="ml-auto text-right text-white">
                      {value}
                    </span>
                  </>
                );
                return (
                  <li key={label} className="border-b border-white/12">
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-4 py-4 transition-opacity hover:opacity-80"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <QuoteForm t={t} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

function Footer({ t }: { t: Dict }) {
  const links = [
    ["#tjanster", t.nav.services],
    ["#kunder", t.nav.customers],
    ["#butik", t.nav.shop],
    ["#galleri", t.nav.gallery],
    ["#kontakt", t.nav.contact],
    ["#offert", t.nav.quote],
  ] as const;

  return (
    <footer className="grain relative overflow-hidden border-t border-white/10 bg-night text-white/60">
      <div className={`${WRAP} pt-20 pb-10 sm:pt-24`}>
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" className="h-8 w-auto" />
            <p className="mt-4 text-sm">{t.tagline}</p>
            <a href={company.phoneHref} className={`mt-8 ${btn.blue}`}>
              <Phone className="size-4" aria-hidden />
              {company.phone}
            </a>
          </div>

          <div className="text-sm leading-7 lg:col-span-3 lg:col-start-6">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {company.name}
            </p>
            <p>
              {t.footer.businessId} {company.businessId}
            </p>
            <p>{company.street}</p>
            <p>{company.postal}</p>
            <p className="mt-3">
              <a
                href={`mailto:${company.email}`}
                className="text-white hover:text-brand-300"
              >
                {company.email}
              </a>
            </p>
          </div>

          <div className="text-sm leading-7 lg:col-span-2">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {t.shop.hoursLabel}
            </p>
            <p className="text-white">{t.shop.hours}</p>
            <p>{t.shop.weekend}</p>
          </div>

          <nav className="text-sm leading-7 lg:col-span-2">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {t.menu}
            </p>
            <ul>
              {links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Logo tone="light" className="mt-12 h-auto w-full opacity-[0.07]" />

        <div className="mt-8 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <p>{t.footer.site}: Fusion Sites</p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              {t.footer.top}
              <ArrowUp
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
