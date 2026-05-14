"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        {projects.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.05}>
            <button
              type="button"
              className="w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-cream-dark rounded-md"
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
              aria-label={`View case study: ${p.title}`}
            >
              <ProjectCard project={p} />
            </button>
          </FadeIn>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
