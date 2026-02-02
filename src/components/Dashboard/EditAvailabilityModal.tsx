"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

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

interface EditAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  availability: AvailabilityData;
  onSave: (data: AvailabilityData) => void;
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

export default function EditAvailabilityModal({
  isOpen,
  onClose,
  availability,
  onSave,
}: EditAvailabilityModalProps) {
  const [formData, setFormData] = useState<AvailabilityData>(availability);

  if (!isOpen) return null;

  const handleDayChange = (dayId: string) => {
    const dayKey = dayId as keyof typeof formData.days;
    setFormData({
      ...formData,
      days: {
        ...formData.days,
        [dayKey]: !formData.days[dayKey],
      },
    });
  };

  const handleSlotChange = (slotId: string) => {
    const slotKey = slotId as keyof typeof formData.timeSlots;
    setFormData({
      ...formData,
      timeSlots: {
        ...formData.timeSlots,
        [slotKey]: !formData.timeSlots[slotKey],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(availability);
    onClose();
  };

  const handleSelectAllDays = () => {
    const allSelected = Object.values(formData.days).every(Boolean);
    const newDaysState = Object.keys(formData.days).reduce((acc, day) => {
      return {
        ...acc,
        [day]: !allSelected,
      };
    }, {});

    setFormData({
      ...formData,
      days: newDaysState as typeof formData.days,
    });
  };

  const handleSelectAllSlots = () => {
    const allSelected = Object.values(formData.timeSlots).every(Boolean);
    const newSlotsState = Object.keys(formData.timeSlots).reduce(
      (acc, slot) => {
        return {
          ...acc,
          [slot]: !allSelected,
        };
      },
      {},
    );

    setFormData({
      ...formData,
      timeSlots: newSlotsState as typeof formData.timeSlots,
    });
  };

  const selectedDaysCount = Object.values(formData.days).filter(Boolean).length;
  const selectedSlotsCount = Object.values(formData.timeSlots).filter(
    Boolean,
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Edit Availability
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Days Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-base font-semibold text-gray-900">
                Available Days ({selectedDaysCount}/7)
              </label>
              <button
                type="button"
                onClick={handleSelectAllDays}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {Object.values(formData.days).every(Boolean)
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DAYS.map((day) => {
                const dayKey = day.id as keyof typeof formData.days;
                return (
                  <div
                    key={day.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={formData.days[dayKey]}
                      onCheckedChange={() => handleDayChange(day.id)}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={`day-${day.id}`}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {day.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-base font-semibold text-gray-900">
                Available Time Slots ({selectedSlotsCount}/3)
              </label>
              <button
                type="button"
                onClick={handleSelectAllSlots}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {Object.values(formData.timeSlots).every(Boolean)
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIME_SLOTS.map((slot) => {
                const slotKey = slot.id as keyof typeof formData.timeSlots;
                const isSelected = formData.timeSlots[slotKey];

                return (
                  <label
                    key={slot.id}
                    htmlFor={`slot-${slot.id}`}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`slot-${slot.id}`}
                        checked={isSelected}
                        onCheckedChange={() => handleSlotChange(slot.id)}
                        className="w-5 h-5 mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {slot.label}
                        </div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Select the days and time slots when
              you&apos;re available to serve customers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="px-6"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
