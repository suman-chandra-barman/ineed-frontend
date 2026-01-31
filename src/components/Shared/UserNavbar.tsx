"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserNavbarProps {
  userName?: string;
  userAvatar?: string;
}

export default function UserNavbar({
  userName = "Suman Barman",
  userAvatar,
}: UserNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-20 sm:w-24 md:w-28 h-10 md:h-12">
              <Image
                src={logo}
                alt="iNeed Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop - User Info and Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 lg:gap-3 hover:bg-gray-50 rounded-full pr-3 lg:pr-4 pl-1 py-1 transition-colors">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    )}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="lg:hidden">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="lg:hidden" />
                <DropdownMenuItem asChild>
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/user/settings"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3 px-2 py-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {userName}
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <Link
                href="/user/profile"
                className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </Link>

              <Link
                href="/user/settings"
                className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>

              <button
                className="flex items-center gap-3 px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Add sign out logic here
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
