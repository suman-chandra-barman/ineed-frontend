import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";

function JobsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <RecentJobsTable title="All Job's"/>
    </main>
  );
}

export default JobsPage;
