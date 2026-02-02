"use client";

import { useRouter } from "next/navigation";
import {
  User,
  Info,
  Calendar,
  Shield,
  KeyRound,
  ChevronRight,
} from "lucide-react";

const settingsItems = [
  {
    id: "personal-information",
    label: "Personal Information",
    icon: User,
    href: "/provider/settings/personal-information",
  },
  {
    id: "service-information",
    label: "Service Information",
    icon: Info,
    href: "/provider/settings/service-information",
  },
  {
    id: "availability",
    label: "Availability",
    icon: Calendar,
    href: "/provider/settings/availability",
  },
  {
    id: "legal-info",
    label: "Legal Info",
    icon: Shield,
    href: "/provider/settings/legal-info",
  },
  {
    id: "password-change",
    label: "Password Change",
    icon: KeyRound,
    href: "/provider/settings/password-change",
  },
];

function SettingsPage() {
  const router = useRouter();

  return (
    <main className=" p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      {/* Settings Items */}
      <div className="space-y-3">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="w-full bg-white rounded-xl p-2 flex items-center justify-between hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-base font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>
    </main>
  );
}

export default SettingsPage;
