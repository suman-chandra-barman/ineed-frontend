import { ServiceCardSkeleton } from "./ServiceCardSkeleton";

/**
 * ServiceGridSkeleton Component
 *
 * Grid layout skeleton for multiple service cards
 *
 * @param count - Number of skeleton cards to display (default: 9)
 */

interface ServiceGridSkeletonProps {
  count?: number;
}

export function ServiceGridSkeleton({ count = 9 }: ServiceGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={`service-skeleton-${index}`} />
      ))}
    </div>
  );
}
