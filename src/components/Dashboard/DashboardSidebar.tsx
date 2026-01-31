"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

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
  { href: "/user/settings", label: "Account Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white shadow-sm z-40 hidden lg:block">
      <div className="h-full flex flex-col p-6">
        {/* User Profile Card */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Suman</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <Button className="w-full mt-6 flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
