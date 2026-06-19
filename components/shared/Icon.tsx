import {
  Globe,
  PhoneCall,
  Workflow,
  Send,
  Settings2,
  Bot,
  Star,
  Search,
  BarChart3,
  RefreshCw,
  Wrench,
  Stethoscope,
  Scale,
  Building2,
  Rocket,
  Landmark,
  Sparkles,
  ShoppingBag,
  Briefcase,
  HardHat,
  Box,
  type LucideIcon,
} from "lucide-react";

/** Maps content icon keys (kept as plain strings in content) to stroke icons. */
const ICONS: Record<string, LucideIcon> = {
  // Services
  "lead-site": Globe,
  receptionist: PhoneCall,
  crm: Workflow,
  outbound: Send,
  ops: Settings2,
  agents: Bot,
  reviews: Star,
  seo: Search,
  dashboards: BarChart3,
  retainer: RefreshCw,
  // Industries
  "home-services": Wrench,
  dental: Stethoscope,
  legal: Scale,
  "real-estate": Building2,
  saas: Rocket,
  financial: Landmark,
  wellness: Sparkles,
  ecommerce: ShoppingBag,
  professional: Briefcase,
  construction: HardHat,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? Box;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
