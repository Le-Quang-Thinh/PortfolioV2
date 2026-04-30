import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Education() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="bg-cream-dark border-t-2 border-ink-soft/10 px-5 py-11 md:px-14 md:py-11"
    >
      <SectionHeader
        eyebrow="// 06 — Education"
        heading="Academic Background"
        subheading="The foundation of a technical mindset."
      />

      <div className="flex flex-col gap-4">
        {education.map((edu) => (
          <FadeIn key={edu.id}>
            <article className="flex items-center gap-[26px] bg-cream border border-ink-soft/12 rounded-md px-[26px] py-[22px] max-w-[680px] shadow-card">
              <span
                className="w-[52px] h-[52px] shrink-0 bg-ink rounded-md flex items-center justify-center text-cream"
                aria-hidden="true"
              >
                <Icon name={edu.icon as IconName} size={24} />
              </span>
              <div>
                <h3 className="font-display text-[1.45rem] tracking-[0.04em] text-ink">
                  {edu.degree}
                </h3>
                <p className="font-heading text-[0.84rem] text-navy tracking-[0.08em] uppercase mt-[2px]">
                  {edu.school}
                </p>
                <p className="font-mono text-[0.7rem] text-khaki mt-1">
                  {edu.years}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
