"use client";

import PageHeader from "@/components/Dashboard/PageHeader";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";
import { useGetUserDashboardQuery } from "@/redux/features/user/userApi";
import { Calendar, CheckCircle, DollarSign } from "lucide-react";

function UserDashboardPage() {
  const { data, isLoading, isError } = useGetUserDashboardQuery();

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." fullPage />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message="Failed to load dashboard"
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  const summary = data?.data.summary;
  const transactions = data?.data.recent_transactions ?? [];

  return (
    <main className="h-full">
      <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 space-y-6 bg-gray-50 min-h-full">
        {/* Page Header */}
        <PageHeader title="Dashboard" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Active Bookings */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {summary?.active_bookings ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Completed Services */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Services</p>
                <p className="text-3xl font-bold text-gray-900">
                  {summary?.completed_services ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Spend */}
          <div className="bg-white rounded-lg shadow-sm p-6 border sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spend</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${summary?.total_spend ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Transactions
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {transactions.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">
                No transactions found.
              </p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.service_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.provider_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.payment_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserDashboardPage;
