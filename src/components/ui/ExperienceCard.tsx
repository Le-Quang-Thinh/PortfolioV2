import type { Experience, StampTone } from "@/data/portfolio";

const stampClass: Record<StampTone, string> = {
  rust: "text-rust border-rust shadow-[inset_0_0_0_1px_rgba(200,100,58,0.15)]",
  navy: "text-navy border-navy shadow-[inset_0_0_0_1px_rgba(13,86,102,0.15)]",
  khaki: "text-khaki border-khaki shadow-[inset_0_0_0_1px_rgba(138,126,106,0.15)]",
};

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="relative bg-cream-dark border border-ink-soft/12 rounded-md px-[26px] py-[22px] shadow-card before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-rust before:rounded-t-md">
      <span
        className={`absolute top-[14px] right-[18px] border-2 rounded-sm px-[9px] py-[2px] font-display text-[0.8rem] tracking-[0.15em] uppercase opacity-65 rotate-3 ${stampClass[experience.stampTone]}`}
      >
        {experience.stampText}
      </span>

      <div className="inline-flex items-center gap-[6px] bg-ink text-cream px-[10px] py-[3px] rounded-sm font-mono text-[0.6rem] tracking-[0.08em] mb-[10px]">
        {experience.period}
      </div>

      <h3 className="font-display text-[1.65rem] tracking-[0.04em] text-ink leading-none mb-[2px]">
        {experience.title}
      </h3>
      <p className="font-heading text-[0.84rem] tracking-[0.1em] text-navy uppercase font-medium mb-[14px]">
        {experience.company}
      </p>

      {experience.highlights ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {experience.highlights.map((h) => (
            <div
              key={h.label}
              className="bg-cream border border-ink-soft/10 rounded-sm px-[14px] py-[12px]"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.12em] text-rust uppercase mb-[6px]">
                {h.label}
              </p>
              <ul className="flex flex-col gap-1">
                {h.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.82rem] text-ink-soft pl-[14px] relative leading-[1.5] before:content-['→'] before:absolute before:left-0 before:text-rust before:text-[0.68rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {experience.bullets ? (
        <ul className="flex flex-col gap-1 mt-2">
          {experience.bullets.map((b) => (
            <li
              key={b}
              className="text-[0.82rem] text-ink-soft pl-[14px] relative leading-[1.5] before:content-['→'] before:absolute before:left-0 before:text-rust before:text-[0.68rem]"
            >
              {b}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-1 mt-3">
        {experience.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[0.66rem] px-[7px] py-[2px] border border-ink-soft/20 rounded-sm text-khaki bg-ink-soft/[0.04]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
