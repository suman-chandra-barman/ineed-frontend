import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "../Home/Services";
import { Star, Heart } from "lucide-react";
import { Button } from "../ui/button";

interface ServiceCardProps {
  service: Service;
  priority?: boolean;
}

const ServiceCard = memo(({ service, priority = false }: ServiceCardProps) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <Link
        href={`/services/${service.id}`}
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
        aria-label={`View ${service.title} service details`}
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.title} service thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />

          {/* Favorite Icon */}
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Heart className={`w-5 h-5 transition-colors duration-200 `} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 grow">
            {service.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Price: </span>
              <span className="text-sm sm:text-base font-bold text-gray-900">
                {service.price}
              </span>
            </div>
            <div
              className="flex items-center gap-1"
              aria-label={`Rated ${service.rating} out of 5 stars`}
            >
              <Star
                className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-900">
                {service.rating}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            asChild
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
            aria-label={`Book ${service.title} now`}
          >
            <Link href={`/booking/${service.id}`}>Book Now</Link>
          </Button>
        </div>
      </Link>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
