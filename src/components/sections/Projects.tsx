import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section
      id="projects"
      className="bg-cream-dark border-t-2 border-ink-soft/10 px-5 py-10 md:px-14 md:pt-14 md:pb-13"
    >
      <SectionHeader
        eyebrow="// 04 — Work"
        heading="Featured Projects"
        subheading="Platforms built, shipped, and scaled in production."
      />

      <ProjectsGrid projects={projects} />
    </section>
  );
}
