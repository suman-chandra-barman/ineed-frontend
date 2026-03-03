"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";
import ServiceCard from "../Cards/ServiceCard";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { ServiceCardSkeleton } from "../Skeleton/ServiceCardSkeleton";
import { Category } from "@/types/category";

export interface Service {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  price: string;
  rating: number;
  category: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 2,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 3,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 4,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
  {
    id: 5,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 6,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 7,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 8,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
];

export default function Services() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  // Fetch services based on active category (all services if no category selected)
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetServicesQuery(
      activeCategoryId ? { category_id: activeCategoryId } : {},
    );

  const categories = (categoriesData?.data as Category[]) || [];
  const displayServices = servicesData?.data || [];

  return (
    <section className="bg-primary/5">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Services You Can{" "}
            <span className="text-primary">Book With Confidence</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center">
          {isCategoriesLoading ? (
            // Skeleton loading for tabs
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={`tab-skeleton-${index}`}
                  className="h-11 w-32 sm:w-40 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </>
          ) : (
            <>
              {/* All Tab */}
              <button
                onClick={() => setActiveCategoryId(null)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategoryId === null
                    ? "bg-white text-primary border-2 border-primary shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                All
              </button>

              {/* Dynamic Category Tabs */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeCategoryId === category.id
                      ? "bg-white text-primary border-2 border-primary shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isServicesLoading ? (
            // Skeleton loading for services
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <ServiceCardSkeleton key={`service-skeleton-${index}`} />
              ))}
            </>
          ) : displayServices.length > 0 ? (
            displayServices.slice(0, 8).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            // No services found message
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No services available in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
