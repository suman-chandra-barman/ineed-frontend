/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useGetBookingAddonsQuery,
  useUpdateBookingAddonsMutation,
} from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface AdditionalFeaturesStepProps {
  bookingId: number;
  onNext: () => void;
}

export default function AdditionalFeaturesStep({
  bookingId,
  onNext,
}: AdditionalFeaturesStepProps) {
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetBookingAddonsQuery(bookingId);
  const [updateAddons, { isLoading: isUpdating }] =
    useUpdateBookingAddonsMutation();

  const [selectedServices, setSelectedServices] = useState<number[]>(
    bookingData?.selected_addon_ids ?? [],
  );

  const handleServiceToggle = (serviceId: number) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleNext = async () => {
    try {
      await updateAddons({
        bookingId,
        addon_ids: selectedServices,
      }).unwrap();

      toast.success("Additional features updated successfully");
      onNext();
    } catch (error: any) {
      console.error("Failed to update addons:", error);
      toast.error(
        error?.data?.message || "Failed to update additional features",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load additional features</p>
      </div>
    );
  }

  const availableAddons = bookingData.available_addons;
  const selectedAddonsData = availableAddons.filter((addon) =>
    selectedServices.includes(addon.id),
  );
  const totalAdditionalCost = selectedAddonsData.reduce(
    (sum, addon) => sum + parseFloat(addon.price),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Additional Features
        </h2>
        <p className="text-gray-600">
          Select any optional add-on services to customize your service.
        </p>
      </div>

      {/* Service List */}
      <div className="space-y-4">
        {availableAddons.map((addon) => {
          const isSelected = selectedServices.includes(addon.id);

          return (
            <div
              key={addon.id}
              className={`flex items-start gap-4 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleServiceToggle(addon.id)}
            >
              {addon.image && (
                <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${addon.image}`}
                    alt={addon.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {addon.title}
                </h3>
                <p className="text-sm text-gray-600">{addon.subtitle}</p>
              </div>

              <div className="shrink-0 flex items-center justify-end gap-4 text-right">
                <div>
                  <div className="font-bold text-yellow-600 text-lg">
                    ${addon.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {addon.estimate_time} {addon.estimate_time_unit}
                  </div>
                </div>
                {isSelected ? (
                  <Button size="sm" className="mt-2 w-20 bg-yellow-500">
                    - Added
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="mt-2 w-20">
                    + Add
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Base Service:</span>
          <span className="font-semibold">
            ${bookingData.service.base_price}
          </span>
        </div>
        {selectedAddonsData.length > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Additional Features:</span>
            <span className="font-semibold">
              ${totalAdditionalCost.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
          <span>Estimated Total:</span>
          <span className="text-primary">
            $
            {(
              parseFloat(bookingData.service.base_price) + totalAdditionalCost
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          size="lg"
          className="px-8"
          disabled={isUpdating}
        >
          {isUpdating ? (
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
  );
}
