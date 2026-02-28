"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { FiClipboard } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import type { DashboardCards } from "@/types/provider.type";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  iconBgColor,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{value}</h3>
          <div className="flex items-center gap-1">
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.value}
            </span>
            <span className="text-sm text-gray-500 ml-1">{trend.label}</span>
          </div>
        </div>
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

interface StatusCardsProps {
  cards?: DashboardCards;
}

export function StatusCards({ cards }: StatusCardsProps) {
  const stats = [
    {
      title: "Today's Jobs",
      value: cards?.todays_jobs.count ?? 0,
      trend: {
        value: `${cards?.todays_jobs.percent ?? 0}%`,
        isPositive: (cards?.todays_jobs.direction ?? "up") === "up",
        label: cards?.todays_jobs.text ?? "Up from past week",
      },
      icon: <FiClipboard className="w-7 h-7 text-green-600" />,
      iconBgColor: "bg-green-100",
    },
    {
      title: "Completed Work",
      value: cards?.completed_work.count ?? 0,
      trend: {
        value: `${cards?.completed_work.percent ?? 0}%`,
        isPositive: (cards?.completed_work.direction ?? "up") === "up",
        label: cards?.completed_work.text ?? "Up from yesterday",
      },
      icon: <BsCheckCircle className="w-7 h-7 text-purple-600" />,
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Pending Jobs",
      value: cards?.pending_jobs.count ?? 0,
      trend: {
        value: `${cards?.pending_jobs.percent ?? 0}%`,
        isPositive: (cards?.pending_jobs.direction ?? "up") === "up",
        label: cards?.pending_jobs.text ?? "Up from past week",
      },
      icon: <MdPendingActions className="w-7 h-7 text-orange-600" />,
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Total Jobs",
      value: cards?.total_jobs.count ?? 0,
      trend: {
        value: `${cards?.total_jobs.percent ?? 0}%`,
        isPositive: (cards?.total_jobs.direction ?? "up") === "up",
        label: cards?.total_jobs.text ?? "Up from past week",
      },
      icon: <FaBriefcase className="w-7 h-7 text-pink-600" />,
      iconBgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
