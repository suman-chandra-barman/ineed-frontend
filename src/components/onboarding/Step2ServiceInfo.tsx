import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { onboardingStep2Schema } from "@/schemas/auth.schema";

interface Step2ServiceInfoProps {
  form: UseFormReturn<z.infer<typeof onboardingStep2Schema>>;
}

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "experienced", label: "Experienced (3+ years)" },
];

export function Step2ServiceInfo({ form }: Step2ServiceInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="serviceType"
          className="text-slate-700 font-medium mb-2 block"
        >
          Service Type
        </Label>
        <Select
          value={form.watch("serviceType")}
          onValueChange={(value) =>
            form.setValue("serviceType", value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Cleaning Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cleaning">Cleaning Service</SelectItem>
            <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.serviceType && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.serviceType.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="experienceLevel"
          className="text-slate-700 font-medium mb-2 block"
        >
          Experience Level
        </Label>
        <Select
          value={form.watch("experienceLevel")}
          onValueChange={(value) =>
            form.setValue("experienceLevel", value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select your experience level..." />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.experienceLevel && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.experienceLevel.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="shortDescription"
          className="text-slate-700 font-medium mb-2 block"
        >
          Short Description (optional)
        </Label>
        <Textarea
          id="shortDescription"
          placeholder="Briefly describe your cleaning experience Info Note..."
          {...form.register("shortDescription")}
          className="bg-white min-h-[120px]"
        />
      </div>
    </div>
  );
}
