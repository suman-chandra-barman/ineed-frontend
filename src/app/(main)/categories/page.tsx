"use client";

import { CategoryCard } from "@/components/Cards/CategoryCard";
import { ErrorDisplay } from "@/components/Shared/ErrorDisplay";
import { CategoryGridSkeleton } from "@/components/Skeleton/CategoryGridSkeleton";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Category } from "@/types/category";
import { ChevronRight, Home } from "lucide-react";

function CategoriesPage() {
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery({});

  return (
    <main className="bg-[#FBFBFB]">
      <div className="space-y-4 py-8 sm:py-12 lg:py-16 bg-primary/5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Services
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Home size={20} />
          <ChevronRight size={20} />
          <span>Services</span>
        </div>
      </div>
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {isLoading ? (
          <CategoryGridSkeleton count={4} />
        ) : error ? (
          <ErrorDisplay
            title="Failed to Load Categories"
            message="We couldn't load the categories. Please try again later."
            onRetry={() => window.location.reload()}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categoriesData?.data.map((category: Category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.category_name}
                description={category.subtitle}
                icon={category.category_icon_upload}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
export default CategoriesPage;
