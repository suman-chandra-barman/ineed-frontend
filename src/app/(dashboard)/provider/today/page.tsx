import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";

function TodayJobPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <RecentJobsTable title="Today's Jobs" />
    </main>
  );
}

export default TodayJobPage;
