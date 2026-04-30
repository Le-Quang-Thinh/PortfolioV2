import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Skills() {
  const { skills } = portfolioData;

  return (
    <section
      id="skills"
      className="bg-cream border-t-2 border-ink-soft/10 px-5 py-10 md:px-14 md:pt-14 md:pb-13"
    >
      <SectionHeader
        eyebrow="// 05 — Technical"
        heading="Tech Stack"
        subheading="A technical reference — tools chosen with purpose."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {skills.map((cat, i) => (
          <FadeIn key={cat.id} delay={i * 0.06}>
            <div className="border border-ink-soft/12 rounded-md p-4 bg-cream-dark h-full">
              <div className="flex items-center gap-2 mb-3 pb-[10px] border-b border-ink-soft/12">
                <span className="w-[26px] h-[26px] border border-navy rounded-sm flex items-center justify-center text-navy shrink-0">
                  <Icon name={cat.icon as IconName} size={14} />
                </span>
                <span className="font-heading text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-ink">
                  {cat.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-[5px]">
                {cat.items.map((item) => (
                  <SkillBadge key={item.name} name={item.name} featured={item.featured} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
