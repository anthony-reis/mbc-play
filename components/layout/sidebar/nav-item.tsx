"use client";

import { NavItemProps } from "@/types/sidebar/nav-item";
import Link from "next/link";

export function NavItem({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: NavItemProps) {
  return (
    <div className="relative w-full group">
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 h-small:h-6 h-xs:h-5 w-[4px] bg-white rounded-l-md shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
      )}

      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-5 h-small:gap-3 h-xs:gap-2 pl-10 h-small:pl-8 h-xs:pl-6 py-1 transition-all duration-300 ${
          isActive ? "text-white" : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon
          size={24}
          strokeWidth={2.5}
          className={`${isActive ? "text-white" : "text-inherit"} h-small:w-5 h-small:h-5 h-xs:w-4 h-xs:h-4`}
        />
        <span className="text-[17px] h-small:text-sm h-xs:text-xs font-bold tracking-wide">
          {label}
        </span>
      </Link>
    </div>
  );
}
