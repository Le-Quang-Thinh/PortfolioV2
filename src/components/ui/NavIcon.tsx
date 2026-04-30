import type { NavItem } from "@/data/portfolio";
import { Home, User, Briefcase, LayoutGrid, Code2, GraduationCap, Mail } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const navIconMap: Record<NavItem["iconKey"], React.ComponentType<LucideProps>> = {
  home: Home,
  about: User,
  experience: Briefcase,
  projects: LayoutGrid,
  skills: Code2,
  education: GraduationCap,
  contact: Mail,
};

interface NavIconProps {
  name: NavItem["iconKey"];
  className?: string;
}

export function NavIcon({ name, className = "" }: NavIconProps) {
  const LucideIcon = navIconMap[name];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={17}
      strokeWidth={1.75}
      className={`shrink-0 ${className}`}
      aria-hidden={true}
    />
  );
}
