"use client";

import { useState } from "react";
import{ StaticImageData } from "next/image";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";
import ServiceCard from "../Cards/ServiceCard";

export interface Service {
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
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
