/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EditProviderServiceInfoModal from "@/components/Dashboard/EditProviderServiceInfoModal";

function ServiceInformationPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data - replace with actual user data from API/context
  const [serviceData, setServiceData] = useState({
    serviceType: "cleaning",
    experienceLevel: "experienced",
    shortDescription:
      "Professional cleaning service with over 5 years of experience in residential and commercial cleaning.",
  });

  const handleSave = (updatedData: any) => {
    setServiceData(updatedData);
    // Here you would typically make an API call to save the data
  };

  // Helper function to get display label for service type
  const getServiceTypeLabel = (value: string) => {
    const types = [
      { value: "cleaning", label: "Cleaning Service" },
      { value: "deep-cleaning", label: "Deep Cleaning" },
      { value: "maintenance", label: "Maintenance" },
      { value: "plumbing", label: "Plumbing" },
      { value: "electrical", label: "Electrical" },
      { value: "carpentry", label: "Carpentry" },
      { value: "painting", label: "Painting" },
    ];
    return types.find((type) => type.value === value)?.label || value;
  };

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
                  value={getServiceTypeLabel(serviceData.serviceType)}
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
                  value={getExperienceLevelLabel(serviceData.experienceLevel)}
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
                  value={serviceData.shortDescription}
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
        serviceData={serviceData}
        onSave={handleSave}
      />
    </>
  );
}

export default ServiceInformationPage;
