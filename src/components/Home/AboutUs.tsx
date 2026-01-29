"use client";

import Image from "next/image";
import { Trophy, Share2, ShieldCheck, ClipboardCheck } from "lucide-react";
import aboutMain from "@/assets/about-main.jpg";
import aboutSmall from "@/assets/about-small.jpg";

export default function AboutUs() {
  const stats = [
    {
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      iconBg: "bg-amber-400",
      number: "20 +",
      label: "Years of Experience",
    },
    {
      icon: <Share2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      iconBg: "bg-amber-400",
      number: "20 +",
      label: "Service Categories",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
      iconBg: "bg-amber-400",
      number: "500 +",
      label: "Completed Services",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
      iconBg: "bg-amber-400",
      number: "800 +",
      label: "Verified Jobs",
    },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Images */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image - spans 2 rows */}
              <div className="col-span-2 row-span-2 relative h-100 sm:h-125 rounded-3xl overflow-hidden">
                <Image
                  src={aboutMain}
                  alt="Service professionals"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Small image at bottom right - overlapping */}
              <div className="absolute bottom-0 right-0 w-[45%] h-[35%] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={aboutSmall}
                  alt="Team working"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              About The Story <span className="text-primary">Behind Us</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 lg:mb-12 leading-relaxed">
              Ineedllc was built to solve a common problem in service
              marketplaces—lack of accountability. Instead of leaving customers
              and providers to handle issues alone, we act as the trusted
              middleman. Our platform ensures quality control, fair resolutions,
              and a seamless experience for everyone involved.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {stat.number}
                    </h3>
                    <div
                      className={`${stat.iconBg} text-white rounded-full p-2 sm:p-2.5`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
