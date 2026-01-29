"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Side - Blue Gradient Background */}
          <div className="bg-linear-to-br h-full from-primary via-primary/80 to-primary/50 lg:rounded-l-3xl p-12 lg:p-16 flex flex-col justify-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Get In Touch
                <br />
                With Us
              </h2>
              <p className="text-blue-50 text-lg">
                Have questions or need help with your booking? Our team is here
                to assist you every step of the way.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white lg:rounded-r-3xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="bg-blue-50/50 border-blue-100 h-12 rounded-xl"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-blue-50/50 border-blue-100 h-12 rounded-xl"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter Messages"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-blue-50/50 border-blue-100 min-h-[120px] rounded-xl resize-none"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      agreeToTerms: checked as boolean,
                    })
                  }
                  className="border-gray-300"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  I agree with{" "}
                  <a
                    href="#"
                    className="text-primary underline hover:text-primary-dark"
                  >
                    terms & conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-semibold text-base"
              >
                Send Messages
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
