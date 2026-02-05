"use client";

import { Headphones, Users, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Headphones className="w-10 h-10 sm:w-12 sm:h-12" />,
      iconBg: "bg-amber-400",
      title: "Because reliability includes real support",
      description:
        "We don't just connect you with a provider — we stay involved from booking through completion. If something needs attention, our team is here to help, without the chasing or guesswork.",
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" />,
      iconBg: "bg-teal-500",
      title: "Because clarity builds trust",
      description:
        "Clear scopes, open communication, and verified completion so everyone stay aligned.",
    },
    {
      icon: <Sparkles className="w-10 h-10 sm:w-12 sm:h-12" />,
      iconBg: "bg-orange-500",
      title: "Because cleaning should feel easier",
      description:
        "From booking to finish, we focus on making the experience simple, dependable, and stress-free.",
    },
  ];

  return (
    <section className="bg-[#FBFBFB]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Why People Choose <span className="text-primary">iNeed</span>
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`${reason.iconBg} text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center`}
                >
                  {reason.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
