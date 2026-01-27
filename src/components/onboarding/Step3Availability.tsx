import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import * as z from "zod";
import { onboardingStep3Schema } from "@/schemas/auth.schema";

interface Step3AvailabilityProps {
  form: UseFormReturn<z.infer<typeof onboardingStep3Schema>>;
  toggleArrayItem: (
    field: "availableDays" | "availableTimes",
    value: string,
  ) => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning", time: "8:00 AM - 12:00 PM" },
  { value: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM" },
  { value: "evening", label: "Evening", time: "4:00 PM - 8:00 PM" },
];

export function Step3Availability({
  form,
  toggleArrayItem,
}: Step3AvailabilityProps) {
  return (
    <div className="space-y-8">
      <div>
        <Label className="text-slate-700 font-medium mb-4 block">
          Available Days
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-200"
            >
              <Checkbox
                id={day}
                checked={form.watch("availableDays").includes(day)}
                onCheckedChange={() => toggleArrayItem("availableDays", day)}
              />
              <label
                htmlFor={day}
                className="text-sm font-medium text-slate-700 cursor-pointer"
              >
                {day}
              </label>
            </div>
          ))}
        </div>
        {form.formState.errors.availableDays && (
          <p className="text-red-500 text-sm mt-2">
            {form.formState.errors.availableDays.message}
          </p>
        )}
      </div>

      <div>
        <Label className="text-slate-700 font-medium mb-4 block">
          Available Times
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TIME_SLOTS.map((slot) => (
            <div
              key={slot.value}
              className={`relative bg-white p-6 rounded-lg border-2 cursor-pointer transition-all ${
                form.watch("availableTimes").includes(slot.value)
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onClick={() => toggleArrayItem("availableTimes", slot.value)}
            >
              <div className="absolute top-3 right-3">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    form.watch("availableTimes").includes(slot.value)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {form.watch("availableTimes").includes(slot.value) && (
                    <Check className="w-4 h-4" />
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {slot.label}
              </h3>
              <p className="text-sm text-slate-600">{slot.time}</p>
            </div>
          ))}
        </div>
        {form.formState.errors.availableTimes && (
          <p className="text-red-500 text-sm mt-2">
            {form.formState.errors.availableTimes.message}
          </p>
        )}
      </div>
    </div>
  );
}
