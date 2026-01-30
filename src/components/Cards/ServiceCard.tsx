"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "../Home/Services";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();

  const handleBookNow = (e: React.MouseEvent) => {
    // Prevent card click navigation
    e.stopPropagation();
    e.preventDefault();

    // Navigate to service details page with booking section in focus
    router.push(`/services/${service.id}?scrollTo=booking`);
  };

  return (
    <Link
      href={`/services/${service.id}`}
      className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`View details for ${service.title}`}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 bg-gray-200">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Spacer to push footer to bottom */}
        <div className="grow"></div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs sm:text-sm text-gray-600">Price: </span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {service.price}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {service.rating}
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBookNow}
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
          aria-label={`Book ${service.title} now`}
        >
          Book Now
        </Button>
      </div>
    </Link>
  );
}

export default ServiceCard;
