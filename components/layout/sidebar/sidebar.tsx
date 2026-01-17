"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { NavItem } from "./nav-item";
import { CategoryList } from "./category-list";
import { SidebarToggle } from "./sidebar-toggle";
import { MENU_ITEMS } from "@/constants/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isItemActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <SidebarToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-65 flex flex-col bg-[#212121]
          pb-10 h-small:pb-6 h-xs:pb-3
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="pt-17 pb-19 h-small:pt-12 h-small:pb-8 flex items-center justify-center">
          <Logo />
        </div>

        <nav className="flex flex-col gap-7 h-small:gap-4 h-xs:gap-3 w-full mt-6 lg:mt-0 h-xs:mt-3">
          {MENU_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isItemActive(item.href)}
              onClick={closeSidebar}
            />
          ))}
        </nav>

        <CategoryList onCategoryClick={closeSidebar} />
      </aside>
    </>
  );
}
