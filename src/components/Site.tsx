"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
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
  Navigation,
  Phone,
  ShowerHead,
  Store,
  Timer,
  Wallet,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  company,
  groupKeys,
  people,
  photos,
  serviceKeys,
  type Dict,
  type GroupKey,
  type ServiceKey,
} from "@/lib/content";
import Header, { LangToggle } from "./Header";
import QuoteForm from "./QuoteForm";
import { useLang } from "./lang";
import { Logo, Photo, Reveal, SectionHeading } from "./ui";

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

const whyIcons: LucideIcon[] = [MapPin, Timer, Wallet];

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  company.mapQuery,
)}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  company.mapQuery,
)}`;

export default function Site() {
  const { lang, t, setLang } = useLang();

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <div className="bg-brand-950 text-white/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6">
          <span className="font-medium tracking-wide">{t.banner}</span>
          <div className="sm:hidden">
            <LangToggle lang={lang} setLang={setLang} label={t.langLabel} dark />
          </div>
        </div>
      </div>

      <Header t={t} lang={lang} setLang={setLang} />

      <main className="flex-1">
        <Hero t={t} />
        <Services t={t} />
        <Groups t={t} />
        <Shop t={t} />
        <Why t={t} />
        <Contact t={t} lang={lang} />
        <Quote t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}

function Hero({ t }: { t: Dict }) {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 + i * 0.1 },
  });

  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Photo
          src={photos.hero}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/50" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-brand-950/60" />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="max-w-3xl">
          <motion.p
            {...item(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-brand-100 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="size-2 rounded-full bg-copper-500" />
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            {...item(1)}
            className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            {...item(2)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl"
          >
            {t.hero.lead}
          </motion.p>
          <motion.div {...item(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-copper-600 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-copper-700"
            >
              <Phone className="size-5" aria-hidden />
              {t.call}
            </a>
            <a
              href="#offert"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-lg font-semibold text-brand-800 shadow-lg shadow-black/10 transition hover:bg-brand-50"
            >
              {t.hero.quote}
              <ArrowRight className="size-5" aria-hidden />
            </a>
          </motion.div>
          <motion.ul
            {...item(4)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80"
          >
            {t.hero.facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-copper-300" />
                {f}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function Services({ t }: { t: Dict }) {
  return (
    <section id="tjanster" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t.services.kicker} title={t.services.title} lead={t.services.lead} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            const s = t.services.items[key];
            return (
              <Reveal key={key} delay={(i % 3) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-steel-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <Photo
                      src={photos[key]}
                      alt={s.title}
                      icon={Icon}
                      className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-copper-700 shadow-sm">
                      {t.services.placeholder}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="relative z-10 -mt-12 mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg ring-4 ring-white">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-steel-600">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Groups({ t }: { t: Dict }) {
  return (
    <section id="kunder" className="bg-steel-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t.groups.kicker} title={t.groups.title} />
        <div className="mt-12 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {groupKeys.map((key, i) => {
            const Icon = groupIcons[key];
            const g = t.groups.items[key];
            return (
              <Reveal key={key} delay={i * 0.07}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-steel-200">
                  <div className="inline-flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{g.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-steel-600">{g.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Shop({ t }: { t: Dict }) {
  return (
    <section id="butik" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading kicker={t.shop.kicker} title={t.shop.title} lead={t.shop.lead} />
          <Reveal delay={0.1}>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl bg-brand-600 p-6 text-white shadow-lg">
                <dt className="flex items-center gap-2 text-sm font-semibold text-brand-100">
                  <Clock className="size-4" aria-hidden />
                  {t.shop.hoursLabel}
                </dt>
                <dd className="mt-2 text-xl font-bold">{t.shop.hours}</dd>
                <dd className="mt-1 text-sm text-brand-100">{t.shop.weekend}</dd>
              </div>
              <div className="rounded-2xl bg-steel-50 p-6 ring-1 ring-steel-200">
                <dt className="flex items-center gap-2 text-sm font-semibold text-steel-600">
                  <MapPin className="size-4" aria-hidden />
                  {t.shop.addressLabel}
                </dt>
                <dd className="mt-2 text-xl font-bold text-ink">{company.street}</dd>
                <dd className="mt-1 text-steel-600">{company.postal}</dd>
              </div>
            </dl>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
            >
              <Navigation className="size-4" aria-hidden />
              {t.shop.directions}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="grid gap-4">
          <Photo
            src={photos.shop}
            alt={t.shop.title}
            icon={Store}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="hidden aspect-[16/9] rounded-2xl shadow-lg sm:block"
          />
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-steel-200">
            <iframe
              title={t.shop.mapTitle}
              src={mapSrc}
              className="block h-72 w-full sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Why({ t }: { t: Dict }) {
  return (
    <section id="varfor" className="relative isolate overflow-hidden bg-brand-900 py-20 sm:py-28">
      <div aria-hidden className="photo-fallback absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading kicker={t.why.kicker} title={t.why.title} lead={t.why.lead} light />
          <div className="mt-10 grid gap-6">
            {t.why.items.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={w.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-copper-600 text-white">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{w.title}</h3>
                      <p className="mt-1 leading-relaxed text-brand-100">{w.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="relative">
            <Photo
              src={photos.why}
              alt=""
              icon={Wrench}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
            <div className="relative -mt-10 mx-3 grid grid-cols-3 divide-x divide-steel-200 rounded-2xl bg-white p-4 shadow-xl sm:mx-6 sm:p-5">
              {t.why.stats.map((s) => (
                <div key={s.label} className="px-2 text-center">
                  <p className="text-2xl font-extrabold text-brand-600 sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug font-medium text-steel-600 sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ t, lang }: { t: Dict; lang: "sv" | "fi" }) {
  return (
    <section id="kontakt" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => {
            const initials = p.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <Reveal key={p.email} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-steel-200">
                  <div className="flex items-center gap-4">
                    <div
                      aria-hidden
                      className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-lg font-bold text-white"
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                      {p.role && (
                        <p className="text-sm font-medium text-copper-600">{p.role[lang]}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 text-steel-700">{p.phone}</p>
                  <p className="truncate text-sm text-steel-600" title={p.email}>
                    {p.email}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                    <a
                      href={p.phoneHref}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                      <Phone className="size-4" aria-hidden />
                      {t.contact.call}
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-50 px-3 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
                    >
                      <Mail className="size-4" aria-hidden />
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.24}>
            <div className="flex h-full flex-col rounded-2xl bg-steel-800 p-6 text-white shadow-sm">
              <div className="flex items-center gap-4">
                <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Store className="size-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.contact.office}</h3>
                  <p className="text-sm text-steel-300">{company.name}</p>
                </div>
              </div>
              <p className="mt-5 text-white/90">{company.phone}</p>
              <p className="text-sm text-steel-300">{company.email}</p>
              <p className="mt-2 text-sm text-steel-300">
                {company.street}, {company.postal}
              </p>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-copper-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-copper-700"
                >
                  <Phone className="size-4" aria-hidden />
                  {t.contact.call}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Mail className="size-4" aria-hidden />
                  {t.contact.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Quote({ t }: { t: Dict }) {
  return (
    <section id="offert" className="bg-gradient-to-b from-steel-50 to-brand-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div>
          <SectionHeading kicker={t.form.kicker} title={t.form.title} lead={t.form.lead} />
          <Reveal delay={0.1}>
            <a
              href={company.phoneHref}
              className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-steel-200 transition hover:ring-brand-300"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-copper-600 text-white">
                <Phone className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-steel-600">{t.call}</span>
                <span className="block text-xl font-bold text-ink">{company.phone}</span>
              </span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <QuoteForm t={t} />
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Dict }) {
  return (
    <footer className="bg-brand-950 text-steel-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-lg bg-white px-3 py-2">
            <Logo className="h-7 w-auto" />
          </div>
          <p className="mt-3 text-sm">{t.tagline}</p>
        </div>
        <div className="text-sm leading-7">
          <p className="font-semibold text-white">{company.name}</p>
          <p>
            {t.footer.businessId} {company.businessId}
          </p>
          <p>{company.street}</p>
          <p>{company.postal}</p>
        </div>
        <div className="text-sm leading-7">
          <p>
            <a href={company.phoneHref} className="hover:text-white">
              {company.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${company.email}`} className="hover:text-white">
              {company.email}
            </a>
          </p>
          <p>{t.shop.hours}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </p>
          <p>{t.footer.site}: Fusion Sites</p>
        </div>
      </div>
    </footer>
  );
}
