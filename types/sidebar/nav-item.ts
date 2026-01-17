import { LucideIcon } from "lucide-react";

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}
