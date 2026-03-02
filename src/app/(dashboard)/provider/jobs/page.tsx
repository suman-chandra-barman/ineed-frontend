"use client";

import { useState } from "react";
import { JobsTable } from "@/components/Dashboard/JobsTable";
import { useGetAllJobsQuery } from "@/redux/features/provider/providerApi";

function JobsPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAllJobsQuery(
    { search: search || undefined },
    { refetchOnMountOrArgChange: true },
  );

  const jobs = data?.data?.results ?? [];

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <JobsTable
        title="All Job's"
        jobs={jobs}
        isLoading={isLoading}
        onSearch={(value) => setSearch(value)}
      />
    </main>
  );
}

export default JobsPage;
