"use client";

import { Button } from "@/components/ui/button";
import { AdditionalService, ServiceImage } from "@/types/booking.type";
import Image from "next/image";

interface PaymentStepProps {
  serviceName: string;
  servicePrice: number;
  serviceImage: ServiceImage;
  additionalServices: AdditionalService[];
  selectedServiceIds: string[];
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({
  serviceName,
  servicePrice,
  serviceImage,
  additionalServices,
  selectedServiceIds,
  onNext,
  onBack,
}: PaymentStepProps) {
  const selectedServices = additionalServices.filter((s) =>
    selectedServiceIds.includes(s.id),
  );

  const serviceFee = servicePrice;
  const additionalServiceFee = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  const tax = (serviceFee + additionalServiceFee) * 0.1; // 10% tax
  const total = serviceFee + additionalServiceFee + tax;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">
          Choose your preferred service date and time slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Stripe</h3>
          <div className="bg-white rounded-lg border-2 border-blue-600 p-6 flex items-center justify-center">
            <svg
              className="w-20 h-20"
              viewBox="0 0 60 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8182 8.18182C14.8182 6.90909 15.7727 6.13636 17.3636 6.13636C19.5 6.13636 22.1364 6.81818 24.2727 7.95455V2.68182C22 1.59091 19.7273 1.13636 17.3636 1.13636C11.9545 1.13636 8.18182 4.09091 8.18182 8.54545C8.18182 15.0909 17.5 13.8636 17.5 16.7727C17.5 18.2273 16.3182 18.9545 14.5455 18.9545C12.1818 18.9545 9.22727 17.9545 6.86364 16.6364V21.9545C9.40909 23.1818 11.9545 23.7273 14.5455 23.7273C20.0909 23.7273 24.0909 20.8636 24.0909 16.3182C24.0909 9.27273 14.8182 10.7273 14.8182 8.18182Z"
                fill="#635BFF"
              />
              <path
                d="M30.7727 2.27273V1.72727L25.4545 2.27273V23.1818H31.8182V9.04545C33.4091 7.18182 35.9091 7.59091 36.7273 7.90909V1.72727C35.8636 1.40909 32.9091 0.818182 30.7727 3.54545V2.27273Z"
                fill="#635BFF"
              />
              <path
                d="M37.8182 1.72727H44.1818V23.1818H37.8182V1.72727Z"
                fill="#635BFF"
              />
              <path
                d="M46.3636 1.72727H52.7273V5.31818H46.3636V15.5C46.3636 17.7273 47.3636 18.5 49.5 18.5C50.5909 18.5 51.5909 18.2727 52.7273 17.9091V22.5909C51.4545 23.0909 50.0909 23.4091 48.4091 23.4091C43.9545 23.4091 40.0909 21.4545 40.0909 16.0909V5.31818H36.3636V1.72727H37.8636C40.2273 1.72727 41.6364 0.318182 41.6364 -2.04545V-4.54545H46.3636V1.72727Z"
                fill="#635BFF"
              />
              <path
                d="M66.2727 13.0909C66.2727 6.27273 62.5455 1.13636 56.1818 1.13636C49.8182 1.13636 45.7727 6.27273 45.7727 12.4545C45.7727 19.5 50.2273 23.7273 56.8636 23.7273C59.9545 23.7273 62.3636 23.0455 64.3636 21.8636V17C62.3636 18.0909 60.1818 18.6818 57.5909 18.6818C54.7727 18.6818 52.5455 17.4545 52.0909 14.2273H66.1818C66.2273 13.8182 66.2727 13.4091 66.2727 13.0909ZM52.0455 10.0455C52.0455 7.13636 53.9091 5.72727 56.1818 5.72727C58.4091 5.72727 60.1818 7.13636 60.1818 10.0455H52.0455Z"
                fill="#635BFF"
              />
            </svg>
          </div>

          {/* Payment Button */}
          <Button className="w-full mt-6" size="lg">
            Pay
          </Button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
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
              <span>Service fee</span>
              <span className="font-semibold">${serviceFee.toFixed(2)}</span>
            </div>
            {additionalServiceFee > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Additional Service</span>
                <span className="font-semibold">
                  ${additionalServiceFee.toFixed(2)}
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
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous
        </Button>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">You&apos;re 15% complete</p>
          <Button onClick={onNext} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
