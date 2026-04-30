import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export function Experience() {
  const { experiences } = portfolioData;

  return (
    <section
      id="experience"
      className="bg-cream border-t-2 border-ink-soft/10 px-5 py-10 md:px-14 md:pt-14 md:pb-13"
    >
      <SectionHeader
        eyebrow="// 03 — Career"
        heading="Experience"
        subheading="A decade of engineering, shipping, and scaling."
      />

      <div className="relative pl-[38px]">
        <span
          aria-hidden="true"
          className="timeline-rail absolute left-[11px] top-0 bottom-0 w-[2px] opacity-35"
        />

        <ol className="list-none flex flex-col gap-7">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-[18px] w-[11px] h-[11px] rounded-full bg-rust border-2 border-cream shadow-[0_0_0_2px_var(--color-rust)]"
              />
              <FadeIn delay={i * 0.1}>
                <ExperienceCard experience={exp} />
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
