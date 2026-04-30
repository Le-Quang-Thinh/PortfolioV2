import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

interface CTAButtonProps {
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-rust text-cream border-rust shadow-[0_2px_8px_rgba(200,100,58,0.25)] hover:bg-rust-lt hover:border-rust-lt hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(200,100,58,0.35)]",
  secondary:
    "bg-transparent text-ink border-ink-soft/30 hover:bg-ink hover:cursor-pointer hover:text-cream hover:border-ink hover:-translate-y-px",
};

const baseClass =
  "group inline-flex items-center justify-center gap-2 px-[26px] py-3 rounded-md border-2 font-heading text-[0.88rem] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer no-underline disabled:opacity-60 disabled:cursor-not-allowed";

export function CTAButton({
  href,
  type = "button",
  variant = "primary",
  children,
  icon,
  className = "",
  onClick,
  disabled,
}: CTAButtonProps) {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
}
