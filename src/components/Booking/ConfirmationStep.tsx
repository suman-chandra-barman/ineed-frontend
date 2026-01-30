"use client";

import { Button } from "@/components/ui/button";
import { AdditionalService, ServiceImage } from "@/types/booking.type";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationStepProps {
  transactionId: string;
  serviceName: string;
  servicePrice: number;
  serviceImage: ServiceImage;
  additionalServices: AdditionalService[];
  selectedServiceIds: string[];
  onComplete: () => void;
}

export default function ConfirmationStep({
  transactionId,
  serviceName,
  servicePrice,
  serviceImage,
  additionalServices,
  selectedServiceIds,
  onComplete,
}: ConfirmationStepProps) {
  const selectedServices = additionalServices.filter((s) =>
    selectedServiceIds.includes(s.id),
  );

  const mainServiceCost = servicePrice;
  const additionalServiceCost = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  const tax = (mainServiceCost + additionalServiceCost) * 0.1;
  const total = mainServiceCost + additionalServiceCost + tax;

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600">
          Your service has been successfully booked.
        </p>
      </div>

      {/* Transaction ID */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Transaction ID</p>
        <p className="text-lg font-bold text-gray-900">#{transactionId}</p>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>

        {/* Main Service */}
        <div className="flex items-start gap-3 pb-4 mb-4 border-b border-gray-200">
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src={serviceImage}
              alt={serviceName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{serviceName}</h3>
            <p className="text-sm text-gray-500 mt-1">Starting From</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-yellow-600">${servicePrice}</p>
          </div>
        </div>

        {/* Additional Services */}
        {selectedServices.length > 0 && (
          <div className="space-y-3 pb-4 mb-4 border-b border-gray-200">
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.duration} min
                  </p>
                </div>
                <p className="font-bold text-yellow-600">${service.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 pb-4 mb-4 border-b border-gray-200">
          <div className="flex justify-between text-gray-700">
            <span>Main Service</span>
            <span className="font-semibold">${mainServiceCost.toFixed(2)}</span>
          </div>
          {additionalServiceCost > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Additional Service</span>
              <span className="font-semibold">
                ${additionalServiceCost.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button onClick={onComplete} size="lg" className="px-8">
          Start New Project
        </Button>
      </div>
    </div>
  );
}
