"use client";

import { StatusCards } from "@/components/Dashboard/StatusCards";
import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";

const ProviderOverviewPage = () => {
  return (
    <main className="h-full">
      {/* Page Content */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <StatusCards />
        <RecentJobsTable />
      </div>
    </main>
  );
};

export default ProviderOverviewPage;
