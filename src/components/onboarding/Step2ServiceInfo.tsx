import React, { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { onboardingStep2Schema } from "@/schemas/auth.schema";
import { ChevronDown } from "lucide-react";

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
  const initializedRef = useRef(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [experienceLevel, setExperienceLevel] = useState(() => {
    const initialServices = form.getValues("services") || [];
    return initialServices[0]?.experienceLevel || "";
  });
  const [shortDescription, setShortDescription] = useState(() => {
    const initialServices = form.getValues("services") || [];
    return initialServices[0]?.shortDescription || "";
  });

  const selectedServices = form.watch("services") || [];
  const selectedServiceIds = new Set(
    selectedServices.map((service) => service.serviceType),
  );

  const serviceErrors = form.formState.errors.services;
  const serviceTypeError =
    !Array.isArray(serviceErrors) && serviceErrors?.message
      ? serviceErrors.message
      : undefined;
  const experienceError = Array.isArray(serviceErrors)
    ? serviceErrors.find((error) => error?.experienceLevel)?.experienceLevel
        ?.message
    : undefined;
  const shortDescriptionError = Array.isArray(serviceErrors)
    ? serviceErrors.find((error) => error?.shortDescription)?.shortDescription
        ?.message
    : undefined;

  const updateSelectedServices = (
    updater: (
      current: z.infer<typeof onboardingStep2Schema>["services"],
    ) => z.infer<typeof onboardingStep2Schema>["services"],
  ) => {
    const currentServices = form.getValues("services") || [];
    const updatedServices = updater(currentServices);
    form.setValue("services", updatedServices, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    updateSelectedServices((currentServices) => {
      if (!checked) {
        return currentServices.filter(
          (service) => service.serviceType !== serviceId,
        );
      }

      if (
        currentServices.some((service) => service.serviceType === serviceId)
      ) {
        return currentServices;
      }

      return [
        ...currentServices,
        {
          serviceType: serviceId,
          experienceLevel,
          shortDescription,
        },
      ];
    });
  };

  const handleExperienceChange = (value: string) => {
    setExperienceLevel(value);
    updateSelectedServices((currentServices) =>
      currentServices.map((service) => ({
        ...service,
        experienceLevel: value,
      })),
    );
  };

  const handleShortDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setShortDescription(value);
    updateSelectedServices((currentServices) =>
      currentServices.map((service) => ({
        ...service,
        shortDescription: value,
      })),
    );
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  };

  const activeExpandedCategories =
    expandedCategories.length > 0
      ? expandedCategories
      : serviceOptions?.data?.[0]
        ? [serviceOptions.data[0].category.id]
        : [];

  // Normalize default values and hydrate shared fields from existing selections.
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      const formServices = form.getValues("services") || [];
      const hasOnlyEmptyPlaceholder =
        formServices.length === 1 &&
        !formServices[0].serviceType &&
        !formServices[0].experienceLevel &&
        !formServices[0].shortDescription;

      if (hasOnlyEmptyPlaceholder) {
        form.setValue("services", [], {
          shouldValidate: true,
        });
      }
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Service Details
        </h2>
        <p className="text-sm text-slate-600">
          Select services from one or more categories.
        </p>
      </div>

      <div className="space-y-4">
        {(serviceOptions?.data || []).map((categoryItem) => {
          const categoryId = categoryItem.category.id;
          const isExpanded = activeExpandedCategories.includes(categoryId);

          return (
            <div
              key={categoryId}
              className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 lg:p-5"
            >
              <button
                type="button"
                onClick={() => toggleCategory(categoryId)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {categoryItem.category.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {categoryItem.services.length} services available
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {categoryItem.services.map((service) => {
                    const id = `service-${categoryId}-${service.id}`;

                    return (
                      <div
                        key={service.id}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
                      >
                        <Checkbox
                          id={id}
                          checked={selectedServiceIds.has(String(service.id))}
                          onCheckedChange={(checked) =>
                            handleServiceToggle(
                              String(service.id),
                              Boolean(checked),
                            )
                          }
                        />
                        <label
                          htmlFor={id}
                          className="cursor-pointer text-sm font-medium text-slate-700"
                        >
                          {service.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <Label className="text-slate-700 font-medium mb-2 block">
          Experience Level
        </Label>
        <Select value={experienceLevel} onValueChange={handleExperienceChange}>
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
        {experienceError && (
          <p className="text-red-500 text-sm mt-1">{experienceError}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="services-short-description"
          className="text-slate-700 font-medium mb-2 block"
        >
          Short Description
        </Label>
        <Textarea
          id="services-short-description"
          placeholder="Briefly describe your cleaning experience..."
          value={shortDescription}
          onChange={handleShortDescriptionChange}
          className="bg-white min-h-30"
        />
        {shortDescriptionError && (
          <p className="text-red-500 text-sm mt-1">{shortDescriptionError}</p>
        )}
      </div>

      {selectedServices.length > 0 && (
        <p className="text-xs text-slate-500">
          Selected services: {selectedServices.length}
        </p>
      )}

      {serviceTypeError && (
        <p className="text-red-500 text-sm">{serviceTypeError}</p>
      )}

      {form.formState.errors.services?.message && !serviceTypeError && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.services.message}
        </p>
      )}
    </div>
  );
}
