/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

interface EditProviderPersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    fullName: string;
    email: string;
    contactNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    avatar?: string;
  };
  onSave: (data: any) => void;
}

// US States list
const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function EditProviderPersonalInfoModal({
  isOpen,
  onClose,
  userData,
  onSave,
}: EditProviderPersonalInfoModalProps) {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    contactNumber: userData.contactNumber,
    streetAddress: userData.streetAddress,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    avatar: userData.avatar,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      fullName: userData.fullName,
      contactNumber: userData.contactNumber,
      streetAddress: userData.streetAddress,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      avatar: userData.avatar,
    });
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Edit Personal Information
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update your personal details below
        </p>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3">
              {formData.avatar ? (
                <Image
                  src={formData.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Upload className="w-8 h-8" />
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="text-primary text-sm font-medium cursor-pointer hover:text-primary/90"
            >
              Change Photo
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                First Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter full name"
                className="w-full"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <Label
                htmlFor="contactNumber"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                placeholder="Enter contact number"
                className="w-full"
                required
              />
            </div>

            {/* Street Address */}
            <div>
              <Label
                htmlFor="streetAddress"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Street Address
              </Label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) =>
                  setFormData({ ...formData, streetAddress: e.target.value })
                }
                placeholder="Enter street address"
                className="w-full"
              />
            </div>

            {/* City */}
            <div>
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                City
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
                className="w-full"
              />
            </div>

            {/* State */}
            <div>
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                State
              </Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state..." />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code */}
            <div>
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Zip Code
              </Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                placeholder="Enter ZIP code"
                className="w-full"
                maxLength={10}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 "
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
