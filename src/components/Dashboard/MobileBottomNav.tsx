"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LayoutDashboard, Calendar, Heart, MessageSquare } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/booking", label: "Booking", icon: Calendar },
  { href: "/user/favorite", label: "Favorite", icon: Heart },
  { href: "/user/chat", label: "Chat", icon: MessageSquare },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
