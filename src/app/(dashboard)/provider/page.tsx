"use client";

import { StatusCards } from "@/components/Dashboard/StatusCards";
import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";
import { useGetProviderDashboardOverviewQuery } from "@/redux/features/provider/providerApi";

const ProviderOverviewPage = () => {
  const { data, isLoading, isError } = useGetProviderDashboardOverviewQuery({
    search: "home",
  });

  if (isLoading) {
    return (
      <main className="h-full">
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full flex items-center justify-center">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="h-full">
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full flex items-center justify-center">
          <p className="text-red-500">Failed to load dashboard data.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <StatusCards cards={data?.data.cards} />
        <RecentJobsTable
          title="Recent Jobs"
          jobs={data?.data.recent_jobs.results}
        />
      </div>
    </main>
  );
};

export default ProviderOverviewPage;
