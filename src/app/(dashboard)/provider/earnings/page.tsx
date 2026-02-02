import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";

function EarningPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <RecentJobsTable title="Earnings"/>
    </main>
  );
}

export default EarningPage;
