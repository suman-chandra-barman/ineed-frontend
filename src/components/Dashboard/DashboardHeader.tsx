"use client";
import { UserProfileDropdown } from "@/components/Shared/UserProfileDropdown";
import { useAppSelector } from "@/redux/hooks";

export function DashboardHeader() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white shadow-sm z-50">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">User Dashboard</h1>

        {/* User Profile Dropdown */}
        <UserProfileDropdown user={user} />
      </div>
    </header>
  );
}
