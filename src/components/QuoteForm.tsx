"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { company, locations, serviceKeys, type Dict } from "@/lib/content";

const field =
  "mt-1.5 block w-full rounded-xl border border-steel-300 bg-white px-4 py-3 text-base text-ink placeholder:text-steel-400 shadow-sm transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none";

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
    <label htmlFor={htmlFor} className="text-sm font-semibold text-steel-700">
      {children}
      {required && (
        <span className="text-copper-600" title={requiredText}>
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
    <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-steel-200 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <CheckCircle2 className="size-14 text-brand-600" aria-hidden />
            <h3 className="mt-4 text-2xl font-bold text-ink">{f.thanksTitle}</h3>
            <p className="mt-2 max-w-sm text-steel-600">{f.thanksText}</p>
            <a
              href={company.phoneHref}
              className="mt-6 font-semibold text-brand-700 underline underline-offset-4"
            >
              {company.phone}
            </a>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 rounded-full border border-steel-300 px-5 py-2.5 text-sm font-semibold text-steel-700 hover:bg-steel-50"
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
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <Label htmlFor="q-name" required requiredText={f.required}>
                {f.name}
              </Label>
              <input id="q-name" name="name" required autoComplete="name" className={field} />
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
              <select id="q-location" name="location" required defaultValue="" className={field}>
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
              <select id="q-job" name="job" required defaultValue="" className={field}>
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
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-md transition hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-200 focus-visible:outline-none sm:w-auto"
              >
                <Send className="size-5" aria-hidden />
                {f.submit}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
