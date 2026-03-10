"use client";

import Image from "next/image";
import { Heart, Eye, Scale, ShieldCheck } from "lucide-react";
import aboutMain from "@/assets/about-main.jpg";
import aboutSmall from "@/assets/about-small.jpg";

const values = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Care comes first",
    description: "Every interaction should feel respectful and thoughtful.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Transparency matters",
    description: "Clear communication, clear pricing, no surprises.",
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Fairness for all",
    description: "A balanced experience for both customers and providers.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Reliability you can trust",
    description: "If something needs attention, we're here to help.",
  },
];

export default function AboutUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            About <span className="text-primary">iNeed</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            A better way to get the help you need—without the stress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Side - Images */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="relative h-90 sm:h-120 rounded-3xl overflow-hidden">
                <Image
                  src={aboutMain}
                  alt="Service professionals"
                  fill
                  className="object-cover"
                />
              </div>
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
          <div className="order-1 lg:order-2 space-y-6">
            {/* Why iNeed exists */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Why iNeed exists
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                Life gets busy. Whether you&#39;re managing a home, preparing a
                move, or taking care of everyday responsibilities, finding
                reliable help shouldn&#39;t be another thing to worry about.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                iNeed was created to make getting services simple, trustworthy,
                and stress-free. Too often, people are left guessing—Will the
                job be done right? Who do I call if something goes wrong? What
                happens after I book?
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We built iNeed to answer those questions before they ever become
                problems.
              </p>
            </div>

            {/* Mission and values */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Mission and values
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                To connect people with dependable service providers while making
                every experience feel supported and fair. We&#39;re guided by a few
                core values:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 flex gap-3 items-start hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="bg-primary text-white rounded-full p-2 shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {value.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
                We believe great service isn&#39;t just about completing a task—it&#39;s
                about how you feel throughout the process.
              </p>
            </div>

            {/* Peace of mind */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Peace-of-mind and customer care
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                At iNeed, peace of mind isn&#39;t an extra feature—it&#39;s built into
                everything we do.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                From easy scheduling and in-platform communication to job
                confirmation with before-and-after photos, we&#39;ve designed our
                platform so you always know what&#39;s happening. And if something
                doesn&#39;t go as expected, our support team is here to step in and
                make it right.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                With our service, getting help feels easier and more reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
