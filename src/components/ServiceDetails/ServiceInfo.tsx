"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

interface ServiceInfoProps {
  overview: {
    title: string;
    description: string;
  };
  additionalServices: AdditionalService[];
}

export default function ServiceInfo({
  overview,
  additionalServices,
}: ServiceInfoProps) {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const [isAdditionalExpanded, setIsAdditionalExpanded] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    overview.description.length > 200
      ? overview.description.substring(0, 200) + "..."
      : overview.description;

  return (
    <div className="space-y-4">
      {/* Service Overview Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {overview.title}
          </h2>
          {isOverviewExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isOverviewExpanded && (
          <div className="px-6 pb-6">
            <p className="text-gray-600 leading-relaxed">
              {showFullDescription
                ? overview.description
                : truncatedDescription}
            </p>
            {overview.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-3 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Additional Services Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => setIsAdditionalExpanded(!isAdditionalExpanded)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Additional Service
          </h2>
          {isAdditionalExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isAdditionalExpanded && (
          <div className="px-6 pb-6 space-y-4">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                {/* Service Image */}
                <div className="shrink-0 w-full sm:w-20 h-20">
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/80x80/e5e7eb/6b7280?text=Service`;
                      }}
                    />
                  </div>
                </div>

                {/* Service Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price and Duration */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                  <span className="text-xl md:text-2xl font-bold text-yellow-500">
                    ${service.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {service.duration} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
