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

interface Category {
  id: number;
  name: string;
  is_active: boolean;
}

interface Service {
  id: number;
  name: string;
  is_active: boolean;
}

interface CategoryWithServices {
  category: Category;
  services: Service[];
}

interface ServiceOptionsResponse {
  success: boolean;
  message: string;
  meta: {
    category_total: number;
    service_total: number;
    category_active: number;
    service_active: number;
  };
  data: CategoryWithServices[];
}

interface Step2ServiceInfoProps {
  form: UseFormReturn<z.infer<typeof onboardingStep2Schema>>;
  serviceOptions?: ServiceOptionsResponse;
}

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "expert", label: "Experienced (3+ years)" },
];

export function Step2ServiceInfo({
  form,
  serviceOptions,
}: Step2ServiceInfoProps) {
  // Flatten all services from all categories into a single list
  const allServices = (serviceOptions?.data || []).flatMap(
    (categoryItem) => categoryItem.services,
  );

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
            <SelectValue placeholder="Select a service type..." />
          </SelectTrigger>
          <SelectContent>
            {allServices.map((service) => (
              <SelectItem key={service.id} value={String(service.id)}>
                {service.name}
              </SelectItem>
            ))}
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
          Short Description
        </Label>
        <Textarea
          id="shortDescription"
          placeholder="Briefly describe your cleaning experience Info Note..."
          {...form.register("shortDescription")}
          className="bg-white min-h-30"
        />
        {form.formState.errors.shortDescription && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.shortDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
