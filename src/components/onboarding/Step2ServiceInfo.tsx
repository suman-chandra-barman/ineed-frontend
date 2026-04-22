import React, { useEffect, useRef } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { onboardingStep2Schema } from "@/schemas/auth.schema";
import { Plus, Trash2 } from "lucide-react";

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
  const { fields, append, replace, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const initializedRef = useRef(false);

  // Initialize field array from form default values if empty
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      if (fields.length === 0) {
        const formServices = form.getValues("services");
        if (formServices && formServices.length > 0) {
          replace(formServices);
        } else {
          append({
            serviceType: "",
            experienceLevel: "",
            shortDescription: "",
          });
        }
      }
    }
  }, [fields.length, form, append, replace]);

  // Flatten all services from all categories into a single list
  const allServices = (serviceOptions?.data || []).flatMap(
    (categoryItem) => categoryItem.services,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Service Details
          </h2>
          <p className="text-sm text-slate-600">
            Add one or more services you want to offer.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() =>
            append({
              serviceType: "",
              experienceLevel: "",
              shortDescription: "",
            })
          }
          className="whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 lg:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Service {index + 1}
                </p>
                <p className="text-xs text-slate-500">
                  Choose the service, experience level, and a short summary.
                </p>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  aria-label={`Remove service ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div>
              <Label
                htmlFor={`services.${index}.serviceType`}
                className="text-slate-700 font-medium mb-2 block"
              >
                Service Type
              </Label>
              <Select
                value={form.watch(`services.${index}.serviceType`) || ""}
                onValueChange={(value) =>
                  form.setValue(`services.${index}.serviceType`, value, {
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
              {form.formState.errors.services?.[index]?.serviceType && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.services[index]?.serviceType?.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor={`services.${index}.experienceLevel`}
                className="text-slate-700 font-medium mb-2 block"
              >
                Experience Level
              </Label>
              <Select
                value={form.watch(`services.${index}.experienceLevel`) || ""}
                onValueChange={(value) =>
                  form.setValue(`services.${index}.experienceLevel`, value, {
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
              {form.formState.errors.services?.[index]?.experienceLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    form.formState.errors.services[index]?.experienceLevel
                      ?.message
                  }
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor={`services.${index}.shortDescription`}
                className="text-slate-700 font-medium mb-2 block"
              >
                Short Description
              </Label>
              <Textarea
                id={`services.${index}.shortDescription`}
                placeholder="Briefly describe your cleaning experience..."
                {...form.register(`services.${index}.shortDescription`)}
                className="bg-white min-h-30"
              />
              {form.formState.errors.services?.[index]?.shortDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    form.formState.errors.services[index]?.shortDescription
                      ?.message
                  }
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {form.formState.errors.services?.message && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.services.message}
        </p>
      )}
    </div>
  );
}
