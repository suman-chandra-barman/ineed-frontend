"use client";

import { StatusCards } from "@/components/Dashboard/StatusCards";
import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";
import { ProviderPageHeader } from "@/components/Dashboard/ProviderPageHeader";

const ProviderOverviewPage = () => {
  return (
    <main>
   

      {/* Page Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50">
        <StatusCards />
        <RecentJobsTable />
      </div>
    </main>
  );
};

export default ProviderOverviewPage;
