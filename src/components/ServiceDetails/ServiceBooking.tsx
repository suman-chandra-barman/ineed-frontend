"use client";

import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceHour {
  day: string;
  hours: string;
  closed: boolean;
}

interface ServiceBookingProps {
  serviceId: string;
  price: number;
  originalPrice: number;
  discount: number;
  serviceHours: ServiceHour[];
}

export default function ServiceBooking({
  serviceId,
  price,
  originalPrice,
  discount,
  serviceHours,
}: ServiceBookingProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Price Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Starts From</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">
                ${price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${originalPrice}
              </span>
            </div>
          </div>
          <div className="bg-blue-100 text-primary px-3 py-1 rounded-full flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold">{discount}% Offer</span>
          </div>
        </div>

        <Button
          asChild
          className="w-full font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Link href={`/booking/${serviceId}`}>
            <CalendarDays className="w-5 h-5" />
            Book Service
          </Link>
        </Button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Service Hours</h3>
        <div className="space-y-3">
          {serviceHours.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700">
                {schedule.day}
              </span>
              {schedule.closed ? (
                <span className="text-sm font-semibold text-red-500">
                  Closed
                </span>
              ) : (
                <span className="text-sm text-gray-600">{schedule.hours}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
