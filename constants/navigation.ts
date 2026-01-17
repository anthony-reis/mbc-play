import { Compass, Film, MonitorPlay, type LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { icon: Compass, label: "Explorar", href: "/" },
  { icon: Film, label: "Filmes", href: "/filmes" },
  { icon: MonitorPlay, label: "Series", href: "/series" },
];

export const CATEGORIES = [
  "Action",
  "Horror",
  "Adventure",
  "Animation",
  "Crime",
  "Cartoon",
  "War",
  "Sport",
  "Sci-Fi",
] as const;
