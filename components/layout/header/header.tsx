// components/layout/header/header.tsx
"use client";

import { SearchBar } from "./search-bar";
import { UserAvatar } from "./user-avatar";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between  px-6 md:px-10 pt-6 md:pt-10 pb-4 md:pb-6 gap-4 bg-transparent">
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      <UserAvatar />
    </header>
  );
}
