/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EditProviderServiceInfoModal from "@/components/Dashboard/EditProviderServiceInfoModal";
import {
  useGetProviderServiceInformationQuery,
  useUpdateProviderServiceInformationMutation,
} from "@/redux/features/provider/providerApi";
import { toast } from "sonner";

function ServiceInformationPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // API hooks
  const { data, isLoading, isError, error } =
    useGetProviderServiceInformationQuery();
  const [updateServiceInformation, { isLoading: isUpdating }] =
    useUpdateProviderServiceInformationMutation();

  const handleSave = async (updatedData: any) => {
    try {
      await updateServiceInformation({
        experience_level: updatedData.experienceLevel,
        short_description: updatedData.shortDescription,
      }).unwrap();
      toast.success("Service information updated successfully!");
      setIsEditModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update service information");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Loading service information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !data?.success) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Failed to load service information
            </p>
            <p className="text-gray-600 text-sm">
              {(error as any)?.data?.message || "Please try again later"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const serviceInfo = data.data;

  // Helper function to get display label for experience level
  const getExperienceLevelLabel = (value: string) => {
    const levels = [
      { value: "beginner", label: "Beginner (0-1 years)" },
      { value: "intermediate", label: "Intermediate (1-3 years)" },
      { value: "experienced", label: "Experienced (3+ years)" },
    ];
    return levels.find((level) => level.value === value)?.label || value;
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Service Information
              </h1>
            </div>
          </div>

          {/* Service Information Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Service Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your service type and experience information
                </p>
              </div>
              <Button onClick={() => setIsEditModalOpen(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Service Type */}
              <div>
                <Label
                  htmlFor="serviceType"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Service Type
                </Label>
                <Input
                  id="serviceType"
                  value={serviceInfo.service.name}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>

              {/* Experience Level */}
              <div>
                <Label
                  htmlFor="experienceLevel"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Experience Level
                </Label>
                <Input
                  id="experienceLevel"
                  value={getExperienceLevelLabel(serviceInfo.experience_level)}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>

              {/* Short Description */}
              <div>
                <Label
                  htmlFor="shortDescription"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Short Description (optional)
                </Label>
                <Textarea
                  id="shortDescription"
                  value={serviceInfo.short_description}
                  disabled
                  placeholder="Briefly describe your service experience..."
                  className="bg-gray-50 border-gray-200 text-gray-900 min-h-[120px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProviderServiceInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        serviceData={{
          serviceName: serviceInfo.service.name,
          experienceLevel: serviceInfo.experience_level,
          shortDescription: serviceInfo.short_description,
        }}
        onSave={handleSave}
        isLoading={isUpdating}
      />
    </>
  );
}

export default ServiceInformationPage;
