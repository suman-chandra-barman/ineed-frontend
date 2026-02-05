"use client";

import Link from "next/link";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface ProfileDropdownProps {
  userAvatar?: string;
  onLogout?: () => void;
}

export function ProfileDropdown({
  userAvatar,
  onLogout,
}: ProfileDropdownProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log("Logout clicked");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={"User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>User Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/provider' className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Provider Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
