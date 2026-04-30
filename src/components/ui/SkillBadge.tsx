interface SkillBadgeProps {
  name: string;
  featured?: boolean;
}

export function SkillBadge({ name, featured = false }: SkillBadgeProps) {
  if (featured) {
    return (
      <span className="font-mono text-[0.7rem] px-[9px] py-1 rounded-sm border border-navy text-navy bg-navy/[0.07] transition-colors duration-150 hover:bg-ink hover:text-cream hover:border-ink hover:cursor-pointer">
        {name}
      </span>
    );
  }
  return (
    <span className="font-mono text-[0.7rem] px-[9px] py-1 rounded-sm border border-ink-soft/20 text-ink-soft bg-cream transition-colors duration-150 hover:bg-ink hover:text-cream hover:border-ink hover:cursor-pointer">
      {name}
    </span>
  );
}
