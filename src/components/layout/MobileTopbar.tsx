"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export function MobileTopbar() {
  const { profile, nav } = portfolioData;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-ink border-b border-khaki/12 z-[200] flex items-center justify-between px-4">
        <span className="font-display text-[1.1rem] tracking-[0.1em] text-rust">
          {profile.monogram}
        </span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="bg-transparent border-0 cursor-pointer flex flex-col gap-1 p-1"
        >
          <span
            className={`block w-[22px] h-[2px] rounded-[2px] bg-cream/60 transition-all duration-250 ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`block w-[22px] h-[2px] rounded-[2px] bg-cream/60 transition-all duration-250 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block w-[22px] h-[2px] rounded-[2px] bg-cream/60 transition-all duration-250 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden fixed top-14 left-0 right-0 bg-ink border-b border-khaki/12 z-[190] px-4 pt-3 pb-4 transition-transform duration-300 ease-in-out ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <ul className="flex flex-row flex-wrap gap-1 list-none">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-[10px] py-[7px] rounded-md no-underline font-heading text-[0.72rem] tracking-[0.08em] uppercase text-cream/50 hover:bg-rust/12 hover:text-rust transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
