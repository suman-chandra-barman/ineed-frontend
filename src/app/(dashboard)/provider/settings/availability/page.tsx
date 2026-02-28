"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditAvailabilityModal from "@/components/Dashboard/EditAvailabilityModal";
import {
  useGetProviderAvailabilityQuery,
  useUpdateProviderAvailabilityMutation,
} from "@/redux/features/provider/providerApi";
import type {
  SlotType,
  UpdateAvailabilityRequest,
} from "@/types/availability.type";

const DAY_LABELS: Record<number, string> = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

// Display order and labels for the 3 slot types
// Mapping slotType → display config (label/time = UI representation, not API naming)
const SLOT_DISPLAY: Array<{ type: SlotType; label: string; time: string }> = [
  { type: "morning", label: "Morning", time: "9:00 AM – 12:00 PM" },
  { type: "evening", label: "Afternoon", time: "12:00 PM – 4:00 PM" },
  { type: "afternoon", label: "Evening", time: "4:00 PM – 7:00 PM" },
];

export default function AvailabilityPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetProviderAvailabilityQuery();
  const [updateAvailability, { isLoading: isSaving }] =
    useUpdateProviderAvailabilityMutation();

  const availabilityData = data?.data;

  // Days sorted by day_of_week
  const days = availabilityData?.days
    ? [...availabilityData.days].sort((a, b) => a.day_of_week - b.day_of_week)
    : [];

  const slots = availabilityData?.slots ?? [];

  // A slot type is "active" if any slot of that type has is_active = true
  const isSlotTypeActive = (slotType: SlotType) =>
    slots.some((s) => s.slot_type === slotType && s.is_active);

  const activeDaysCount = days.filter((d) => d.is_active).length;
  const activeSlotTypesCount = SLOT_DISPLAY.filter((s) =>
    isSlotTypeActive(s.type),
  ).length;

  const handleSave = async (updatedData: UpdateAvailabilityRequest) => {
    try {
      await updateAvailability(updatedData).unwrap();
      setIsEditModalOpen(false);
    } catch {
      // Error is handled silently; toast/error handling can be added here
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Loading availability...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-full">
        <div className="text-red-500">
          Failed to load availability. Please try again.
        </div>
      </div>
    );
  }

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
              Available Days ({activeDaysCount}/7)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {days.map((day) => (
                <div
                  key={day.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <Checkbox
                    id={`day-${day.day_of_week}`}
                    checked={day.is_active}
                    disabled
                    className="w-5 h-5"
                  />
                  <label
                    htmlFor={`day-${day.day_of_week}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                  >
                    {DAY_LABELS[day.day_of_week] ?? `Day ${day.day_of_week}`}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Available Time Slots Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Available Time Slots ({activeSlotTypesCount}/3)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SLOT_DISPLAY.map((slot) => {
                const active = isSlotTypeActive(slot.type);
                return (
                  <div
                    key={slot.type}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <Checkbox
                        id={`slot-${slot.type}`}
                        checked={active}
                        disabled
                        className="w-5 h-5"
                      />
                    </div>

                    <label
                      htmlFor={`slot-${slot.type}`}
                      className="block cursor-pointer"
                    >
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
      {availabilityData && (
        <EditAvailabilityModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          days={availabilityData.days}
          slots={availabilityData.slots}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </>
  );
}
