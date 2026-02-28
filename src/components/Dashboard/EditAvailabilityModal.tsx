"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import type {
  AvailabilityDay,
  AvailabilitySlot,
  SlotType,
  UpdateAvailabilityRequest,
} from "@/types/availability.type";

// Fixed time ranges per slot_type (matches API)
const SLOT_CONFIG: Record<
  SlotType,
  { from_time: string; to_time: string; label: string; time: string }
> = {
  morning: {
    from_time: "09:00:00",
    to_time: "12:00:00",
    label: "Morning",
    time: "9:00 AM - 12:00 PM",
  },
  evening: {
    from_time: "12:00:00",
    to_time: "16:00:00",
    label: "Afternoon",
    time: "12:00 PM - 4:00 PM",
  },
  afternoon: {
    from_time: "16:00:00",
    to_time: "19:00:00",
    label: "Evening",
    time: "4:00 PM - 7:00 PM",
  },
};

const SLOT_TYPES: SlotType[] = ["morning", "evening", "afternoon"];

const DAYS = [
  { day_of_week: 0, label: "Monday" },
  { day_of_week: 1, label: "Tuesday" },
  { day_of_week: 2, label: "Wednesday" },
  { day_of_week: 3, label: "Thursday" },
  { day_of_week: 4, label: "Friday" },
  { day_of_week: 5, label: "Saturday" },
  { day_of_week: 6, label: "Sunday" },
];

interface EditAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: AvailabilityDay[];
  slots: AvailabilitySlot[];
  onSave: (data: UpdateAvailabilityRequest) => void;
  isSaving?: boolean;
}

export default function EditAvailabilityModal({
  isOpen,
  onClose,
  days,
  slots,
  onSave,
  isSaving = false,
}: EditAvailabilityModalProps) {
  // activeDays: which day_of_week values are active
  const [activeDays, setActiveDays] = useState<Set<number>>(new Set());
  // activeSlots: which slot types are active (applies globally across days)
  const [activeSlotTypes, setActiveSlotTypes] = useState<Set<SlotType>>(
    new Set(),
  );

  // Sync state when modal transitions to open — derived state during render
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setActiveDays(
        new Set(days.filter((d) => d.is_active).map((d) => d.day_of_week)),
      );
      setActiveSlotTypes(
        new Set<SlotType>(
          slots.filter((s) => s.is_active).map((s) => s.slot_type),
        ),
      );
    }
  }

  if (!isOpen) return null;

  const toggleDay = (dayOfWeek: number) => {
    setActiveDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayOfWeek)) next.delete(dayOfWeek);
      else next.add(dayOfWeek);
      return next;
    });
  };

  const toggleSlot = (slotType: SlotType) => {
    setActiveSlotTypes((prev) => {
      const next = new Set(prev);
      if (next.has(slotType)) next.delete(slotType);
      else next.add(slotType);
      return next;
    });
  };

  const handleSelectAllDays = () => {
    if (activeDays.size === 7) {
      setActiveDays(new Set());
    } else {
      setActiveDays(new Set([0, 1, 2, 3, 4, 5, 6]));
    }
  };

  const handleSelectAllSlots = () => {
    if (activeSlotTypes.size === SLOT_TYPES.length) {
      setActiveSlotTypes(new Set());
    } else {
      setActiveSlotTypes(new Set(SLOT_TYPES));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const daysPayload = DAYS.map((d) => ({
      day_of_week: d.day_of_week,
      is_active: activeDays.has(d.day_of_week),
    }));

    const slotsPayload = DAYS.flatMap((d) =>
      SLOT_TYPES.map((slotType) => ({
        day_of_week: d.day_of_week,
        slot_type: slotType,
        from_time: SLOT_CONFIG[slotType].from_time,
        to_time: SLOT_CONFIG[slotType].to_time,
        is_active:
          activeDays.has(d.day_of_week) && activeSlotTypes.has(slotType),
      })),
    );

    onSave({ days: daysPayload, slots: slotsPayload });
  };

  const handleCancel = () => {
    onClose();
  };

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
                Available Days ({activeDays.size}/7)
              </label>
              <button
                type="button"
                onClick={handleSelectAllDays}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {activeDays.size === 7 ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DAYS.map((day) => (
                <div
                  key={day.day_of_week}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Checkbox
                    id={`day-${day.day_of_week}`}
                    checked={activeDays.has(day.day_of_week)}
                    onCheckedChange={() => toggleDay(day.day_of_week)}
                    className="w-5 h-5"
                  />
                  <label
                    htmlFor={`day-${day.day_of_week}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {day.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-base font-semibold text-gray-900">
                Available Time Slots ({activeSlotTypes.size}/3)
              </label>
              <button
                type="button"
                onClick={handleSelectAllSlots}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {activeSlotTypes.size === SLOT_TYPES.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SLOT_TYPES.map((slotType) => {
                const config = SLOT_CONFIG[slotType];
                const isSelected = activeSlotTypes.has(slotType);
                return (
                  <label
                    key={slotType}
                    htmlFor={`slot-${slotType}`}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`slot-${slotType}`}
                        checked={isSelected}
                        onCheckedChange={() => toggleSlot(slotType)}
                        className="w-5 h-5 mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {config.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {config.time}
                        </div>
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
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
