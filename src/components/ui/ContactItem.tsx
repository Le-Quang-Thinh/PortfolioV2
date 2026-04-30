import type { ReactNode } from "react";
import { SocialIcon } from "./SocialIcon";
import type { SocialIconKey } from "@/data/portfolio";

interface ContactItemProps {
  icon: SocialIconKey;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export function ContactItem({ icon, label, value, href, external }: ContactItemProps) {
  const inner: ReactNode = (
    <>
      <span className="w-[34px] h-[34px] flex-shrink-0 border border-khaki/20 rounded-sm flex items-center justify-center text-rust">
        <SocialIcon name={icon} />
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-cream/35">
          {label}
        </span>
        <span className="font-heading text-[0.8rem] text-cream tracking-[0.04em] break-all">
          {value}
        </span>
      </span>
    </>
  );

  const baseClasses =
    "flex items-center gap-3 px-[14px] py-[11px] border border-khaki/10 rounded-md bg-khaki/[0.03] transition-colors duration-200";

  if (!href) {
    return (
      <div className={`${baseClasses} cursor-default`}>
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} no-underline hover:bg-rust/[0.08] hover:border-rust/25`}
    >
      {inner}
    </a>
  );
}
