"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service as StaticService } from "../Home/Services";
import { Service as ApiService } from "@/types/service.type";
import { Star, Heart } from "lucide-react";
import { Button } from "../ui/button";

interface ServiceCardProps {
  service: StaticService | ApiService;
  priority?: boolean;
}
const handleFavoriteClick = (serviceId: number) => {
  // Implement favorite logic here
  console.log(`Toggled favorite for service ID: ${serviceId}`);
};

// Type guard to check if service is from API
const isApiService = (
  service: StaticService | ApiService,
): service is ApiService => {
  return "category_id" in service;
};

const ServiceCard = memo(({ service, priority = false }: ServiceCardProps) => {
  // Extract data based on service type
  const serviceData = isApiService(service)
    ? {
        id: service.id,
        title: service.name,
        description: service.description,
        image: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${service.image}`,
        price: `$${service.offer_price}`,
        originalPrice:
          service.man_price !== service.offer_price
            ? `$${service.man_price}`
            : null,
        rating: 4.5, // Default rating since API doesn't provide it yet
      }
    : {
        id: service.id,
        title: service.title,
        description: service.description,
        image: service.image,
        price: service.price,
        originalPrice: null,
        rating: service.rating,
      };

  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <Link
        href={`/services/${serviceData.id}`}
        className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`View ${serviceData.title} service details`}
      >
        <Image
          src={serviceData.image}
          alt={`${serviceData.title} service thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />

        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavoriteClick(serviceData.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Heart className={`w-5 h-5 transition-colors duration-200 `} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <Link
          href={`/services/${serviceData.id}`}
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {serviceData.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 grow">
          {serviceData.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs sm:text-sm text-gray-600">Price: </span>
            {serviceData.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through mr-2">
                {serviceData.originalPrice}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {serviceData.price}
            </span>
          </div>
          <div
            className="flex items-center gap-1"
            aria-label={`Rated ${serviceData.rating} out of 5 stars`}
          >
            <Star
              className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {serviceData.rating}
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          asChild
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
          aria-label={`Book ${serviceData.title} now`}
        >
          <Link href={`/booking/${serviceData.id}`}>Book Now</Link>
        </Button>
      </div>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
