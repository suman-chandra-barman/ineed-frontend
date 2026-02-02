"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: "/provider", label: "Overview", icon: LayoutDashboard },
  { href: "/provider/today", label: "Today's Job", icon: Calendar },
  { href: "/provider/jobs", label: "All Jobs", icon: Briefcase },
  { href: "/provider/earnings", label: "Earnings", icon: DollarSign },
  { href: "/provider/chat", label: "Chat", icon: MessageSquare },
  { href: "/provider/settings", label: "Settings", icon: Settings },
];

export function ProviderSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bottom-0 bg-white shadow-sm z-40 hidden lg:block transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="h-full flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <div className="p-6">
          {/* User Profile Card */}
          <div
            className={cn(
              "mb-6 p-4 bg-blue-50 rounded-lg transition-all",
              isCollapsed && "p-2",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-3",
                isCollapsed && "flex-col gap-2",
              )}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Moni Roy
                  </p>
                  <p className="text-xs text-gray-600">Provider</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 flex-1 overflow-y-auto px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100",
                  isCollapsed && "justify-center px-2",
                )}
                title={isCollapsed ? link.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 pb-6">
          <Button
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              isCollapsed && "justify-center px-2",
            )}
            title={isCollapsed ? "Log Out" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Log Out</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
