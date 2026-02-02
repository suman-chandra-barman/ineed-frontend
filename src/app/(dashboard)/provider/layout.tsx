"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ProviderDashboardSidebar } from "@/components/Dashboard/ProviderDashboardSidebar";
import { ProviderPageHeader } from "@/components/Dashboard/ProviderPageHeader";

function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProviderDashboardSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <ProviderPageHeader title="Provider Dashboard" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProviderLayout;
