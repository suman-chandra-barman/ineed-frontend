import React from "react";
import Image from "next/image";
import type { JobService } from "@/types/provider.type";

interface JobServiceInfoProps {
  services: JobService[];
}

export default function JobServiceInfo({ services }: JobServiceInfoProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Service Information&apos;s:
      </h3>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.service_id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Service Image and Details */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                  <Image
                    src={
                      service.service_image
                        ? `${baseUrl}${service.service_image}`
                        : "/service-placeholder.jpg"
                    }
                    alt={service.service_name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {service.service_name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {service.quantity}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-blue-600">
                  ${service.starting_from}
                </div>
                <div className="text-xs text-gray-500">Starting From</div>
              </div>
            </div>

            {/* Additional Features */}
            {service.additional_features &&
              service.additional_features.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  {service.additional_features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {feature.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({feature.duration})
                        </span>
                      </div>
                      <span className="text-sm font-bold text-yellow-500">
                        ${feature.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
