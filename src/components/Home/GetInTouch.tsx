"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useSendContactMessageMutation } from "@/redux/features/contact/contactApi";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    agreeToTerms: true,
  });

  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactMessage({
        full_name: formData.fullName,
        email_address: formData.email,
        message: formData.message,
        is_agreed: formData.agreeToTerms,
      }).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        message: "",
        agreeToTerms: true,
      });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
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
    <section className=" bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
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
              <ul className="space-y-4 text-blue-50">
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>New York</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+19296618967"
                    className="hover:text-white transition-colors"
                  >
                    929-661-8967
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:connect@hey-iNeed.com"
                    className="hover:text-white transition-colors"
                  >
                    connect@hey-iNeed.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Side - Contact Form */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 md:p-12 flex items-center">
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-semibold py-3 px-6 rounded-lg"
                  >
                    {isLoading ? "Sending..." : "Send Messages"}
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
