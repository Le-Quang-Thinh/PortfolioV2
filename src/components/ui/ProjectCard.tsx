import type { Project } from "@/data/portfolio";
import { Icon, type IconName } from "@/components/ui/Icon";

const thumbGradient: Record<Project["thumbType"], string> = {
  tv: "bg-[linear-gradient(135deg,#1a2a4a_0%,#0d1830_100%)]",
  web: "bg-[linear-gradient(135deg,#0d3a2a_0%,#062018_100%)]",
  cms: "bg-[linear-gradient(135deg,#3a1a0d_0%,#201008_100%)]",
  cast: "bg-[linear-gradient(135deg,#0d1a3a_0%,#060d28_100%)]",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-cream border border-ink-soft/12 rounded-md overflow-hidden shadow-card transition-transform transition-shadow duration-200 hover:-translate-y-[3px] hover:shadow-lift">
      <div
        className={`relative h-[155px] flex items-center justify-center overflow-hidden ${thumbGradient[project.thumbType]}`}
      >
        <span
          className="font-display text-[2.2rem] tracking-[0.1em] text-white/[0.07] text-center select-none"
          aria-hidden="true"
        >
          {project.thumbLabel}
        </span>
        <span className="absolute opacity-55 text-white" aria-hidden="true">
          <Icon name={project.thumbIcon as IconName} size={44} />
        </span>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {project.platforms.map((p) => (
            <span
              key={p}
              className="font-mono text-[0.62rem] px-[6px] py-[2px] rounded-[3px] bg-white/10 border border-white/[0.22] text-white/75"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="px-[18px] pt-4 pb-[18px]">
        <h3 className="font-display text-[1.45rem] tracking-[0.04em] text-ink mb-[3px]">
          {project.title}
        </h3>
        <p className="font-heading text-[0.76rem] text-navy tracking-[0.08em] uppercase mb-2">
          {project.subtitle}
        </p>
        <p className="font-serif text-[0.9rem] text-ink-soft leading-[1.7] mb-[10px]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-[10px]">
          {project.metrics.map((m) => (
            <span
              key={m.text}
              className="inline-flex items-center gap-1 font-mono text-[0.68rem] text-rust bg-rust/[0.06] border border-rust/20 px-[7px] py-[3px] rounded-sm"
            >
              <Icon name={m.icon as IconName} size={12} aria-hidden={true} />
              <span>{m.text}</span>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[0.64rem] px-[6px] py-[2px] rounded-[3px] border border-ink-soft/18 text-khaki bg-ink-soft/[0.04]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
