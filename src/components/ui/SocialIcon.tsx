import type { SocialIconKey } from "@/data/portfolio";
import { Mail, Phone, Link2, GitBranch, MapPin } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const socialIconMap: Record<SocialIconKey, React.ComponentType<LucideProps>> = {
  mail: Mail,
  phone: Phone,
  linkedin: Link2,
  github: GitBranch,
  location: MapPin,
};

interface SocialIconProps {
  name: SocialIconKey;
  size?: number;
  className?: string;
}

export function SocialIcon({ name, size = 17, className = "" }: SocialIconProps) {
  const LucideIcon = socialIconMap[name];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={size}
      strokeWidth={1.75}
      className={className}
      aria-hidden={true}
    />
  );
}
