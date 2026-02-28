/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { LogoutModal } from "../Modals/LogoutModal";
import { useState } from "react";

interface ProfileDropdownProps {
  user: any;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {user.profile_image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${user.profile_image}`}
                alt={"User Avatar"}
                className="w-full h-full object-cover"
                width={48}
                height={48}
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
        {user.role === "user" && (
          <DropdownMenuItem asChild>
            <Link href="/user" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>User Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        {user.role === "provider" && (
          <DropdownMenuItem asChild>
            <Link href="/provider" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Provider Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <LogoutModal open={logoutModalOpen} onOpenChange={setLogoutModalOpen} />
    </DropdownMenu>
  );
}
