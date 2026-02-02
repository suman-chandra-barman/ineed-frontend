/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EditProviderServiceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: {
    serviceType: string;
    experienceLevel: string;
    shortDescription: string;
  };
  onSave: (data: any) => void;
}

const SERVICE_TYPES = [
  { value: "cleaning", label: "Cleaning Service" },
  { value: "deep-cleaning", label: "Deep Cleaning" },
  { value: "maintenance", label: "Maintenance" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "carpentry", label: "Carpentry" },
  { value: "painting", label: "Painting" },
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "experienced", label: "Experienced (3+ years)" },
];

export default function EditProviderServiceInfoModal({
  isOpen,
  onClose,
  serviceData,
  onSave,
}: EditProviderServiceInfoModalProps) {
  const [formData, setFormData] = useState({
    serviceType: serviceData.serviceType,
    experienceLevel: serviceData.experienceLevel,
    shortDescription: serviceData.shortDescription,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      serviceType: serviceData.serviceType,
      experienceLevel: serviceData.experienceLevel,
      shortDescription: serviceData.shortDescription,
    });
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Edit Service Information
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update your service details below
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Service Type */}
            <div>
              <Label
                htmlFor="serviceType"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Service Type
              </Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceType: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select service type..." />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div>
              <Label
                htmlFor="experienceLevel"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Experience Level
              </Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, experienceLevel: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select experience level..." />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Short Description */}
            <div>
              <Label
                htmlFor="shortDescription"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Short Description (optional)
              </Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                placeholder="Briefly describe your cleaning experience Info Note..."
                className="w-full min-h-[120px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
