"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { TimeSlot } from "@/types/booking.type";
import { useUpdateScheduleMutation } from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";

interface DateTimeStepProps {
  bookingId: number;
  selectedDate: Date | null;
  selectedTime: string;
  isRecurring: boolean;
  recurringType: "weekly" | "bi-weekly" | "monthly" | null;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOTS: TimeSlot[] = [
  {
    label: "Morning",
    value: "morning",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
  },
  {
    label: "Afternoon",
    value: "afternoon",
    startTime: "12:00 PM",
    endTime: "4:00 PM",
  },
  {
    label: "Evening",
    value: "evening",
    startTime: "4:00 PM",
    endTime: "7:00 PM",
  },
];

export default function DateTimeStep({
  bookingId,
  selectedDate,
  selectedTime,
  isRecurring,
  recurringType,
  onNext,
  onBack,
}: DateTimeStepProps) {
  const [updateSchedule, { isLoading }] = useUpdateScheduleMutation();

  const [localDate, setLocalDate] = useState<Date | null>(selectedDate);
  const [localTime, setLocalTime] = useState(selectedTime);
  const [localIsRecurring, setLocalIsRecurring] = useState(isRecurring);
  const [localRecurringType, setLocalRecurringType] = useState(recurringType);

  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const startingDayOfWeek = (firstDay.getDay() - 1 + 7) % 7;

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    setLocalDate(newDate);
  };

  const isDateSelected = (day: number) => {
    if (!localDate) return false;
    return (
      localDate.getDate() === day &&
      localDate.getMonth() === month &&
      localDate.getFullYear() === year
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate calendar days
  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleRecurringTypeChange = (
    type: "weekly" | "bi-weekly" | "monthly",
  ) => {
    if (localRecurringType === type) {
      setLocalIsRecurring(false);
      setLocalRecurringType(null);
    } else {
      setLocalIsRecurring(true);
      setLocalRecurringType(type);
    }
  };

  const handleSubmit = async () => {
    if (!localDate || !localTime) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      // Format date as YYYY-MM-DD
      const formattedDate = localDate.toISOString().split("T")[0];

      await updateSchedule({
        bookingId,
        service_date: formattedDate,
        time_slot: localTime,
        is_recurring: localIsRecurring,
        recurring_type: localRecurringType,
      }).unwrap();

      toast.success("Schedule saved successfully");
      onNext();
    } catch (err) {
      console.error("Failed to update schedule:", err);
      toast.error("Failed to save schedule");
    }
  };

  const canProceed = localDate && localTime;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Date & Time</h2>
        <p className="text-gray-600">
          Choose your preferred service date and time slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Select Date
          </Label>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="font-semibold text-gray-900">
                {monthNames[month]} {year}
              </h3>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={!day}
                  onClick={() => day && handleDateClick(day)}
                  className={`
                    aspect-square p-2 rounded-lg text-sm font-medium transition-all
                    ${!day ? "invisible" : ""}
                    ${
                      isDateSelected(day!)
                        ? "bg-primary text-white"
                        : isToday(day!)
                          ? "border-2 border-primary text-primary font-bold"
                          : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Select Time
          </Label>
          <div className="space-y-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                type="button"
                onClick={() => setLocalTime(slot.value)}
                className={`
                  w-full p-4 rounded-lg border-2 transition-all text-left
                  ${
                    localTime === slot.value
                      ? "border-primary bg-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <div className="font-semibold text-gray-900">{slot.label}</div>
                <div className="text-sm text-gray-600">
                  {slot.startTime} - {slot.endTime}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recurring Service */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">
          Is this a Reoccurring Service?
        </Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="recurring"
              checked={localIsRecurring}
              onChange={() => {
                if (!localIsRecurring) {
                  setLocalIsRecurring(true);
                  setLocalRecurringType("weekly");
                }
              }}
              className="w-4 h-4"
            />
            <span className="text-gray-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="recurring"
              checked={!localIsRecurring}
              onChange={() => {
                setLocalIsRecurring(false);
                setLocalRecurringType(null);
              }}
              className="w-4 h-4"
            />
            <span className="text-gray-700">- One-time cleaning</span>
          </label>
        </div>

        {localIsRecurring && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Select</Label>
            <div className="grid grid-cols-3 gap-4">
              {(["weekly", "bi-weekly", "monthly"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleRecurringTypeChange(type)}
                  className={`
                    p-4 rounded-lg border-2 transition-all capitalize
                    ${
                      localRecurringType === type
                        ? "border-primary bg-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  {type === "bi-weekly" ? "Bi - Weekly" : type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous
        </Button>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
