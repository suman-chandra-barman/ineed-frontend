"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { FiClipboard } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";

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

export function StatusCards() {
  const stats = [
    {
      title: "Today's Jobs",
      value: "10293",
      trend: {
        value: "13%",
        isPositive: true,
        label: "Up from past week",
      },
      icon: <FiClipboard className="w-7 h-7 text-green-600" />,
      iconBgColor: "bg-green-100",
    },
    {
      title: "Completed Work",
      value: "10293",
      trend: {
        value: "4.3%",
        isPositive: false,
        label: "Down from yesterday",
      },
      icon: <BsCheckCircle className="w-7 h-7 text-purple-600" />,
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Pending Jobs",
      value: "10293",
      trend: {
        value: "13%",
        isPositive: true,
        label: "Up from past week",
      },
      icon: <MdPendingActions className="w-7 h-7 text-orange-600" />,
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Total Jobs",
      value: "4",
      trend: {
        value: "13%",
        isPositive: true,
        label: "Up from past week",
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
