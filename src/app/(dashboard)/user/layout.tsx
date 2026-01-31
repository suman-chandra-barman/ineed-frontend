"use client";

import React from "react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { MobileBottomNav } from "@/components/Dashboard/MobileBottomNav";
import Footer from "@/components/Shared/Footer";

function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
        <Footer />
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default UserDashboardLayout;
