"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ProviderDashboardSidebar } from "@/components/Dashboard/ProviderDashboardSidebar";
import { ProviderPageHeader } from "@/components/Dashboard/ProviderPageHeader";

function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProviderDashboardSidebar />
      <SidebarInset>
        <ProviderPageHeader
          title="Provider Dashboard"
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProviderLayout;
