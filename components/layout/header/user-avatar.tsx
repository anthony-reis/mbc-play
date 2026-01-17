"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  userName?: string;
}

export function UserAvatar({
  size = "md",
  showName = false,
  userName = "User",
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar
        className={`${sizeClasses[size]} cursor-pointer transition-transform hover:scale-105 border border-white/5`}
      >
        <AvatarImage
          src="https://github.com/anthony-reis.png"
          alt={userName}
          className="object-cover"
        />
        <AvatarFallback className="bg-zinc-900 text-white font-semibold">
          {userName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {showName && (
        <span className="text-sm font-medium text-white">{userName}</span>
      )}
    </div>
  );
}
