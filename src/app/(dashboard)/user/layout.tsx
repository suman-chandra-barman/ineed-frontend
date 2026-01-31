"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { MobileBottomNav } from "@/components/Dashboard/MobileBottomNav";
import Footer from "@/components/Shared/Footer";

function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname === "/user/chat";

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-64">
        <div>{children}</div>
        {!isChatPage && <Footer />}
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default UserDashboardLayout;
