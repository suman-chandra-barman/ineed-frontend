import Image from "next/image";
import { Service } from "../Home/Services";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      key={service.id}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
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
      <div className="p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
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
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {service.rating}
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <Button className="w-full py-2.5 sm:py-3 text-sm sm:text-base">
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default ServiceCard;
