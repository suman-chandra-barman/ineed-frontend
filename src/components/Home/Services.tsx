"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";


interface Service {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  price: string;
  rating: number;
  category: string[];
}

export default function Services() {
  const [activeTab, setActiveTab] = useState("all");

  const services: Service[] = [
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

  const tabs = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential cleaning" },
    { id: "commercial", label: "Commercial cleaning" },
    { id: "move", label: "Move-in / move-out cleaning" },
    { id: "specialty", label: "Specialty services" },
  ];

  const filteredServices = services.filter((service) =>
    service.category.includes(activeTab),
  );

  return (
    <section className="bg-primary/5 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto container">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Services You Can{" "}
            <span className="text-primary">Book With Confidence</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-primary border-2 border-primary shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
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
                    <span className="text-xs sm:text-sm text-gray-600">
                      Price:{" "}
                    </span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
