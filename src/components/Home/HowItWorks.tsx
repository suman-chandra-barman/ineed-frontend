"use client";

import customer from "@/assets/customer.svg";
import connection from "@/assets/connection.svg";
import like from "@/assets/like.svg";
import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: 1,
      image: customer,
      title: "Tell us what you need",
      description:
        "Choose the service, pick a time, and share a few details. We'll take care of the rest.",
    },
    {
      stepNumber: 2,
      image: connection,
      title: "We handle the connection",
      description:
        "We match you with a verified provider and keep all communication and updates in one place.",
    },
    {
      stepNumber: 3,
      image: like,
      title: "Relax—we've got you covered",
      description:
        "Your service is completed with care, confirmed with before-and-after photos, and backed by our customer support.",
    },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto container">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            How Our Service <span className="text-primary">Process Works</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-3 sm:mt-4 max-w-3xl mx-auto">
            A simple, transparent process designed to give you complete peace of
            mind from start to finish.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  className="w-30! h-30! sm:w-20 sm:h-20"
                />
              </div>

              {/* Step Number */}
              <div className="text-center mb-4">
                <span className="text-primary font-bold text-lg sm:text-xl">
                  Step {step.stepNumber}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
