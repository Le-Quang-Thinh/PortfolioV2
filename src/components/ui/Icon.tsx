import {
  Home, User, Briefcase, LayoutGrid, Code2, GraduationCap, Mail,
  Phone, Link2, GitBranch, MapPin,
  ArrowRight, Send, Check,
  Tv, Zap, Building2, Wrench, Target,
  Laptop, Smartphone, Cast, Radio, BarChart3,
  Braces, Atom, FlaskConical,
  Globe, Settings,
  Package, Lock, Rocket, CreditCard, Users, ShieldCheck, Cloud, Calendar, RefreshCw,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const iconMap = {
  Home, User, Briefcase, LayoutGrid, Code2, GraduationCap, Mail,
  Phone, Link2, GitBranch, MapPin,
  ArrowRight, Send, Check,
  Tv, Zap, Building2, Wrench, Target,
  Laptop, Smartphone, Cast, Radio, BarChart3,
  Braces, Atom, FlaskConical,
  Globe, Settings,
  Package, Lock, Rocket, CreditCard, Users, ShieldCheck, Cloud, Calendar, RefreshCw,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  const LucideIcon = iconMap[name];
  return <LucideIcon size={size} strokeWidth={strokeWidth} {...rest} />;
}
