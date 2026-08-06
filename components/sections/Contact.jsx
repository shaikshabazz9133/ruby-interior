"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT, FAQ } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];

const PROJECT_TYPES = [
  "Full home interiors",
  "Modular kitchen",
  "Commercial / office",
  "Bespoke furniture",
  "Styling only",
];

const BUDGETS = ["Under ₹10L", "₹10L – ₹25L", "₹25L – ₹50L", "₹50L+"];

const EMPTY = { name: "", email: "", phone: "", type: "", budget: "", message: "" };

/** Floating-label field that lifts its label once focused or filled. */
function Field({ label, name, type = "text", value, onChange, error, textarea }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 3 : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`peer w-full resize-none border-b bg-transparent pb-2.5 pt-6 text-forest outline-none transition-colors duration-300 placeholder:text-transparent ${
          error ? "border-walnut" : "border-forest/20 focus:border-sage"
        }`}
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 origin-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          lifted
            ? "top-0 text-[10px] uppercase tracking-[0.18em] text-sage"
            : "top-5 text-base text-muted"
        }`}
      >
        {label}
      </label>

      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-left bg-sage transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-walnut"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Pill group used for project type and budget. */
function PillGroup({ label, options, value, onSelect, error }) {
  return (
    <fieldset>
      <legend className="text-[10px] uppercase tracking-[0.18em] text-sage">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option;
          return (
            <button
              type="button"
              key={option}
              onClick={() => onSelect(option)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.06em] transition-all duration-400 ${
                isActive
                  ? "border-sage bg-sage text-bone"
                  : "border-forest/15 text-muted hover:border-sage/60 hover:text-forest"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-walnut">{error}</p>}
    </fieldset>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = "That email does not look right.";
    if (form.phone.replace(/\D/g, "").length < 8)
      next.phone = "Add a number we can reach you on.";
    if (!form.type) next.type = "Pick the closest match.";
    if (form.message.trim().length < 10)
      next.message = "A sentence or two about the space, please.";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    // Wire this to your form backend (Formspree, Resend, a route handler, …).
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm(EMPTY);
  };

  return (
    <section id="contact" className="section-y bg-bone">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---------- Left: details ---------- */}
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-walnut" />
                <span className="text-eyebrow text-walnut">Get in touch</span>
              </div>
            </Reveal>

            <AnimatedText
              as="h2"
              text="Tell us about your space"
              className="text-h2 mt-5 max-w-[14ch] text-balance text-forest"
              highlight={[4]}
            />

            <Reveal variant="up" delay={0.1}>
              <p className="text-body mt-5 max-w-[40ch] text-muted">
                No hard sell, no site visit fee. Just an honest conversation
                about what your space could become and what it would genuinely
                cost.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {[
                ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
                ["Phone", CONTACT.phone, `tel:${CONTACT.phone.replace(/\s/g, "")}`],
                ["Studio", CONTACT.address, null],
                ["Hours", CONTACT.hours, null],
              ].map(([label, value, href], i) => (
                <Reveal key={label} variant="up" delay={i * 0.06}>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="group mt-1 inline-block break-words text-lg text-forest">
                      {value}
                      <span className="block h-px w-0 bg-sage transition-all duration-500 group-hover:w-full" />
                    </a>
                  ) : (
                    <p className="mt-1 max-w-[32ch] text-lg text-forest/85">{value}</p>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal variant="up" delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {CONTACT.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-forest/15 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-muted transition-all duration-400 hover:border-sage hover:text-sage"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------- Right: form ---------- */}
          <div className="lg:col-span-7">
            <Reveal variant="blur">
              <div className="rounded-sm border border-forest/10 bg-sage-pale/45 p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="flex min-h-[380px] flex-col items-center justify-center text-center"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -35 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.12, type: "spring", stiffness: 200, damping: 14 }}
                        className="grid size-16 place-items-center rounded-full border border-sage/45 bg-sage/12"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="size-7 text-sage"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M4 12.5l5 5L20 6.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3, duration: 0.55, ease: "easeOut" }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>

                      <h3 className="mt-6 text-2xl text-forest">Message received</h3>
                      <p className="text-body mt-2 max-w-[34ch] text-muted">
                        Thank you. A designer from the studio will be in touch
                        within two working days.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-[10px] uppercase tracking-[0.18em] text-sage underline-offset-4 hover:underline"
                      >
                        Send another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-7"
                    >
                      <div className="grid gap-7 sm:grid-cols-2">
                        <Field
                          label="Your name"
                          name="name"
                          value={form.name}
                          onChange={set("name")}
                          error={errors.name}
                        />
                        <Field
                          label="Email address"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          error={errors.email}
                        />
                      </div>

                      <Field
                        label="Phone number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        error={errors.phone}
                      />

                      <PillGroup
                        label="Project type"
                        options={PROJECT_TYPES}
                        value={form.type}
                        onSelect={(v) => {
                          setForm((f) => ({ ...f, type: v }));
                          setErrors((p) => ({ ...p, type: undefined }));
                        }}
                        error={errors.type}
                      />

                      <PillGroup
                        label="Indicative budget"
                        options={BUDGETS}
                        value={form.budget}
                        onSelect={(v) => setForm((f) => ({ ...f, budget: v }))}
                      />

                      <Field
                        label="Tell us about the space"
                        name="message"
                        value={form.message}
                        onChange={set("message")}
                        error={errors.message}
                        textarea
                      />

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative w-full overflow-hidden rounded-full bg-forest px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-bone transition-opacity disabled:opacity-70"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2.5">
                          {status === "sending" ? (
                            <>
                              <span className="size-3.5 animate-spin rounded-full border border-bone/35 border-t-bone" />
                              Sending
                            </>
                          ) : (
                            <>
                              Send enquiry
                              <span className="transition-transform duration-500 group-hover:translate-x-1">
                                →
                              </span>
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-sage transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                      </button>

                      <p className="text-center text-xs text-muted">
                        We reply within two working days. Your details stay with
                        our studio.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- FAQ ---------- */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <AnimatedText
              as="h3"
              text="Questions we get asked"
              className="text-h2 max-w-[12ch] text-balance text-forest"
            />
          </div>

          <ul className="lg:col-span-8">
            {FAQ.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal
                  as="li"
                  key={item.q}
                  variant="up"
                  delay={i * 0.05}
                  className="border-t border-forest/12 last:border-b"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={`text-lg transition-colors duration-400 ${
                        isOpen ? "text-sage" : "text-forest group-hover:text-sage"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-forest/15 text-muted group-hover:border-sage group-hover:text-sage"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <path d="M8 1v14M1 8h14" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-body max-w-[60ch] pb-5 pr-8 text-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
