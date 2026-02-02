"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { UserProfileDropdown } from "@/components/Shared/UserProfileDropdown";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white shadow-sm z-50">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-20 sm:w-24 h-8">
            <Image
              src={logo}
              alt="iNeed Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* User Profile Dropdown */}
        <UserProfileDropdown userName="Suman" />
      </div>
    </header>
  );
}
