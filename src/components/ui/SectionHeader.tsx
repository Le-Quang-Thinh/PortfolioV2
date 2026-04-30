interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export function SectionHeader({ eyebrow, heading, subheading }: SectionHeaderProps) {
  return (
    <header>
      <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-rust mb-[5px]">
        {eyebrow}
      </div>
      <h2 className="font-display text-[3rem] leading-none tracking-[0.04em] text-ink mb-[6px]">
        {heading}
      </h2>
      <p className="font-serif italic text-[1rem] text-khaki mb-4">
        {subheading}
      </p>
      <hr className="border-0 border-t-2 border-ink opacity-10 mb-7" />
    </header>
  );
}
