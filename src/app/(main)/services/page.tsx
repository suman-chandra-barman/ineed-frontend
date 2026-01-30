"use client";

import { useState } from "react";
import FilterSidebar, { FilterState } from "@/components/Shared/FilterSidebar";
import ServiceCard from "@/components/Cards/ServiceCard";
import Pagination from "@/components/Shared/Pagination";
import { ChevronDown, ChevronRight, Home } from "lucide-react";
import { services } from "@/components/Home/Services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Generate more services for pagination demo
const allServices = Array.from({ length: 56 }, (_, i) => ({
  ...services[i % services.length],
  id: i + 1,
}));

const ITEMS_PER_PAGE = 9;

function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [sortBy, setSortBy] = useState("price-low-to-high");

  // Calculate pagination
  const totalPages = Math.ceil(allServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = allServices.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    console.log("Filters applied:", newFilters);
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
            <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Found{" "}
                <span className="text-amber-500">
                  {allServices.length} Services
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

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
