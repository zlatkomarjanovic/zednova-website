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
  Stethoscope,
  Rocket,
  Sparkles,
  ShoppingBag,
  Box,
  Cpu,
  Code2,
  Leaf,
  Pill,
  Store,
  Package,
  Activity,
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
  // Industry parents & subs
  healthcare: Stethoscope,
  dental: Stethoscope,
  medical: Stethoscope,
  peptide: Pill,
  trt: Activity,
  longevity: Sparkles,
  wellness: Sparkles,
  aesthetic: Sparkles,
  ecommerce: ShoppingBag,
  shopify: Store,
  dtc: ShoppingBag,
  product: Package,
  supplement: Pill,
  "wellness-ecom": Leaf,
  saas: Rocket,
  ai: Bot,
  software: Code2,
  tech: Cpu,
  "custom-software": Code2,
  "wellness-clinic": Sparkles,
  beauty: Sparkles,
  fitness: Activity,
  "local-clinic": Stethoscope,
  appointment: PhoneCall,
  team: Workflow,
  spreadsheet: BarChart3,
  migration: RefreshCw,
  portal: Globe,
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
