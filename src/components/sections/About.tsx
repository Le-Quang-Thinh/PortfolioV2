import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { OTTRadialDiagram } from "@/components/ui/OTTRadialDiagram";
import { Icon, type IconName } from "@/components/ui/Icon";

export function About() {
  const { profile, coreStrengths, ottDiagram } = portfolioData;

  return (
    <section
      id="about"
      className="bg-cream-dark border-t-2 border-ink-soft/10 px-5 py-10 md:px-14 md:pt-14 md:pb-13"
    >
      <SectionHeader
        eyebrow="// 02 — About Me"
        heading="Who I Am"
        subheading="Senior engineer. Platform architect. Streaming specialist."
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <FadeIn>
          <div className="flex flex-col gap-[18px]">
            {profile.bioLines.map((line) => (
              <p
                key={line}
                className="font-serif text-[1rem] leading-[1.9] text-ink-soft"
              >
                {line}
              </p>
            ))}

            <div>
              <h3 className="font-heading text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-ink border-b-2 border-ink/25 pb-[7px] mb-2">
                Core Strengths
              </h3>
              <ul className="list-none flex flex-col gap-[5px]">
                {coreStrengths.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-start gap-3 px-3 py-2 border border-ink-soft/10 rounded-md bg-cream transition-[border-color,box-shadow] duration-200 hover:cursor-pointer hover:border-navy hover:shadow-[0_2px_8px_rgba(13,86,102,0.08)]"
                  >
                    <span
                      className="w-7 h-7 shrink-0 border border-khaki rounded-sm flex items-center justify-center bg-khaki/[0.06] mt-px text-ink"
                      aria-hidden="true"
                    >
                      <Icon name={s.icon as IconName} size={15} />
                    </span>
                    <span className="flex flex-col gap-px">
                      <span className="font-heading text-[0.82rem] font-medium text-ink tracking-[0.04em] uppercase">
                        {s.name}
                      </span>
                      <span className="font-serif italic text-[0.78rem] text-ink-soft/60 leading-[1.4]">
                        {s.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <OTTRadialDiagram title={ottDiagram.title} nodes={ottDiagram.nodes} />
        </FadeIn>
      </div>
    </section>
  );
}
