"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar, { FilterState } from "@/components/Shared/FilterSidebar";
import ServiceCard from "@/components/Cards/ServiceCard";
import Pagination from "@/components/Shared/Pagination";
import { ServiceGridSkeleton } from "@/components/Skeleton";
import { ErrorDisplay, EmptyState } from "@/components/Shared/ErrorDisplay";
import { ChevronDown, ChevronRight, Home, PackageX } from "lucide-react";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Category } from "@/types/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 9;

function ServicesPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("price-low-to-high");
  const [filters, setFilters] = useState<FilterState>({
    searchKeyword: "",
    categoryIds: categoryId ? [parseInt(categoryId)] : [],
    ratings: [],
  });

  // Fetch categories for the filter sidebar
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  const categories = (categoriesData?.data as Category[]) || [];

  // Build API query params from filter state
  const queryParams: {
    category_id?: string;
    search?: string;
    rating?: string;
    page: number;
    limit: number;
  } = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  if (filters.categoryIds.length > 0) {
    queryParams.category_id = filters.categoryIds.join(",");
  }
  if (filters.searchKeyword) {
    queryParams.search = filters.searchKeyword;
  }
  if (filters.ratings.length > 0) {
    queryParams.rating = filters.ratings.join(",");
  }

  // Fetch services from API
  const {
    data: servicesData,
    isLoading,
    error,
  } = useGetServicesQuery(queryParams);

  // Calculate pagination
  const totalPages = servicesData?.meta?.totalPage || 1;
  const totalServices = servicesData?.meta?.total || 0;

  const handleFilterChange = (newFilters: FilterState) => {
    setCurrentPage(1); // Reset to first page when filters change
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of services section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:shrink-0">
            <FilterSidebar
              categories={categories}
              isCategoriesLoading={isCategoriesLoading}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Found{" "}
                <span className="text-amber-500">
                  {isLoading ? "..." : `${totalServices} Services`}
                </span>
              </h1>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    <span className="font-medium">Sort:</span>
                    <span>
                      {sortBy === "price-low-to-high" && "Price: low to high"}
                      {sortBy === "price-high-to-low" && "Price: high to low"}
                      {sortBy === "rating" && "Rating"}
                      {sortBy === "newest" && "Newest"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-low-to-high")}
                  >
                    Price: low to high
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-high-to-low")}
                  >
                    Price: high to low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Newest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Services Grid */}
            {isLoading ? (
              <ServiceGridSkeleton count={9} />
            ) : error ? (
              <ErrorDisplay
                title="Failed to Load Services"
                message="We couldn't load the services. Please check your connection and try again."
                onRetry={() => window.location.reload()}
              />
            ) : !servicesData?.data || servicesData.data.length === 0 ? (
              <EmptyState
                title="No Services Found"
                message="We couldn't find any services matching your criteria. Try adjusting your filters."
                icon={
                  <div className="rounded-full bg-gray-100 p-4">
                    <PackageX className="w-12 h-12 text-gray-400" />
                  </div>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {servicesData.data.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
