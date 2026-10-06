"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { company, locations, serviceKeys, type Dict } from "@/lib/content";
import { BTN, EASE } from "./ui";

const field =
  "mt-2 block h-12 w-full rounded-[3px] border border-ink/12 bg-paper/60 px-4 text-base text-ink placeholder:text-steel-400 transition-colors focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-0";

function Label({
  htmlFor,
  children,
  required,
  requiredText,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  requiredText: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-medium tracking-[0.18em] text-steel-600 uppercase"
    >
      {children}
      {required && (
        <span className="text-brand-600" title={requiredText}>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

export default function QuoteForm({ t }: { t: Dict }) {
  const f = t.form;
  const [sent, setSent] = useState(false);

  // Front-end only for the demo: nothing is sent anywhere.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  }

  return (
    <div className="rounded-[6px] bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <motion.span
              className="inline-flex"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1,
              }}
            >
              <CheckCircle2 className="size-14 text-brand-600" aria-hidden />
            </motion.span>
            <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
              {f.thanksTitle}
            </h3>
            <p className="mt-2 max-w-sm text-steel-600">{f.thanksText}</p>
            <a
              href={company.phoneHref}
              className="mt-6 font-display text-xl font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
            >
              {company.phone}
            </a>
            <button
              type="button"
              onClick={() => setSent(false)}
              className={`mt-6 rounded-[3px] border border-ink/15 px-5 py-3 text-sm font-medium text-ink hover:border-ink/40 ${BTN}`}
            >
              {f.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <Label htmlFor="q-name" required requiredText={f.required}>
                {f.name}
              </Label>
              <input
                id="q-name"
                name="name"
                required
                autoComplete="name"
                className={field}
              />
            </div>
            <div>
              <Label htmlFor="q-phone" required requiredText={f.required}>
                {f.phone}
              </Label>
              <input
                id="q-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                className={field}
              />
            </div>
            <div>
              <Label htmlFor="q-email" requiredText={f.required}>
                {f.email}
              </Label>
              <input
                id="q-email"
                name="email"
                type="email"
                autoComplete="email"
                className={field}
              />
            </div>
            <div>
              <Label htmlFor="q-location" required requiredText={f.required}>
                {f.location}
              </Label>
              <select
                id="q-location"
                name="location"
                required
                defaultValue=""
                className={`${field} select-chevron pr-10`}
              >
                <option value="" disabled>
                  {f.choose}
                </option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {f.locations[l]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="q-job" required requiredText={f.required}>
                {f.jobType}
              </Label>
              <select
                id="q-job"
                name="job"
                required
                defaultValue=""
                className={`${field} select-chevron pr-10`}
              >
                <option value="" disabled>
                  {f.choose}
                </option>
                {serviceKeys.map((k) => (
                  <option key={k} value={k}>
                    {t.services.items[k].title}
                  </option>
                ))}
                <option value="other">{f.jobOther}</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="q-message" requiredText={f.required}>
                {f.message}
              </Label>
              <textarea
                id="q-message"
                name="message"
                rows={5}
                placeholder={f.messagePh}
                className={`${field} h-auto py-3`}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className={`group inline-flex h-14 w-full items-center justify-center gap-3 rounded-[3px] bg-brand-600 px-8 text-[15px] font-medium tracking-wide text-white hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-200 focus-visible:outline-none sm:w-auto ${BTN}`}
              >
                <Send
                  className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-none"
                  aria-hidden
                />
                {f.submit}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
