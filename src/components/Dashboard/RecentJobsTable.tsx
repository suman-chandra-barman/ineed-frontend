"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import type { DashboardRecentJobResult } from "@/types/provider.type";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "in_progress":
    case "in progress":
      return "bg-blue-100 text-blue-700";
    case "complete":
    case "completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pending";
    case "in_progress":
    case "in progress":
      return "In Progress";
    case "complete":
    case "completed":
      return "Complete";
    default:
      return status;
  }
};

interface RecentJobsTableProps {
  title: string;
  jobs?: DashboardRecentJobResult[];
  onSearch?: (value: string) => void;
}

export function RecentJobsTable({
  title,
  jobs = [],
  onSearch,
}: RecentJobsTableProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(inputValue.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
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
                Job Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking by time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No recent jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.booking_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {job.job_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.job_category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.client_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {job.contact_number ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {job.booking_by_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        job.status,
                      )}`}
                    >
                      {formatStatus(job.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="link"
                      asChild
                      className="text-blue-600 hover:text-blue-700 p-0"
                    >
                      <Link href={`/provider/jobs/${job.booking_id}`}>
                        [ Job View ]
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {jobs.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No recent jobs found.
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.booking_id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {job.job_id}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                    job.status,
                  )}`}
                >
                  {formatStatus(job.status)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Category:</span>
                  <span className="text-sm text-gray-900">
                    {job.job_category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Client:</span>
                  <span className="text-sm text-gray-900">
                    {job.client_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Contact:</span>
                  <span className="text-sm text-gray-900">
                    {job.contact_number ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Booking:</span>
                  <span className="text-sm text-gray-900">
                    {job.booking_by_time}
                  </span>
                </div>
              </div>
              <Button
                variant="link"
                asChild
                className="text-blue-600 hover:text-blue-700 p-0 w-full justify-center"
              >
                <Link href={`/provider/jobs/${job.booking_id}`}>
                  [ Job View ]
                </Link>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
