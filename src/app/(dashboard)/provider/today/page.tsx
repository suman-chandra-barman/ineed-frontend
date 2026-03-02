"use client";

import { useState } from "react";
import { JobsTable } from "@/components/Dashboard/JobsTable";
import { useGetTodaysJobsQuery } from "@/redux/features/provider/providerApi";

function TodayJobPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTodaysJobsQuery(
    { search: search || undefined },
    { refetchOnMountOrArgChange: true },
  );

  const jobs = data?.data?.results ?? [];

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <JobsTable
        title="Today's Jobs"
        jobs={jobs}
        isLoading={isLoading}
        onSearch={(value) => setSearch(value)}
      />
    </main>
  );
}

export default TodayJobPage;
