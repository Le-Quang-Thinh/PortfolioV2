"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { NavIcon } from "@/components/ui/NavIcon";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Sidebar({isOpen, onToggle}: {isOpen: boolean; onToggle: () => void}) {
  const { profile, nav } = portfolioData;
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((s): s is HTMLElement => s !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

return (
    <>
      {/* Toggle tab */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? "Collapse menu" : "Expand menu"}
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-[101] items-center justify-center w-7 h-14 rounded-r-md border border-l-0 bg-ink transition-all duration-300 ease-in-out ${
          isOpen
            ? "left-[calc(var(--sidebar-w-md)+1rem)] xl:left-[calc(var(--sidebar-w)+1rem)] border-khaki/25 text-cream/40 hover:text-rust hover:border-rust/35 hover:bg-rust/5"
            : "left-0 border-rust/45 text-rust/80 bg-rust/8 hover:bg-rust/15 hover:border-rust/65 hover:text-rust"
        }`}
      >
        {/* Attention pulse ring — only visible when collapsed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-r-md ring-1 ring-rust/50 animate-ping pointer-events-none" />
        )}

        {/* Chevron icon — flips direction on state change */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <polyline
            points={isOpen ? "7,1 3,5 7,9" : "3,1 7,5 3,9"}
          />
        </svg>
      </button>

      <aside
        className={`hidden md:flex sidebar-lines fixed top-4 left-4 bottom-4 w-(--sidebar-w-md) xl:w-(--sidebar-w) flex-col p-[26px_20px] z-100 overflow-hidden border border-khaki/15 rounded-2xl bg-ink shadow-[0_8px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(138,126,106,0.08)] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1.25rem)]"
        }`}
        aria-label="Primary"
      >
        <div className="relative z-[1] flex items-center gap-[10px] mb-[6px]">
          <span className="w-11 h-11 flex items-center justify-center rounded-md border-2 border-rust bg-rust/[0.08] font-display text-[1.2rem] tracking-[0.05em] text-rust flex-shrink-0">
            {profile.monogram}
          </span>
          <span className="font-heading text-[0.65rem] tracking-[0.14em] uppercase text-cream/50 leading-[1.5]">
            <strong className="block text-cream/90 text-[0.78rem] font-semibold">
              {profile.name}
            </strong>
            Senior FE Developer
          </span>
        </div>

        <hr className="relative z-[1] border-0 border-t border-khaki/12 my-[14px]" />

        <ul className="relative z-[1] list-none flex flex-col gap-[2px]">
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center gap-[10px] px-[11px] py-[9px] rounded-md no-underline font-heading text-[0.82rem] tracking-[0.08em] uppercase transition-all duration-200 border ${
                    isActive
                      ? "bg-rust/12 text-rust border-rust/25 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[60%] before:bg-rust before:rounded-r-[2px]"
                      : "text-cream/40 border-transparent hover:bg-rust/12 hover:text-cream/90 hover:border-rust/25"
                  }`}
                >
                  <NavIcon
                    name={item.iconKey}
                    className={isActive ? "opacity-100" : "opacity-45 transition-opacity"}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="relative z-[1] mt-auto">
          <div className="border border-khaki/[0.18] rounded-md p-3 bg-khaki/[0.04] mb-3">
            <div className="font-heading text-[0.62rem] tracking-[0.14em] text-khaki-lt uppercase mb-2">
              Get in touch
            </div>
            <p className="text-[0.72rem] text-cream/50 mb-[3px] flex gap-[6px] items-center">
              <SocialIcon name="mail" size={11} className="opacity-50 flex-shrink-0" />
              <span className="break-all">{profile.contact.email}</span>
            </p>
            <p className="text-[0.72rem] text-cream/50 mb-[3px] flex gap-[6px] items-center">
              <SocialIcon name="phone" size={11} className="opacity-50 flex-shrink-0" />
              <span>{profile.contact.phone}</span>
            </p>
            <p className="text-[0.72rem] text-cream/50 mb-[3px] flex gap-[6px] items-center">
              <SocialIcon name="location" size={11} className="opacity-50 flex-shrink-0" />
              <span>Ho Chi Minh City, VN</span>
            </p>
          </div>

          <div className="flex gap-[6px] mb-3">
            {profile.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="flex-1 h-[30px] border border-khaki/15 rounded-sm flex items-center justify-center text-cream/35 no-underline font-heading text-[0.7rem] tracking-[0.05em] transition-colors duration-200 hover:bg-rust/10 hover:text-rust hover:border-rust/30"
              >
                {s.short}
              </a>
            ))}
          </div>

          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[7px] w-full h-[32px] mb-3 border border-rust/30 rounded-sm no-underline font-heading text-[0.72rem] tracking-[0.1em] uppercase text-rust/70 transition-colors duration-200 hover:bg-rust/10 hover:text-rust hover:border-rust/50"
          >
            <SocialIcon name="cv" size={12} />
            View CV
          </a>

          <div className="font-mono text-[0.6rem] text-cream/20 text-center tracking-wider">
            © 2026 {profile.name}
          </div>
        </div>
      </aside>
    </>
  );
}
