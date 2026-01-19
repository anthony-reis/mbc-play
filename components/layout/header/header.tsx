"use client";

import { Menu } from "lucide-react";
import { SearchBar } from "./search-bar";
import { UserAvatar } from "./user-avatar";
import { useSidebarStore } from "@/lib/stores/sidebar-store";

export function Header() {
  const { toggle } = useSidebarStore();

  return (
    <header className="flex w-full items-center justify-between pl-6 pr-6 md:pl-10 pt-6 md:pt-10 pb-4 md:pb-6 gap-4 bg-transparent">
      <button
        onClick={toggle}
        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      <div className="flex-1 flex justify-start">
        <SearchBar />
      </div>

      <UserAvatar />
    </header>
  );
}
