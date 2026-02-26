import { CategoryCardSkeleton } from "./CategoryCardSkeleton";

/**
 * CategoryGridSkeleton Component
 *
 * Grid layout skeleton for multiple category cards
 *
 * @param count - Number of skeleton cards to display (default: 4)
 */

interface CategoryGridSkeletonProps {
  count?: number;
}

export function CategoryGridSkeleton({ count = 4 }: CategoryGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={`category-skeleton-${index}`} />
      ))}
    </div>
  );
}
