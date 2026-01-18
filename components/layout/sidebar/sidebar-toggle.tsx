"use client";

import { Menu, X } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed md:top-10 top-5 left-1 z-50 lg:hidden p-2 rounded-lg bg-dark-300 hover:bg-dark-100 transition-colors"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
    >
      {isOpen ? (
        <X size={24} className="text-white" />
      ) : (
        <Menu size={24} className="text-white" />
      )}
    </button>
  );
}
