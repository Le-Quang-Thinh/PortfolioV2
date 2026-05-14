"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { Send, Check } from "lucide-react";

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

export function ContactForm() {
  const [sent, setSent] = useState(false);
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
    <>
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
    </>
  );
}
