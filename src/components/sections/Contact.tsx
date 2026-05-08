"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactItem } from "@/components/ui/ContactItem";
import { Send, Check } from "lucide-react";

export function Contact() {
  const { profile, contactSubtitle } = portfolioData;
  const [sent, setSent] = useState(false);
  // ✅ FIX #2 [Effect cleanup]: track timer ID so it can be cleared on unmount
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sent) return;
    setSent(true);
    const form = e.currentTarget;
    timerRef.current = setTimeout(() => {
      form.reset();
      setSent(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="bg-ink rounded-b-2xl px-5 py-12 md:px-14 md:pt-14 md:pb-15"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <FadeIn>
          <h2 className="font-display text-[2.6rem] md:text-[3.4rem] tracking-[0.04em] text-cream leading-none mb-[10px]">
            Let&apos;s
            <br />
            <span className="text-rust">Connect</span>
          </h2>
          <p className="font-serif italic text-[0.95rem] text-cream/45 leading-[1.75] mb-6">
            {contactSubtitle}
          </p>

          <div className="flex flex-col gap-2 mb-5">
            <ContactItem
              icon="mail"
              label="Email"
              value={profile.contact.email}
              href={`mailto:${profile.contact.email}`}
            />
            <ContactItem
              icon="phone"
              label="Phone"
              value={profile.contact.phone}
              href={`tel:${profile.contact.phoneHref}`}
            />
            {profile.socials.map((s) => (
              <ContactItem
                key={s.platform}
                icon={s.icon}
                label={s.platform}
                value={s.label}
                href={s.url}
                external
              />
            ))}
            <ContactItem
              icon="location"
              label="Location"
              value={profile.contact.location}
            />
            <ContactItem
              icon="cv"
              label="Curriculum Vitae"
              value="View / Download CV"
              href={profile.cvUrl}
              external
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="font-heading text-[0.78rem] tracking-[0.14em] uppercase text-cream/45 mb-1">
            {"// Send a message"}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <Field id="cf-name" label="Your Name" required>
                <input
                  type="text"
                  id="cf-name"
                  name="name"
                  placeholder="John Smith"
                  required
                  className={fieldInputClass}
                />
              </Field>
              <Field id="cf-email" label="Email Address" required>
                <input
                  type="email"
                  id="cf-email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  className={fieldInputClass}
                />
              </Field>
            </div>
            <Field id="cf-subject" label="Subject">
              <input
                type="text"
                id="cf-subject"
                name="subject"
                placeholder="Senior FE role / Project collaboration"
                className={fieldInputClass}
              />
            </Field>
            <Field id="cf-message" label="Message" required>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about the opportunity or project..."
                className={`${fieldInputClass} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={sent}
              className={`inline-flex items-center gap-2 self-start px-6 py-[11px] rounded-md font-heading text-[0.86rem] tracking-[0.12em] uppercase border-2 cursor-pointer transition-all duration-200 ${
                sent
                  ? "bg-navy text-cream border-navy"
                  : "bg-rust text-cream border-rust shadow-[0_2px_8px_rgba(200,100,58,0.2)] hover:bg-rust-lt hover:border-rust-lt hover:-translate-y-px"
              }`}
            >
              {sent ? "Message Sent" : "Send Message"}
              {sent
                ? <Check size={15} strokeWidth={1.75} aria-hidden />
                : <Send size={15} strokeWidth={1.75} aria-hidden />}
            </button>
          </form>
        </FadeIn>
      </div>

      <div className="mt-9 pt-[18px] border-t border-khaki/8 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
        <p className="font-serif italic text-[0.78rem] text-cream/20">
          {profile.footerQuote}
        </p>
        <p className="font-display text-[0.95rem] tracking-[0.1em] text-rust/30">
          {profile.footerSig}
        </p>
      </div>
    </section>
  );
}

const fieldInputClass =
  "bg-white/[0.04] border border-khaki/15 rounded-sm px-3 py-[10px] font-sans text-[0.88rem] text-cream placeholder:text-cream/20 outline-none transition-colors duration-200 focus:border-rust/40";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-cream/40"
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
