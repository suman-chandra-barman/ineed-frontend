"use client";

import { AdditionalService } from "@/types/booking.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AdditionalFeaturesStepProps {
  services: AdditionalService[];
  selectedServices: string[];
  onServicesChange: (serviceIds: string[]) => void;
  onNext: () => void;
}

export default function AdditionalFeaturesStep({
  services,
  selectedServices,
  onServicesChange,
  onNext,
}: AdditionalFeaturesStepProps) {
  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onServicesChange(selectedServices.filter((id) => id !== serviceId));
    } else {
      onServicesChange([...selectedServices, serviceId]);
    }
  };

  const selectedServicesData = services.filter((s) =>
    selectedServices.includes(s.id),
  );
  const totalAdditionalCost = selectedServicesData.reduce(
    (sum, service) => sum + service.price,
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
          Select any optional add-on services to customize your cleaning.
        </p>
      </div>

      {/* Service List */}
      <div className="space-y-4 ">
        {" "}
        {/* max-h-[400px] overflow-y-auto */}
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);

          return (
            <div
              key={service.id}
              className={`flex items-start gap-4 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
              </div>

              <div className=" flex-shrink-0 flex items-center justify-end gap-4 text-right">
                <div>
                  <div className="font-bold text-yellow-600 text-lg">
                    ${service.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.duration} min
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
      {selectedServices.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            {selectedServices.length} additional service(s) selected
          </p>
          <p className="text-lg font-bold text-gray-900">
            Additional Cost: ${totalAdditionalCost.toFixed(2)}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-sm text-gray-600">You&apos;re 15% complete</p>
        <Button onClick={onNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
