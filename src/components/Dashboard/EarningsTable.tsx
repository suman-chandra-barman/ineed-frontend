"use client";

import type { EarningResult } from "@/types/provider.type";
import { Skeleton } from "../ui/skeleton";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

interface EarningsTableProps {
  title?: string;
  earnings?: EarningResult[];
  isLoading?: boolean;
}

export function EarningsTable({
  title = "Earnings",
  earnings = [],
  isLoading = false,
}: EarningsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Complete Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                </tr>
              ))
            ) : earnings.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No earnings found.
                </td>
              </tr>
            ) : (
              earnings.map((item, idx) => (
                <tr
                  key={`${item.job_id}-${idx}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.job_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.booking_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.complete_date ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}
                    >
                      {formatStatus(item.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Loading...
          </div>
        ) : earnings.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No earnings found.
          </div>
        ) : (
          earnings.map((item, idx) => (
            <div key={`${item.job_id}-${idx}`} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {item.job_id}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}
                >
                  {formatStatus(item.status)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Booking Date:</span>
                  <span className="text-sm text-gray-900">
                    {item.booking_date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Complete Date:</span>
                  <span className="text-sm text-gray-900">
                    {item.complete_date ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Amount:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
