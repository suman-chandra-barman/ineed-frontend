import { StatusCards } from "@/components/Dashboard/StatusCards";
import { RecentJobsTable } from "@/components/Dashboard/RecentJobsTable";

const ProviderOverviewPage = () => {
  return (
    <main className="h-full">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <StatusCards />
        <RecentJobsTable title="Recent Jobs" />
      </div>
    </main>
  );
};

export default ProviderOverviewPage;
