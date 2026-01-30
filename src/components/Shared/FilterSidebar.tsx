"use client";

import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  searchKeyword: string;
  categories: string[];
  location: string;
  ratings: number[];
}

const categories = [
  { id: "all", label: "All Categories" },
  { id: "residential", label: "Residential Services" },
  { id: "apartment", label: "Apartment / Condo" },
  { id: "single-family", label: "Single-Family Home / Townhouse" },
  { id: "corporate", label: "Corporate and commercial cleaning" },
  { id: "move-in", label: "Move-in / move-out cleaning" },
  { id: "short-term", label: "Short-term rental" },
  { id: "specialty", label: "Specialty services" },
];

const ratings = [
  { stars: 5, count: 156 },
  { stars: 4, count: 103 },
  { stars: 3, count: 59 },
  { stars: 2, count: 32 },
  { stars: 1, count: 120 },
];

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([5]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      setSelectedCategories(["all"]);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories.filter((id) => id !== "all"), categoryId];

      setSelectedCategories(newCategories.length > 0 ? newCategories : ["all"]);
    }
  };

  const handleRatingChange = (stars: number) => {
    setSelectedRatings((prev) =>
      prev.includes(stars) ? prev.filter((r) => r !== stars) : [...prev, stars],
    );
  };

  const handleResetFilter = () => {
    setSearchKeyword("");
    setLocationSearch("");
    setSelectedCategories(["all"]);
    setSelectedRatings([5]);
  };

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange({
        searchKeyword,
        categories: selectedCategories,
        location: locationSearch,
        ratings: selectedRatings,
      });
    }
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
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
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
            {visibleCategories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm text-gray-600 cursor-pointer flex-1"
                >
                  {category.label}
                </label>
              </div>
            ))}
            {categories.length > 8 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                {showAllCategories ? "See less" : "See more"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAllCategories ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <button
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-medium text-gray-900">Location</h3>
          {isLocationOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isLocationOpen && (
          <div className="relative">
            <Input
              type="text"
              placeholder="what are you looking for?"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full pr-10"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            {ratings.map((rating) => (
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
                  <span className="text-sm text-gray-500">
                    ({rating.count})
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="w-full py-6 text-base font-medium"
      >
        Search
      </Button>
    </div>
  );
}
