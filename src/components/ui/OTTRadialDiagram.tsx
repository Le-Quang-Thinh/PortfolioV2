import type { OttNode } from "@/data/portfolio";
import { Icon, type IconName } from "@/components/ui/Icon";

const nodePosition: Record<OttNode["position"], string> = {
  top: "top-0 left-1/2 -translate-x-1/2",
  left: "top-1/3 left-0",
  right: "top-1/3 right-0",
  bottomLeft: "bottom-0 left-0",
  bottom: "bottom-0 left-1/2 -translate-x-1/2",
  bottomRight: "bottom-0 right-0",
};

interface OTTRadialDiagramProps {
  title: string;
  nodes: OttNode[];
}

export function OTTRadialDiagram({ title, nodes }: OTTRadialDiagramProps) {
  return (
    <div className="relative bg-cream border-[1.5px] border-ink-soft/[0.18] rounded-md px-4 pt-5 pb-[18px] shadow-card">
      <span
        className="absolute -top-[9px] right-[38px] w-[50px] h-[18px] -rotate-[1.5deg] bg-khaki/40 border-x border-khaki/[0.22]"
        aria-hidden="true"
      />

      <h3 className="font-serif italic text-[1.05rem] text-ink text-center leading-[1.4] mb-3 whitespace-pre-line">
        {title}
      </h3>

      <div className="relative h-[280px]">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 400 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(58,47,37,0.35)" />
            </marker>
          </defs>
          <line x1="200" y1="108" x2="200" y2="50" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <line x1="152" y1="128" x2="82" y2="118" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <line x1="248" y1="128" x2="318" y2="118" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <line x1="158" y1="163" x2="90" y2="210" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <line x1="200" y1="174" x2="200" y2="224" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <line x1="242" y1="163" x2="310" y2="210" stroke="rgba(58,47,37,0.3)" strokeWidth="1.4" strokeDasharray="5,3" markerEnd="url(#arr)" />
        </svg>

        <div
          className="organic-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108px] h-[68px] flex items-center justify-center text-center font-heading text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-ink leading-[1.3] z-[2] bg-white/[0.92] border-[1.8px] border-ink-soft shadow-[0_3px_12px_rgba(0,0,0,0.1)]"
        >
          OTT
          <br />
          PLATFORM
        </div>

        {nodes.map((n) => (
          <div
            key={n.name}
            className={`absolute text-center z-[3] w-[86px] ${nodePosition[n.position]}`}
          >
            <span className="flex justify-center mb-px text-ink" aria-hidden="true">
              <Icon name={n.icon as IconName} size={24} />
            </span>
            <div className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.04em] text-ink leading-[1.2]">
              {n.name}
            </div>
            <div className="font-mono text-[0.46rem] text-khaki mt-px leading-[1.3]">
              {n.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
