"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Category } from "@/types/category";

interface FilterSidebarProps {
  categories?: Category[];
  isCategoriesLoading?: boolean;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  searchKeyword: string;
  categoryIds: number[];
  ratings: number[];
}

const ratingOptions = [
  { stars: 5 },
  { stars: 4 },
  { stars: 3 },
  { stars: 2 },
  { stars: 1 },
];

export default function FilterSidebar({
  categories = [],
  isCategoriesLoading = false,
  onFilterChange,
}: FilterSidebarProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const applyFilters = (
    overrides: Partial<{
      searchKeyword: string;
      categoryIds: number[];
      ratings: number[];
    }> = {},
  ) => {
    if (onFilterChange) {
      onFilterChange({
        searchKeyword: overrides.searchKeyword ?? searchKeyword,
        categoryIds: overrides.categoryIds ?? selectedCategoryIds,
        ratings: overrides.ratings ?? selectedRatings,
      });
    }
  };

  const handleCategoryChange = (categoryId: number | "all") => {
    if (categoryId === "all") {
      // "All" clears category filter
      setSelectedCategoryIds([]);
      applyFilters({ categoryIds: [] });
      return;
    }

    const newIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

    setSelectedCategoryIds(newIds);
    applyFilters({ categoryIds: newIds });
  };

  const handleRatingChange = (stars: number) => {
    const newRatings = selectedRatings.includes(stars)
      ? selectedRatings.filter((r) => r !== stars)
      : [...selectedRatings, stars];

    setSelectedRatings(newRatings);
    applyFilters({ ratings: newRatings });
  };

  const handleResetFilter = () => {
    setSearchKeyword("");
    setSelectedCategoryIds([]);
    setSelectedRatings([]);
    applyFilters({ searchKeyword: "", categoryIds: [], ratings: [] });
  };

  const handleSearch = () => {
    applyFilters();
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < count ? "text-amber-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  return (
    <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={handleResetFilter}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset Filter
        </button>
      </div>

      {/* Search by keywords */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Search By keywords
        </h3>
        <Input
          type="text"
          placeholder="what are you looking for?"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-full"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-medium text-gray-900">Categories</h3>
          {isCategoryOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isCategoryOpen && (
          <div className="space-y-3">
            {isCategoriesLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={`cat-skeleton-${index}`}
                    className="flex items-center gap-3"
                  >
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* All Categories option */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="category-all"
                    checked={selectedCategoryIds.length === 0}
                    onCheckedChange={() => handleCategoryChange("all")}
                  />
                  <label
                    htmlFor="category-all"
                    className="text-sm text-gray-600 cursor-pointer flex-1"
                  >
                    All
                  </label>
                </div>
                {visibleCategories.map((category) => (
                  <div key={category.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategoryIds.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm text-gray-600 cursor-pointer flex-1"
                    >
                      {category.category_name}
                    </label>
                  </div>
                ))}
                {categories.length > 8 && (
                  <Button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    {showAllCategories ? "See less" : "See more"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showAllCategories ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-medium text-gray-900">Ratings</h3>
          {isRatingOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isRatingOpen && (
          <div className="space-y-3">
            {ratingOptions.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <Checkbox
                  id={`rating-${rating.stars}`}
                  checked={selectedRatings.includes(rating.stars)}
                  onCheckedChange={() => handleRatingChange(rating.stars)}
                />
                <label
                  htmlFor={`rating-${rating.stars}`}
                  className="flex items-center justify-between flex-1 cursor-pointer"
                >
                  {renderStars(rating.stars)}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <Button onClick={handleSearch} className="w-full">
        Search
      </Button>
    </div>
  );
}
