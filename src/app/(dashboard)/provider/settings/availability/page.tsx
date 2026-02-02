"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditAvailabilityModal from "@/components/Dashboard/EditAvailabilityModal";

interface AvailabilityData {
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  timeSlots: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
}

const DAYS = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "8:00 AM – 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM – 4:00 PM" },
  { id: "evening", label: "Evening", time: "4:00 PM – 8:00 PM" },
];

export default function AvailabilityPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data - replace with actual data from API/context
  const [availability, setAvailability] = useState<AvailabilityData>({
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true,
    },
    timeSlots: {
      morning: true,
      afternoon: true,
      evening: false,
    },
  });

  const handleSave = (updatedData: AvailabilityData) => {
    setAvailability(updatedData);
    // Here you would typically make an API call to save the data
  };

  const getAvailableDaysCount = () => {
    return Object.values(availability.days).filter(Boolean).length;
  };

  const getAvailableSlotsCount = () => {
    return Object.values(availability.timeSlots).filter(Boolean).length;
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Availability
            </h1>
          </div>
          <Button onClick={() => setIsEditModalOpen(true)} className="gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Available Days Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Available Days ({getAvailableDaysCount()}/7)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DAYS.map((day) => {
                const dayKey = day.id as keyof typeof availability.days;
                return (
                  <div
                    key={day.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <Checkbox
                      id={day.id}
                      checked={availability.days[dayKey]}
                      disabled
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={day.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                    >
                      {day.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Available Time Slots Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Available Time Slots ({getAvailableSlotsCount()}/3)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIME_SLOTS.map((slot) => {
                const slotKey = slot.id as keyof typeof availability.timeSlots;
                return (
                  <div
                    key={slot.id}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      availability.timeSlots[slotKey]
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <Checkbox
                        id={slot.id}
                        checked={availability.timeSlots[slotKey]}
                        disabled
                        className="w-5 h-5"
                      />
                    </div>

                    <label htmlFor={slot.id} className="block cursor-pointer">
                      <div className="font-semibold text-gray-900 text-center mb-2">
                        {slot.label}
                      </div>
                      <div className="text-sm text-gray-600 text-center">
                        {slot.time}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Update your availability to help customers
              book services at times that work best for you. You can edit your
              schedule anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditAvailabilityModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        availability={availability}
        onSave={handleSave}
      />
    </>
  );
}
