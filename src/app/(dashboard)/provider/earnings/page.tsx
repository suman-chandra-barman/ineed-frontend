"use client";

import { EarningsTable } from "@/components/Dashboard/EarningsTable";
import { useGetEarningsQuery } from "@/redux/features/provider/providerApi";

function EarningPage() {
  const { data, isLoading } = useGetEarningsQuery();

  const earnings = data?.data?.results ?? [];

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      <EarningsTable
        title="Earnings"
        earnings={earnings}
        isLoading={isLoading}
      />
    </main>
  );
}

export default EarningPage;
