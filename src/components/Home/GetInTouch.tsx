"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Blue Background Section */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0077CC] via-[#0066BB] to-[#0088DD]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full opacity-20"
              fill="none"
            >
              <circle cx="15" cy="50" r="35" fill="rgba(255,255,255,0.1)" />
              <circle cx="85" cy="20" r="25" fill="rgba(255,255,255,0.05)" />
              <circle cx="70" cy="80" r="30" fill="rgba(255,255,255,0.08)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-[500px]">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get In Touch
                <br />
                With Us
              </h2>
              <p className="text-blue-50 text-lg mb-6 flex items-start gap-2">
                Have questions or need help with your booking? Our team is here
                to assist you every step of the way.
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center">
              <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-blue-50/50"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-blue-50/50"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter Messages"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-blue-50/50 resize-none"
                      required
                    />
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-primary border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-gray-600"
                    >
                      I agree with{" "}
                      <Link
                        href="/terms-condition"
                        className="text-primary underline hover:text-primary-dark"
                      >
                        terms & conditions
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full font-semibold py-3 px-6 rounded-lg"
                  >
                    Send Messages
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
