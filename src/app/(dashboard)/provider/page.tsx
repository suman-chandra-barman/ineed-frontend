"use client";

import { useState } from "react";
import { StatusCards } from "@/components/Dashboard/StatusCards";
import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";
import { useGetProviderDashboardOverviewQuery } from "@/redux/features/provider/providerApi";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";

const ProviderOverviewPage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetProviderDashboardOverviewQuery({
    search: search || undefined,
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard overview..." fullPage />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message="Failed to load dashboard overview"
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  return (
    <main className="h-full">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <StatusCards cards={data?.data.cards} />
        <RecentJobsTable
          title="Recent Jobs"
          jobs={data?.data.recent_jobs.results}
          onSearch={setSearch}
        />
      </div>
    </main>
  );
};

export default ProviderOverviewPage;
